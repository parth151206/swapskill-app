import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageSquare, Calendar, Star, MoreVertical, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Matches = () => {
  const [activeTab, setActiveTab] = useState('active');
  const { currentUser } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      if (!currentUser) return;
      try {
        const q = query(collection(db, 'chats'), where('participants', 'array-contains', currentUser.uid));
        const snapshot = await getDocs(q);
        
        const fetchedMatches = [];
        for (const chatDoc of snapshot.docs) {
          const chatData = chatDoc.data();
          const otherUserId = chatData.participants.find(id => id !== currentUser.uid);
          
          if (otherUserId) {
            const userRef = doc(db, 'users', otherUserId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              fetchedMatches.push({
                id: chatDoc.id,
                uid: otherUserId,
                name: userData.name || 'Unknown User',
                role: userData.title || 'Member',
                company: 'Member',
                avatar: userData.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'U')}&background=0A0A0A&color=fff`,
                status: 'active',
                topic: chatData.topic || 'Skill Swap',
                nextSession: 'TBD',
                hoursExchanged: 0,
              });
            }
          }
        }
        setMatches(fetchedMatches);
      } catch (err) {
        console.error("Error fetching matches:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [currentUser]);

  const filteredMatches = matches.filter(m => m.status === activeTab);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-[#737373] text-lg font-medium animate-pulse">Loading Matches...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#0A0A0A] pb-16">
      
      {/* Page Header */}
      <div className="bg-white border-b border-[#E5E5E5] px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0A]">My Matches</h1>
          <p className="mt-1 text-sm text-[#737373]">Manage your active knowledge exchanges and past connections.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          
          {/* Tabs */}
          <div className="flex bg-white border border-[#E5E5E5] rounded-lg p-1">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 sm:flex-none px-6 py-2 text-sm font-bold rounded-md transition-colors ${
                activeTab === 'active'
                  ? 'bg-[#0A0A0A] text-white shadow-sm'
                  : 'text-[#737373] hover:text-[#0A0A0A]'
              }`}
            >
              Active Swaps
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 sm:flex-none px-6 py-2 text-sm font-bold rounded-md transition-colors ${
                activeTab === 'completed'
                  ? 'bg-[#0A0A0A] text-white shadow-sm'
                  : 'text-[#737373] hover:text-[#0A0A0A]'
              }`}
            >
              Past Connections
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#737373]" />
            </div>
            <input
              type="text"
              placeholder="Search matches..."
              className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm bg-white"
            />
          </div>
        </div>

        {/* Matches List */}
        <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
          {filteredMatches.length > 0 ? (
            <ul className="divide-y divide-[#E5E5E5]">
              {filteredMatches.map((match) => (
                <li key={match.id} className="p-6 hover:bg-[#FAFAFA] transition-colors">
                  <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                    
                    {/* User Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <Link to={`/profile?id=${match.uid}`}>
                        <img 
                          src={match.avatar} 
                          alt={match.name} 
                          className="w-14 h-14 rounded-full border border-[#E5E5E5] grayscale hover:grayscale-0 transition-all cursor-pointer" 
                        />
                      </Link>
                      <div>
                        <Link to={`/profile?id=${match.uid}`} className="text-base font-bold text-[#0A0A0A] hover:underline">
                          {match.name}
                        </Link>
                        <p className="text-sm text-[#737373]">{match.role} @ {match.company}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs font-medium text-[#737373]">
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#FAFAFA] border border-[#E5E5E5]">
                            {match.hoursExchanged} hrs exchanged
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Topic & Status */}
                    <div className="flex-1 min-w-0 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg p-3">
                      <div className="text-xs font-bold text-[#737373] uppercase tracking-wide mb-1">Exchange Topic</div>
                      <div className="text-sm font-semibold text-[#0A0A0A] truncate">{match.topic}</div>
                      
                      {match.nextSession && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#10B981]">
                          <Clock className="w-3.5 h-3.5" />
                          Next: {match.nextSession}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {activeTab === 'active' ? (
                          <Link to="/messages" className="inline-flex justify-center items-center px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm font-semibold text-[#0A0A0A] bg-white hover:bg-[#FAFAFA] transition-colors">
                            <MessageSquare className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Message</span>
                          </Link>
                      ) : (
                        <>
                          <Link to="/messages" className="inline-flex justify-center items-center px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm font-semibold text-[#0A0A0A] bg-white hover:bg-[#FAFAFA] transition-colors">
                            <MessageSquare className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Message</span>
                          </Link>
                          <button className="inline-flex justify-center items-center px-3 py-2 border border-transparent rounded-lg text-sm font-semibold text-[#10B981] bg-[#10B981]/10 hover:bg-[#10B981]/20 transition-colors">
                            <Star className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Review</span>
                          </button>
                        </>
                      )}
                      
                      <button className="p-2 text-[#737373] hover:text-[#0A0A0A] hover:bg-[#E5E5E5] rounded-lg transition-colors border border-transparent">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>

                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-12 text-center">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">No {activeTab} matches found.</h3>
              <p className="text-[#737373] text-sm mb-6">You don't have any {activeTab} swaps at the moment.</p>
              <Link to="/explore" className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-lg text-sm font-semibold text-white bg-[#0A0A0A] hover:bg-[#262626] transition-colors">
                Discover Skills
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Matches;
