import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, MessageSquare, Check, X } from 'lucide-react';
import { collection, query, where, onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Requests = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('received');
  const [requests, setRequests] = useState({ received: [], sent: [] });

  useEffect(() => {
    if (!currentUser) return;

    // Listen for Received Requests
    const receivedQ = query(collection(db, 'requests'), where('toUserId', '==', currentUser.uid));
    const unsubReceived = onSnapshot(receivedQ, async (snapshot) => {
      const recData = [];
      for (const d of snapshot.docs) {
        const req = d.data();
        const userDoc = await getDoc(doc(db, 'users', req.fromUserId));
        const user = userDoc.exists() ? userDoc.data() : {};
        recData.push({
          id: d.id,
          ...req,
          user: {
            id: req.fromUserId,
            name: user.name || 'Unknown',
            role: user.title || 'Member',
            avatar: user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&background=0A0A0A&color=fff&size=150`
          },
          timeAgo: 'Recently'
        });
      }
      setRequests(prev => ({ ...prev, received: recData }));
    });

    // Listen for Sent Requests
    const sentQ = query(collection(db, 'requests'), where('fromUserId', '==', currentUser.uid));
    const unsubSent = onSnapshot(sentQ, async (snapshot) => {
      const sentData = [];
      for (const d of snapshot.docs) {
        const req = d.data();
        const userDoc = await getDoc(doc(db, 'users', req.toUserId));
        const user = userDoc.exists() ? userDoc.data() : {};
        sentData.push({
          id: d.id,
          ...req,
          user: {
            id: req.toUserId,
            name: user.name || 'Unknown',
            role: user.title || 'Member',
            avatar: user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&background=0A0A0A&color=fff&size=150`
          },
          timeAgo: 'Recently'
        });
      }
      setRequests(prev => ({ ...prev, sent: sentData }));
    });

    return () => {
      unsubReceived();
      unsubSent();
    };
  }, [currentUser]);

  const handleUpdateStatus = async (request, newStatus) => {
    try {
      await updateDoc(doc(db, 'requests', request.id), { status: newStatus });
      if (newStatus === 'accepted') {
        const { addDoc, serverTimestamp } = await import('firebase/firestore');
        await addDoc(collection(db, 'chats'), {
          participants: [request.fromUserId, request.toUserId],
          updatedAt: serverTimestamp(),
          topic: `${request.offering} ↔ ${request.seeking}`
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const currentList = activeTab === 'received' ? requests.received : requests.sent;

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#0A0A0A] pb-16">
      
      {/* Page Header */}
      <div className="bg-white border-b border-[#E5E5E5] px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/dashboard" className="inline-flex items-center text-sm font-semibold text-[#737373] hover:text-[#0A0A0A] transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0A]">Swap Requests</h1>
            {requests.received.length > 0 && (
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-bold bg-[#10B981] text-white">
                {requests.received.length} New
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Tabs */}
        <div className="flex border-b border-[#E5E5E5] mb-8">
          <button
            onClick={() => setActiveTab('received')}
            className={`pb-4 px-2 mr-8 border-b-2 font-bold text-sm transition-colors ${
              activeTab === 'received'
                ? 'border-[#0A0A0A] text-[#0A0A0A]'
                : 'border-transparent text-[#737373] hover:text-[#0A0A0A] hover:border-[#E5E5E5]'
            }`}
          >
            Received ({requests.received.length})
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`pb-4 px-2 border-b-2 font-bold text-sm transition-colors ${
              activeTab === 'sent'
                ? 'border-[#0A0A0A] text-[#0A0A0A]'
                : 'border-transparent text-[#737373] hover:text-[#0A0A0A] hover:border-[#E5E5E5]'
            }`}
          >
            Sent ({requests.sent.length})
          </button>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {currentList.length > 0 ? (
            currentList.map((request) => (
              <div key={request.id} className="bg-white rounded-xl border border-[#E5E5E5] shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 sm:p-8">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <Link to={`/profile?id=${request.user.id}`}>
                      <img 
                        src={request.user.avatar} 
                        alt={request.user.name} 
                        className="w-16 h-16 rounded-full border border-[#E5E5E5] object-cover hover:opacity-90 transition-all cursor-pointer" 
                      />
                    </Link>
                    <div>
                      <Link to={`/profile?id=${request.user.id}`} className="text-lg font-bold text-[#0A0A0A] hover:underline">
                        {request.user.name}
                      </Link>
                      <p className="text-sm text-[#737373]">{request.user.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#737373]">
                    <Clock className="w-3.5 h-3.5" /> {request.timeAgo}
                  </div>
                </div>

                {/* Offer / Seek Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg p-4">
                    <div className="text-xs font-bold text-[#10B981] uppercase tracking-wide mb-1.5">They will teach</div>
                    <div className="font-semibold text-[#0A0A0A]">{request.offering}</div>
                  </div>
                  <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg p-4">
                    <div className="text-xs font-bold text-[#737373] uppercase tracking-wide mb-1.5">They want to learn</div>
                    <div className="font-semibold text-[#0A0A0A]">{request.seeking}</div>
                  </div>
                </div>

                {/* Message Quote */}
                <div className="relative mb-8">
                  <div className="absolute top-0 left-0">
                    <MessageSquare className="w-5 h-5 text-[#E5E5E5] fill-current" />
                  </div>
                  <p className="pl-8 text-sm text-[#737373] leading-relaxed italic">
                    "{request.message}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E5E5E5]">
                  {request.status === 'pending' ? (
                    activeTab === 'received' ? (
                      <>
                        <button 
                          onClick={() => handleUpdateStatus(request, 'declined')}
                          className="px-5 py-2.5 border border-[#E5E5E5] rounded-lg text-sm font-semibold text-[#0A0A0A] bg-white hover:bg-[#FAFAFA] transition-colors flex items-center gap-2"
                        >
                          <X className="w-4 h-4" /> Decline
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(request, 'accepted')}
                          className="px-5 py-2.5 border border-transparent rounded-lg text-sm font-semibold text-white bg-[#0A0A0A] hover:bg-[#262626] transition-colors flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" /> Accept Swap
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="mr-auto inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#FAFAFA] text-[#737373] border border-[#E5E5E5] uppercase tracking-wide">
                          Pending Response
                        </span>
                        <button 
                          onClick={() => handleUpdateStatus(request, 'cancelled')}
                          className="px-5 py-2.5 border border-[#E5E5E5] rounded-lg text-sm font-semibold text-[#0A0A0A] bg-white hover:bg-[#FAFAFA] transition-colors"
                        >
                          Cancel Request
                        </button>
                      </>
                    )
                  ) : (
                    <span className={`mr-auto inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border uppercase tracking-wide
                      ${request.status === 'accepted' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' : ''}
                      ${request.status === 'declined' ? 'bg-red-50 text-red-600 border-red-100' : ''}
                      ${request.status === 'cancelled' ? 'bg-[#FAFAFA] text-[#737373] border-[#E5E5E5]' : ''}
                    `}>
                      {request.status}
                    </span>
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl border border-[#E5E5E5] p-12 text-center">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">No {activeTab} requests.</h3>
              <p className="text-[#737373] text-sm mb-6">You don't have any {activeTab} swap requests at the moment.</p>
              {activeTab === 'received' ? (
                <Link to="/settings" className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-lg text-sm font-semibold text-white bg-[#0A0A0A] hover:bg-[#262626] transition-colors">
                  Update Your Profile
                </Link>
              ) : (
                <Link to="/explore" className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-lg text-sm font-semibold text-white bg-[#0A0A0A] hover:bg-[#262626] transition-colors">
                  Discover Skills
                </Link>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Requests;
