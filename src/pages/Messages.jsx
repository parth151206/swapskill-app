import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Paperclip, MoreVertical, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, query, where, onSnapshot, doc, getDoc, updateDoc, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Messages = () => {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');

  // Fetch conversations
  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, 'chats'), where('participants', 'array-contains', currentUser.uid));
    const unsub = onSnapshot(q, async (snapshot) => {
      const chatsData = [];
      for (const d of snapshot.docs) {
        const chat = d.data();
        const otherUserId = chat.participants.find(id => id !== currentUser.uid);
        const userDoc = await getDoc(doc(db, 'users', otherUserId));
        const user = userDoc.exists() ? userDoc.data() : {};
        chatsData.push({
          id: d.id,
          ...chat,
          user: {
            id: otherUserId,
            name: user.name || 'Unknown',
            role: user.title || 'Member',
            avatar: user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&background=0A0A0A&color=fff&size=150`
          },
          lastMessage: chat.lastMessage || 'No messages yet',
          time: 'Recently',
          unread: 0
        });
      }
      setConversations(chatsData);
      if (chatsData.length > 0 && !activeChatId) {
        setActiveChatId(chatsData[0].id);
      }
    });
    return () => unsub();
  }, [currentUser, activeChatId]);

  // Fetch messages for active chat
  useEffect(() => {
    if (!activeChatId || !currentUser) return;
    const q = query(collection(db, 'chats', activeChatId, 'messages'), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        isMine: doc.data().senderId === currentUser.uid
      }));
      setMessages(msgs);
    });
    return () => unsub();
  }, [activeChatId, currentUser]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeChatId || !currentUser) return;

    const text = newMessageText;
    setNewMessageText(''); // clear input early for UX

    try {
      await addDoc(collection(db, 'chats', activeChatId, 'messages'), {
        senderId: currentUser.uid,
        text: text,
        createdAt: serverTimestamp()
      });
      await updateDoc(doc(db, 'chats', activeChatId), {
        lastMessage: text,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  };

  const activeUserData = conversations.find(c => c.id === activeChatId);
  const filteredConversations = conversations.filter(c => c.user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#FAFAFA] font-sans flex text-[#0A0A0A]">
      
      {/* Sidebar - Conversations List */}
      <div className="w-full md:w-80 lg:w-96 bg-white border-r border-[#E5E5E5] flex flex-col hidden md:flex shrink-0">
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[#E5E5E5]">
          <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">Messages</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#737373]" />
            </div>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm bg-[#FAFAFA] focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`p-4 border-b border-[#E5E5E5] cursor-pointer transition-colors ${
                activeChatId === chat.id ? 'bg-[#FAFAFA]' : 'bg-white hover:bg-[#FAFAFA]'
              }`}
            >
              <div className="flex items-start gap-3">
                <img src={chat.user.avatar} alt={chat.user.name} className="w-12 h-12 rounded-full border border-[#E5E5E5] object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className={`text-sm truncate ${chat.unread > 0 ? 'font-bold text-[#0A0A0A]' : 'font-semibold text-[#0A0A0A]'}`}>
                      {chat.user.name}
                    </h3>
                    <span className={`text-xs ${chat.unread > 0 ? 'font-bold text-[#10B981]' : 'text-[#737373]'}`}>
                      {chat.time}
                    </span>
                  </div>
                  <p className={`text-xs truncate ${chat.unread > 0 ? 'font-medium text-[#0A0A0A]' : 'text-[#737373]'}`}>
                    {chat.lastMessage}
                  </p>
                  
                  {chat.unread > 0 && (
                    <div className="mt-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981] text-white">
                      {chat.unread} new
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FAFAFA]">
        {activeUserData ? (
          <>
            {/* Chat Header */}
            <div className="h-20 px-6 bg-white border-b border-[#E5E5E5] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <Link to={`/profile?id=${activeUserData.user.id}`}>
                  <img src={activeUserData.user.avatar} alt={activeUserData.user.name} className="w-10 h-10 rounded-full border border-[#E5E5E5] object-cover hover:opacity-90 transition-all" />
                </Link>
                <div>
                  <h2 className="text-base font-bold text-[#0A0A0A]">{activeUserData.user.name}</h2>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#737373]">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                    Active Now
                    <span className="mx-1">|</span>
                    <span className="truncate max-w-[200px] sm:max-w-md">Swap: {activeUserData.topic}</span>
                  </div>
                </div>
              </div>
              
              <button className="p-2 text-[#737373] hover:text-[#0A0A0A] hover:bg-[#E5E5E5] rounded-lg transition-colors border border-transparent">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border border-[#E5E5E5] text-[#737373] shadow-sm">
                  Today
                </span>
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                  {!msg.isMine && (
                    <img src={activeUserData?.user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-[#E5E5E5] mr-3 self-end object-cover" />
                  )}
                  
                  <div className={`max-w-[75%] sm:max-w-md flex flex-col ${msg.isMine ? 'items-end' : 'items-start'}`}>
                    <div 
                      className={`px-4 py-3 rounded-2xl ${
                        msg.isMine 
                          ? 'bg-[#0A0A0A] text-white rounded-br-sm' 
                          : 'bg-white border border-[#E5E5E5] text-[#0A0A0A] shadow-sm rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-[#E5E5E5]">
              <div className="flex items-end gap-3 max-w-4xl mx-auto">
                <button type="button" className="p-3 text-[#737373] hover:text-[#0A0A0A] hover:bg-[#FAFAFA] rounded-full transition-colors border border-transparent shrink-0">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    rows="1"
                    placeholder="Type your message..."
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                    className="block w-full py-3 px-4 border border-[#E5E5E5] rounded-xl text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm bg-[#FAFAFA] focus:bg-white resize-none transition-colors"
                  />
                </div>
                <button type="submit" disabled={!newMessageText.trim()} className="p-3 bg-[#0A0A0A] text-white hover:bg-[#262626] rounded-full transition-colors shadow-sm shrink-0 disabled:opacity-50">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full">
            <div className="w-20 h-20 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center mb-6 shadow-sm">
              <MessageSquare className="w-8 h-8 text-[#737373]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-3">No Active Conversations</h2>
            <p className="text-[#737373] max-w-md mx-auto mb-8">
              When you accept a swap request or someone accepts yours, your chat will appear here.
            </p>
            <Link to="/explore" className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg text-sm font-bold text-white bg-[#0A0A0A] hover:bg-[#262626] transition-colors">
              Find People to Swap With
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
