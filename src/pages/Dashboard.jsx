import React from 'react';
import { Link } from 'react-router-dom';
import { Repeat, Clock, Star, Bell, ArrowRight, Calendar, MessageSquare, CheckCircle, MoreHorizontal } from 'lucide-react';

const Dashboard = () => {
  // Mock Data
  const stats = [
    { label: 'Active Swaps', value: '3', trend: '+1 this week', icon: Repeat },
    { label: 'Hours Exchanged', value: '12.5', trend: 'Top 15%', icon: Clock },
    { label: 'Avg Rating', value: '4.9', trend: 'Based on 28 reviews', icon: Star },
  ];

  const upcomingSessions = [
    { id: 1, partner: 'David K.', topic: 'Advanced Figma Prototyping', time: 'Today, 2:00 PM', duration: '1 hr', avatar: 'https://i.pravatar.cc/150?img=33' },
    { id: 2, partner: 'Elena R.', topic: 'React Performance Tuning', time: 'Tomorrow, 10:00 AM', duration: '45 min', avatar: 'https://i.pravatar.cc/150?img=44' },
  ];

  const pendingRequests = [
    { id: 1, from: 'Marcus J.', role: 'Backend Dev @ Stripe', offering: 'Node.js Architecture', seeking: 'CSS Grid & Flexbox', timeAgo: '2 hrs ago', avatar: 'https://i.pravatar.cc/150?img=55' },
    { id: 2, from: 'Sophie W.', role: 'Product Manager', offering: 'Agile Workflows', seeking: 'React Basics', timeAgo: '5 hrs ago', avatar: 'https://i.pravatar.cc/150?img=22' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#0A0A0A] pb-16">
      
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5] px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0A]">Welcome back, Sarah.</h1>
            <p className="mt-1 text-sm text-[#737373]">Here's what's happening in your network today.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/requests" className="inline-flex items-center px-4 py-2 border border-[#E5E5E5] rounded-lg shadow-sm text-sm font-semibold text-[#0A0A0A] bg-white hover:bg-[#FAFAFA] transition-colors relative">
              <Bell className="w-4 h-4 mr-2 text-[#737373]" />
              Notifications
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#10B981] rounded-full border-2 border-white"></span>
            </Link>
            <Link to="/explore" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#0A0A0A] hover:bg-[#262626] transition-colors">
              Find a Match
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-[#E5E5E5] p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[#737373] uppercase tracking-wide">{stat.label}</span>
                <div className="p-2 bg-[#FAFAFA] rounded-lg">
                  <stat.icon className="w-5 h-5 text-[#0A0A0A]" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold text-[#0A0A0A]">{stat.value}</h2>
              </div>
              <p className="mt-1 text-xs font-medium text-[#10B981]">{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (2 spans) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
              <div className="px-6 py-5 border-b border-[#E5E5E5] flex justify-between items-center bg-[#FAFAFA]/50">
                <h3 className="text-base font-bold text-[#0A0A0A]">Upcoming Sessions</h3>
                <button className="text-sm font-semibold text-[#737373] hover:text-[#0A0A0A] transition-colors">View Calendar</button>
              </div>
              <div className="divide-y divide-[#E5E5E5]">
                {upcomingSessions.map(session => (
                  <div key={session.id} className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-[#FAFAFA] transition-colors">
                    <div className="relative shrink-0">
                      <img src={session.avatar} alt={session.partner} className="w-12 h-12 rounded-full border border-[#E5E5E5] grayscale" />
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                        <CheckCircle className="w-4 h-4 text-[#10B981] fill-[#10B981]/10" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#0A0A0A] truncate">{session.topic}</h4>
                      <p className="text-sm text-[#737373] truncate">Swap with <span className="font-medium text-[#0A0A0A]">{session.partner}</span></p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto mt-2 sm:mt-0 justify-between sm:justify-end">
                      <div className="text-right">
                        <div className="flex items-center text-sm font-bold text-[#0A0A0A]">
                          <Calendar className="w-4 h-4 mr-1.5 text-[#737373]" /> {session.time}
                        </div>
                        <div className="text-xs text-[#737373] font-medium mt-0.5">{session.duration}</div>
                      </div>
                      <button className="p-2 text-[#737373] hover:text-[#0A0A0A] hover:bg-[#E5E5E5] rounded-lg transition-colors border border-[#E5E5E5] sm:border-transparent">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Requests */}
            <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
              <div className="px-6 py-5 border-b border-[#E5E5E5] flex justify-between items-center bg-[#FAFAFA]/50">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#0A0A0A]">Pending Requests</h3>
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-[#0A0A0A] text-white">2</span>
                </div>
                <Link to="/requests" className="text-sm font-semibold text-[#737373] hover:text-[#0A0A0A] transition-colors">View All</Link>
              </div>
              <div className="divide-y divide-[#E5E5E5]">
                {pendingRequests.map(request => (
                  <div key={request.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-3">
                        <img src={request.avatar} alt={request.from} className="w-10 h-10 rounded-full border border-[#E5E5E5] grayscale" />
                        <div>
                          <div className="text-sm font-bold text-[#0A0A0A]">{request.from}</div>
                          <div className="text-xs text-[#737373]">{request.role}</div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-[#737373]">{request.timeAgo}</span>
                    </div>
                    
                    <div className="bg-[#FAFAFA] rounded-lg p-4 border border-[#E5E5E5] mb-4 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="block text-xs font-bold text-[#737373] uppercase tracking-wide mb-1">They can teach</span>
                          <span className="font-medium text-[#0A0A0A]">{request.offering}</span>
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-[#737373] uppercase tracking-wide mb-1">They want to learn</span>
                          <span className="font-medium text-[#0A0A0A]">{request.seeking}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-[#0A0A0A] text-white rounded-lg text-sm font-semibold hover:bg-[#262626] transition-colors">
                        Accept Swap
                      </button>
                      <button className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-white border border-[#E5E5E5] text-[#0A0A0A] rounded-lg text-sm font-semibold hover:bg-[#FAFAFA] transition-colors">
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-8">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wide mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-[#E5E5E5] hover:border-[#0A0A0A] hover:bg-[#FAFAFA] transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#FAFAFA] group-hover:bg-white p-2 rounded-md border border-[#E5E5E5] transition-colors">
                      <MessageSquare className="w-4 h-4 text-[#0A0A0A]" />
                    </div>
                    <span className="text-sm font-semibold text-[#0A0A0A]">Send Message</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#737373] group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-[#E5E5E5] hover:border-[#0A0A0A] hover:bg-[#FAFAFA] transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#FAFAFA] group-hover:bg-white p-2 rounded-md border border-[#E5E5E5] transition-colors">
                      <Calendar className="w-4 h-4 text-[#0A0A0A]" />
                    </div>
                    <span className="text-sm font-semibold text-[#0A0A0A]">Update Availability</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#737373] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Network Activity */}
            <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wide mb-6">Network Activity</h3>
              <div className="relative border-l-2 border-[#E5E5E5] pl-4 ml-2 space-y-6">
                
                <div className="relative">
                  <div className="absolute -left-[23px] bg-white p-1 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                  </div>
                  <p className="text-sm text-[#0A0A0A] leading-snug">
                    <span className="font-bold">Elena R.</span> left you a 5-star review for React Performance Tuning.
                  </p>
                  <span className="text-xs font-medium text-[#737373] mt-1 block">Yesterday</span>
                </div>

                <div className="relative">
                  <div className="absolute -left-[23px] bg-white p-1 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-[#0A0A0A]"></div>
                  </div>
                  <p className="text-sm text-[#0A0A0A] leading-snug">
                    Your Swap Request with <span className="font-bold">David K.</span> was accepted.
                  </p>
                  <span className="text-xs font-medium text-[#737373] mt-1 block">2 days ago</span>
                </div>

                <div className="relative">
                  <div className="absolute -left-[23px] bg-white p-1 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-[#E5E5E5]"></div>
                  </div>
                  <p className="text-sm text-[#0A0A0A] leading-snug text-[#737373]">
                    You updated your "Seeking to Learn" skills to include <span className="font-medium">UX Research</span>.
                  </p>
                  <span className="text-xs font-medium text-[#737373] mt-1 block">1 week ago</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
