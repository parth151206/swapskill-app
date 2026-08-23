import React, { useState } from 'react';
import { Star, MapPin, Briefcase, Clock, MessageSquare, Repeat, Shield, CheckCircle, Calendar, Award } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock User Data
  const user = {
    name: 'Sarah Chen',
    title: 'Senior Frontend Architect @ TechCorp',
    avatar: 'https://i.pravatar.cc/150?img=1',
    cover: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1200&q=80',
    bio: 'I specialize in building scalable, accessible, and highly performant web applications. With over 8 years in frontend engineering, I love helping others master modern UI architectures. Currently, I am looking to transition into more product-oriented roles and want to learn UX research and Figma.',
    location: 'San Francisco, CA',
    experience: 'Expert',
    availability: 'Evenings & Weekends',
    rating: 4.9,
    reviews: 42,
    joinDate: 'Joined Mar 2024',
    swapsCompleted: 28,
    teaches: ['React', 'TypeScript', 'Tailwind CSS', 'Web Accessibility'],
    wants: ['Figma', 'UX Research', 'Product Strategy'],
    history: [
      { id: 1, partner: 'David K.', skill: 'Figma', rating: 5, date: '2 weeks ago', feedback: 'Sarah is an incredible teacher. She helped me understand complex React patterns while I walked her through advanced Figma prototyping.' },
      { id: 2, partner: 'Marcus J.', skill: 'UX Research', rating: 5, date: '1 month ago', feedback: 'Extremely professional and knowledgeable. Highly recommend swapping with Sarah.' },
    ]
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans pb-16">
      
      {/* Cover Image */}
      <div className="h-48 md:h-64 w-full bg-[#0A0A0A] relative overflow-hidden">
        <img 
          src={user.cover} 
          alt="Cover" 
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-80"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header Card */}
        <div className="relative -mt-24 sm:-mt-32 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E5E5E5] p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:items-end justify-between">
            
            <div className="flex flex-col sm:flex-row gap-6 sm:items-end">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl border-4 border-white shadow-sm overflow-hidden shrink-0 bg-white">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-sm">
                  <Shield className="w-5 h-5 text-[#10B981] fill-[#10B981]/20" />
                </div>
              </div>
              
              <div className="pb-2">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-[#0A0A0A]">{user.name}</h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                    Verified
                  </span>
                </div>
                <p className="text-lg font-medium text-[#737373] mb-4">{user.title}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-[#737373]">
                  <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-[#0A0A0A] fill-current" /> <span className="text-[#0A0A0A]">{user.rating}</span> ({user.reviews} reviews)</span>
                  <span className="hidden sm:inline text-[#E5E5E5]">|</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {user.location}</span>
                  <span className="hidden sm:inline text-[#E5E5E5]">|</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {user.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 shrink-0 pb-2 mt-4 sm:mt-0">
              <Link to="/create-request" className="flex-1 sm:flex-none inline-flex justify-center items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0A0A0A] hover:bg-[#262626] transition-colors">
                <Repeat className="w-4 h-4 mr-2" /> Request Swap
              </Link>
              <button className="flex-1 sm:flex-none inline-flex justify-center items-center px-5 py-2.5 border border-[#E5E5E5] rounded-lg text-sm font-semibold text-[#0A0A0A] bg-white hover:bg-[#FAFAFA] transition-colors">
                <MessageSquare className="w-4 h-4 mr-2" /> Message
              </button>
            </div>
            
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Tabs */}
            <div className="border-b border-[#E5E5E5]">
              <nav className="-mb-px flex space-x-8">
                {['overview', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap pb-4 px-1 border-b-2 font-bold text-sm capitalize transition-colors ${
                      activeTab === tab
                        ? 'border-[#0A0A0A] text-[#0A0A0A]'
                        : 'border-transparent text-[#737373] hover:text-[#0A0A0A] hover:border-[#E5E5E5]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                {/* About Section */}
                <section>
                  <h2 className="text-lg font-bold text-[#0A0A0A] mb-4">About</h2>
                  <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6">
                    <p className="text-[#737373] leading-relaxed">
                      {user.bio}
                    </p>
                  </div>
                </section>

                {/* Skills Section */}
                <section>
                  <h2 className="text-lg font-bold text-[#0A0A0A] mb-4">Exchange Preferences</h2>
                  <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] overflow-hidden">
                    <div className="p-6 border-b border-[#E5E5E5] bg-[#FAFAFA]/50">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                        <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wide">Expertise to Share</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {user.teaches.map(skill => (
                          <span key={skill} className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-semibold bg-white text-[#0A0A0A] border border-[#E5E5E5] shadow-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-[#E5E5E5]"></div>
                        <h3 className="text-sm font-bold text-[#737373] uppercase tracking-wide">Seeking to Learn</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {user.wants.map(skill => (
                          <span key={skill} className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-semibold bg-white text-[#737373] border border-[#E5E5E5] border-dashed">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {user.history.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold text-[#0A0A0A]">Swap with {review.partner}</p>
                        <p className="text-xs text-[#737373] font-medium mt-1">Topic: {review.skill}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1 justify-end">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 text-[#0A0A0A] fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-[#737373] font-medium">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#737373] leading-relaxed italic border-l-2 border-[#E5E5E5] pl-4">
                      "{review.feedback}"
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Column (Sidebar Stats) */}
          <div className="space-y-6">
            
            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6">
              <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wide mb-5">Statistics</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#737373]">
                    <Repeat className="w-4 h-4" />
                    <span className="text-sm font-medium">Swaps Completed</span>
                  </div>
                  <span className="font-bold text-[#0A0A0A]">{user.swapsCompleted}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#737373]">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Avg. Response Time</span>
                  </div>
                  <span className="font-bold text-[#0A0A0A]">2 hours</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#737373]">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Completion Rate</span>
                  </div>
                  <span className="font-bold text-[#10B981]">100%</span>
                </div>
              </div>
            </div>

            {/* Badges/Achievements Card */}
            <div className="bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] p-6">
              <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wide mb-5">Achievements</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-[#E5E5E5] rounded-lg p-3 text-center">
                  <div className="w-8 h-8 mx-auto bg-[#FAFAFA] rounded-full flex items-center justify-center mb-2">
                    <Award className="w-4 h-4 text-[#0A0A0A]" />
                  </div>
                  <div className="text-xs font-bold text-[#0A0A0A]">Top Mentor</div>
                  <div className="text-[10px] text-[#737373] mt-0.5">Top 5% rated</div>
                </div>
                <div className="bg-white border border-[#E5E5E5] rounded-lg p-3 text-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
                  <div className="w-8 h-8 mx-auto bg-[#FAFAFA] rounded-full flex items-center justify-center mb-2">
                    <Award className="w-4 h-4 text-[#737373]" />
                  </div>
                  <div className="text-xs font-bold text-[#737373]">Prolific</div>
                  <div className="text-[10px] text-[#737373] mt-0.5">50+ Swaps</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
