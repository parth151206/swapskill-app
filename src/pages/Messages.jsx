import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(1);

  const conversations = [
    {
      id: 1,
      user: { name: 'David K.', role: 'Senior Product Designer', avatar: 'https://i.pravatar.cc/150?img=33' },
      lastMessage: 'Here is the link to the Figma file we discussed.',
      time: '10:42 AM',
      unread: 2,
      topic: 'Advanced Prototyping vs React Patterns'
    },
    {
      id: 2,
      user: { name: 'Elena R.', role: 'Staff Engineer', avatar: 'https://i.pravatar.cc/150?img=44' },
      lastMessage: 'Are we still on for our session tomorrow?',
      time: 'Yesterday',
      unread: 0,
      topic: 'Performance Tuning vs System Design'
    },
    {
      id: 3,
      user: { name: 'Marcus J.', role: 'Backend Developer', avatar: 'https://i.pravatar.cc/150?img=55' },
      lastMessage: 'Thanks for the architecture breakdown! Really helpful.',
      time: 'Tuesday',
      unread: 0,
      topic: 'Node.js Architecture vs CSS Grid'
    }
  ];

  const currentChatMessages = [
    {
      id: 1,
      sender: 'David K.',
      text: 'Hey Sarah! I was looking over the React component structure you sent.',
      time: '10:30 AM',
      isMine: false,
    },
    {
      id: 2,
      sender: 'Sarah',
      text: 'Great! Did the separation of container and presentational components make sense?',
      time: '10:35 AM',
      isMine: true,
    },
    {
      id: 3,
      sender: 'David K.',
      text: 'Yes, absolutely. It clicked when I saw how you handled state. By the way, I promised to share those advanced Figma prototyping templates.',
      time: '10:40 AM',
      isMine: false,
    },
    {
      id: 4,
      sender: 'David K.',
      text: 'Here is the link to the Figma file we discussed. Let me know if you have trouble accessing the variables section.',
      time: '10:42 AM',
      isMine: false,
      attachment: { name: 'Prototyping_Masterclass_v2.fig', size: '12.4 MB' }
    }
  ];

  const activeUserData = conversations.find(c => c.id === activeChat);

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
              className="block w-full pl-10 pr-3 py-2 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm bg-[#FAFAFA] focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`p-4 border-b border-[#E5E5E5] cursor-pointer transition-colors ${
                activeChat === chat.id ? 'bg-[#FAFAFA]' : 'bg-white hover:bg-[#FAFAFA]'
              }`}
            >
              <div className="flex items-start gap-3">
                <img src={chat.user.avatar} alt={chat.user.name} className="w-12 h-12 rounded-full border border-[#E5E5E5] grayscale" />
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
        
        {/* Chat Header */}
        {activeUserData && (
          <div className="h-20 px-6 bg-white border-b border-[#E5E5E5] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <Link to="/profile">
                <img src={activeUserData.user.avatar} alt={activeUserData.user.name} className="w-10 h-10 rounded-full border border-[#E5E5E5] grayscale hover:grayscale-0 transition-all" />
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
        )}

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border border-[#E5E5E5] text-[#737373] shadow-sm">
              Today
            </span>
          </div>

          {currentChatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
              {!msg.isMine && (
                <img src={activeUserData?.user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-[#E5E5E5] grayscale mr-3 self-end" />
              )}
              
              <div className={`max-w-[75%] sm:max-w-md flex flex-col ${msg.isMine ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`px-4 py-3 rounded-2xl ${
                    msg.isMine 
                      ? 'bg-[#0A0A0A] text-white rounded-br-sm' 
                      : 'bg-white border border-[#E5E5E5] text-[#0A0A0A] shadow-sm rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  
                  {msg.attachment && (
                    <div className={`mt-3 p-3 rounded-xl border flex items-center gap-3 ${msg.isMine ? 'bg-[#262626] border-[#404040]' : 'bg-[#FAFAFA] border-[#E5E5E5]'}`}>
                      <div className={`p-2 rounded-lg ${msg.isMine ? 'bg-[#404040]' : 'bg-white border border-[#E5E5E5]'}`}>
                        <Paperclip className={`w-4 h-4 ${msg.isMine ? 'text-white' : 'text-[#0A0A0A]'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate ${msg.isMine ? 'text-white' : 'text-[#0A0A0A]'}`}>{msg.attachment.name}</p>
                        <p className={`text-xs ${msg.isMine ? 'text-[#A3A3A3]' : 'text-[#737373]'}`}>{msg.attachment.size}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-1 mt-1.5 px-1">
                  <span className="text-[10px] font-medium text-[#737373]">{msg.time}</span>
                  {msg.isMine && <CheckCircle2 className="w-3 h-3 text-[#10B981]" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-[#E5E5E5]">
          <div className="flex items-end gap-3 max-w-4xl mx-auto">
            <button className="p-3 text-[#737373] hover:text-[#0A0A0A] hover:bg-[#FAFAFA] rounded-full transition-colors border border-transparent shrink-0">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <textarea
                rows="1"
                placeholder="Type your message..."
                className="block w-full py-3 px-4 border border-[#E5E5E5] rounded-xl text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm bg-[#FAFAFA] focus:bg-white resize-none transition-colors"
                defaultValue=""
              />
            </div>
            <button className="p-3 bg-[#0A0A0A] text-white hover:bg-[#262626] rounded-full transition-colors shadow-sm shrink-0">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Messages;
