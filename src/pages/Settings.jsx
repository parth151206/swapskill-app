import React, { useState } from 'react';
import { User, Lock, Bell, Shield, LogOut, CheckCircle2 } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#0A0A0A] pb-16">
      
      {/* Page Header */}
      <div className="bg-white border-b border-[#E5E5E5] px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0A]">Settings</h1>
            <p className="mt-1 text-sm text-[#737373]">Manage your account preferences and profile details.</p>
          </div>
          <button className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0A0A0A] hover:bg-[#262626] transition-colors shadow-sm">
            Save Changes
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-white border border-[#E5E5E5] text-[#0A0A0A] shadow-sm'
                  : 'text-[#737373] hover:text-[#0A0A0A] hover:bg-white border border-transparent'
              }`}
            >
              <User className="w-4 h-4" /> Edit Profile
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                activeTab === 'account'
                  ? 'bg-white border border-[#E5E5E5] text-[#0A0A0A] shadow-sm'
                  : 'text-[#737373] hover:text-[#0A0A0A] hover:bg-white border border-transparent'
              }`}
            >
              <Lock className="w-4 h-4" /> Account & Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-white border border-[#E5E5E5] text-[#0A0A0A] shadow-sm'
                  : 'text-[#737373] hover:text-[#0A0A0A] hover:bg-white border border-transparent'
              }`}
            >
              <Bell className="w-4 h-4" /> Notifications
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                activeTab === 'privacy'
                  ? 'bg-white border border-[#E5E5E5] text-[#0A0A0A] shadow-sm'
                  : 'text-[#737373] hover:text-[#0A0A0A] hover:bg-white border border-transparent'
              }`}
            >
              <Shield className="w-4 h-4" /> Privacy
            </button>
            
            <div className="pt-6 mt-6 border-t border-[#E5E5E5]">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>

          {/* Settings Content Area */}
          <div className="flex-1 bg-white rounded-xl border border-[#E5E5E5] shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
            
            {activeTab === 'profile' && (
              <div className="p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
                
                {/* Avatar Upload */}
                <div>
                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">Profile Picture</h3>
                  <div className="flex items-center gap-6">
                    <img src="https://i.pravatar.cc/150?img=47" alt="Current Avatar" className="w-20 h-20 rounded-full border border-[#E5E5E5] grayscale" />
                    <div>
                      <div className="flex gap-3 mb-2">
                        <button className="px-4 py-2 bg-[#0A0A0A] text-white text-sm font-semibold rounded-lg hover:bg-[#262626] transition-colors">
                          Change
                        </button>
                        <button className="px-4 py-2 bg-white border border-[#E5E5E5] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:bg-[#FAFAFA] transition-colors">
                          Remove
                        </button>
                      </div>
                      <p className="text-xs text-[#737373]">JPG, GIF or PNG. Max size of 800K.</p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#E5E5E5]"></div>

                {/* Basic Info */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-[#0A0A0A]">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-2">Full Name</label>
                      <input type="text" defaultValue="Sarah Jenkins" className="block w-full py-2.5 px-3 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-2">Professional Title</label>
                      <input type="text" defaultValue="Senior Frontend Engineer" className="block w-full py-2.5 px-3 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-2">Bio</label>
                    <textarea rows="4" defaultValue="Frontend specialist with 8 years of experience building scaleable web applications. Currently focused on React architecture, state management, and web performance optimization." className="block w-full py-2.5 px-3 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm transition-colors resize-none"></textarea>
                    <p className="mt-2 text-xs text-[#737373]">Brief description for your profile. URLs are hyperlinked.</p>
                  </div>
                </div>

                <div className="h-px bg-[#E5E5E5]"></div>

                {/* Swap Preferences */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-[#0A0A0A]">Swap Preferences</h3>
                  
                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-2">I Can Teach (Comma separated)</label>
                    <input type="text" defaultValue="React, Advanced CSS, Frontend Architecture, Next.js" className="block w-full py-2.5 px-3 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm transition-colors" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-2">I Want To Learn (Comma separated)</label>
                    <input type="text" defaultValue="Node.js, AWS Infrastructure, System Design, Figma" className="block w-full py-2.5 px-3 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm transition-colors" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-[#0A0A0A]">Account Credentials</h3>
                  
                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-2">Email Address</label>
                    <div className="flex gap-4">
                      <input type="email" defaultValue="sarah.jenkins@example.com" disabled className="block w-full py-2.5 px-3 border border-[#E5E5E5] rounded-lg text-[#737373] bg-[#F5F5F5] sm:text-sm cursor-not-allowed" />
                    </div>
                    <p className="mt-2 text-xs text-[#737373] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> Verified corporate email
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <button className="px-4 py-2 border border-[#E5E5E5] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:bg-[#FAFAFA] transition-colors">
                      Change Password
                    </button>
                  </div>
                </div>

                <div className="h-px bg-[#E5E5E5]"></div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-red-600">Danger Zone</h3>
                  <div className="p-4 border border-red-200 bg-red-50 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-red-800 text-sm">Delete Account</h4>
                      <p className="text-xs text-red-600 mt-1">Permanently remove your profile and all swap history. This action cannot be undone.</p>
                    </div>
                    <button className="shrink-0 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-[#0A0A0A]">Email Notifications</h3>
                
                <div className="space-y-4">
                  {[
                    { title: 'New Swap Requests', desc: 'Receive an email when someone wants to swap skills with you.' },
                    { title: 'Messages', desc: 'Receive an email when you get a new direct message.' },
                    { title: 'Exchange Reminders', desc: 'Receive a reminder to share resources before a scheduled exchange.' },
                    { title: 'Platform Updates', desc: 'News about major feature releases.' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start justify-between py-4 border-b border-[#E5E5E5] last:border-0 last:pb-0">
                      <div className="pr-4">
                        <h4 className="text-sm font-bold text-[#0A0A0A]">{item.title}</h4>
                        <p className="text-sm text-[#737373] mt-1">{item.desc}</p>
                      </div>
                      <div className="shrink-0 pt-1">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={i < 3} />
                          <div className="w-11 h-6 bg-[#E5E5E5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A0A0A]"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'privacy' && (
              <div className="p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-[#0A0A0A]">Profile Visibility</h3>
                <div className="flex items-start justify-between py-4 border-b border-[#E5E5E5]">
                  <div className="pr-4">
                    <h4 className="text-sm font-bold text-[#0A0A0A]">Directory Listing</h4>
                    <p className="text-sm text-[#737373] mt-1">Allow other verified users to find you in the Explore directory.</p>
                  </div>
                  <div className="shrink-0 pt-1">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-[#E5E5E5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A0A0A]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
