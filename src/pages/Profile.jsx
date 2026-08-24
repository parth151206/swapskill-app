import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, MapPin, Briefcase, Clock, MessageSquare, Repeat, Shield, CheckCircle, Calendar, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const targetId = searchParams.get('id');
  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // If there is an ID in the URL, fetch that user. Otherwise, fetch the logged-in user.
  const profileUid = targetId || currentUser?.uid;
  const isOwnProfile = !targetId || targetId === currentUser?.uid;

  useEffect(() => {
    const fetchUser = async () => {
      if (!profileUid) {
        setLoading(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, 'users', profileUid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          setErrorMsg("User not found in database.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setErrorMsg(`Access denied or error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [profileUid]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-[#737373] text-lg font-medium animate-pulse">Loading Profile...</div>
      </div>
    );
  }

  if (errorMsg || !userData) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center">
        <div className="text-[#0A0A0A] text-xl font-bold mb-2">Oops!</div>
        <div className="text-red-500 text-sm font-medium">{errorMsg || "User not found"}</div>
      </div>
    );
  }

  const joinDate = userData.createdAt 
    ? `Joined ${new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
    : 'Joined recently';

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans pb-16">
      
      {/* Cover Image */}
      <div className="h-48 md:h-64 w-full bg-[#0A0A0A] relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1200&q=80"
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
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl border-4 border-white shadow-sm overflow-hidden shrink-0 bg-white group">
                <img 
                  src={userData.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=0A0A0A&color=fff&size=150`}
                  alt={userData.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                
                {isOwnProfile && (
                  <Link to="/settings" className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Edit</span>
                  </Link>
                )}

                <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-sm">
                  <Shield className="w-5 h-5 text-[#10B981] fill-[#10B981]/20" />
                </div>
              </div>
              
              <div className="pb-2">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-[#0A0A0A]">{userData.name}</h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                    Verified
                  </span>
                </div>
                <p className="text-lg font-medium text-[#737373] mb-4">{userData.title || 'Member'}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-[#737373]">
                  <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-[#0A0A0A] fill-current" /> <span className="text-[#0A0A0A]">5.0</span> (New)</span>
                  <span className="hidden sm:inline text-[#E5E5E5]">|</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Global</span>
                  <span className="hidden sm:inline text-[#E5E5E5]">|</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {joinDate}</span>
                </div>
              </div>
            </div>

            {!isOwnProfile && (
              <div className="flex gap-3 shrink-0 pb-2 mt-4 sm:mt-0">
                <Link to={`/create-request?target=${profileUid}`} className="flex-1 sm:flex-none inline-flex justify-center items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0A0A0A] hover:bg-[#262626] transition-colors">
                  <Repeat className="w-4 h-4 mr-2" /> Request Swap
                </Link>
              </div>
            )}
            
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Tabs */}
            <div className="border-b border-[#E5E5E5]">
              <nav className="-mb-px flex space-x-8">
                {['overview'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      whitespace-nowrap pb-4 px-1 border-b-2 font-bold text-sm transition-colors capitalize
                      ${activeTab === tab 
                        ? 'border-[#0A0A0A] text-[#0A0A0A]' 
                        : 'border-transparent text-[#737373] hover:text-[#0A0A0A] hover:border-[#E5E5E5]'
                      }
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="py-4">
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  
                  {/* About Section */}
                  <section>
                    <h3 className="text-xl font-bold text-[#0A0A0A] mb-4">About Me</h3>
                    <p className="text-base text-[#404040] leading-relaxed whitespace-pre-wrap">
                      {userData.bio || 'This user hasn\'t added a bio yet.'}
                    </p>
                  </section>

                  {/* Skills Display */}
                  <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Offers */}
                    <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] text-white flex items-center justify-center">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0A0A0A]">Can Teach</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {userData.canTeach && userData.canTeach.length > 0 ? (
                          userData.canTeach.map((skill, index) => (
                            <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-[#FAFAFA] text-[#0A0A0A] border border-[#E5E5E5]">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-[#737373]">No skills listed yet.</span>
                        )}
                      </div>
                    </div>

                    {/* Seeking */}
                    <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5] text-[#0A0A0A] flex items-center justify-center">
                          <Star className="w-4 h-4" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0A0A0A]">Wants to Learn</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {userData.wantToLearn && userData.wantToLearn.length > 0 ? (
                          userData.wantToLearn.map((skill, index) => (
                            <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-white text-[#737373] border border-[#E5E5E5]">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-[#737373]">No skills listed yet.</span>
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#0A0A0A] mb-4">Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm font-medium text-[#737373]">
                    <Repeat className="w-4 h-4 mr-2" /> Swaps Completed
                  </span>
                  <span className="text-sm font-bold text-[#0A0A0A]">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm font-medium text-[#737373]">
                    <Award className="w-4 h-4 mr-2" /> Badges Earned
                  </span>
                  <span className="text-sm font-bold text-[#0A0A0A]">1</span>
                </div>
              </div>
            </div>

            {isOwnProfile && (
              <Link to="/settings" className="w-full flex justify-center items-center py-3 px-4 border border-[#0A0A0A] rounded-lg text-sm font-semibold text-white bg-[#0A0A0A] hover:bg-[#262626] transition-colors">
                Edit Profile
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
