import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Repeat, MessageSquare, Star, Settings, CheckCircle2 } from 'lucide-react';

const Notifications = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'swap_accepted',
      unread: true,
      user: { name: 'David K.', avatar: 'https://i.pravatar.cc/150?img=33' },
      content: 'accepted your swap request for Advanced Figma Prototyping.',
      timeAgo: '10 minutes ago',
      icon: Repeat,
      action: { label: 'View Match', link: '/matches' }
    },
    {
      id: 2,
      type: 'message',
      unread: true,
      user: { name: 'Elena R.', avatar: 'https://i.pravatar.cc/150?img=44' },
      content: 'sent you a message: "Are we still on for our session tomorrow?"',
      timeAgo: '1 hour ago',
      icon: MessageSquare,
      action: { label: 'Reply', link: '/matches' }
    },
    {
      id: 3,
      type: 'reminder',
      unread: false,
      user: { name: 'System', avatar: null },
      content: 'Reminder: Send your architecture diagrams to Sophie W. before your swap.',
      timeAgo: '2 hours ago',
      icon: MessageSquare,
      action: { label: 'Send Resources', link: '/matches' }
    },
    {
      id: 4,
      type: 'review',
      unread: false,
      user: { name: 'Marcus J.', avatar: 'https://i.pravatar.cc/150?img=55' },
      content: 'left you a 5-star review: "Extremely professional..."',
      timeAgo: '1 day ago',
      icon: Star,
      action: { label: 'Read Review', link: '/profile' }
    },
    {
      id: 5,
      type: 'system',
      unread: false,
      user: { name: 'SwapSkill Admin', avatar: null },
      content: 'Welcome to the network! Complete your profile to get matched.',
      timeAgo: '3 days ago',
      icon: Settings,
      action: { label: 'Edit Profile', link: '/profile' }
    }
  ];

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return n.unread;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#0A0A0A] pb-16">
      
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5] px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0A]">Notifications</h1>
            <p className="mt-1 text-sm text-[#737373]">Stay updated on your swap requests and messages.</p>
          </div>
          <button className="inline-flex items-center text-sm font-semibold text-[#737373] hover:text-[#0A0A0A] transition-colors">
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            Mark all as read
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Filters */}
        <div className="flex gap-2 mb-6 border-b border-[#E5E5E5] pb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              filter === 'all'
                ? 'bg-[#0A0A0A] text-white'
                : 'bg-white border border-[#E5E5E5] text-[#737373] hover:text-[#0A0A0A]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              filter === 'unread'
                ? 'bg-[#0A0A0A] text-white'
                : 'bg-white border border-[#E5E5E5] text-[#737373] hover:text-[#0A0A0A]'
            }`}
          >
            Unread
          </button>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-[#E5E5E5]">
              {filteredNotifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`p-6 flex flex-col sm:flex-row gap-4 sm:items-center transition-colors ${
                    notif.unread ? 'bg-[#FAFAFA]' : 'bg-white hover:bg-[#FAFAFA]'
                  }`}
                >
                  
                  {/* Left Icon/Avatar */}
                  <div className="relative shrink-0">
                    {notif.user.avatar ? (
                      <img src={notif.user.avatar} alt={notif.user.name} className="w-12 h-12 rounded-full border border-[#E5E5E5] grayscale" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center">
                        <Bell className="w-5 h-5 text-[#0A0A0A]" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-[#E5E5E5]">
                      <notif.icon className="w-3 h-3 text-[#0A0A0A]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#0A0A0A] leading-relaxed">
                      <span className="font-bold">{notif.user.name}</span> {notif.content}
                    </p>
                    <p className="text-xs font-semibold text-[#737373] mt-1">{notif.timeAgo}</p>
                  </div>

                  {/* Action */}
                  <div className="shrink-0 flex items-center gap-4 mt-4 sm:mt-0">
                    {notif.unread && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>
                    )}
                    {notif.action && (
                      <Link 
                        to={notif.action.link}
                        className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm font-semibold text-[#0A0A0A] bg-white hover:bg-[#FAFAFA] transition-colors"
                      >
                        {notif.action.label}
                      </Link>
                    )}
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center mx-auto mb-4">
                <Bell className="w-5 h-5 text-[#737373]" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">All caught up!</h3>
              <p className="text-[#737373] text-sm">You have no new notifications.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Notifications;
