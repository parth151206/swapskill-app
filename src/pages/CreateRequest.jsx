import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Repeat, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const CreateRequest = () => {
  const [searchParams] = useSearchParams();
  const targetId = searchParams.get('target');
  
  const { currentUser } = useAuth();
  
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [targetUser, setTargetUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [wantToLearn, setWantToLearn] = useState('');
  const [willTeach, setWillTeach] = useState('');
  const [pitch, setPitch] = useState('');

  // Fetch target user data
  useEffect(() => {
    const fetchTargetUser = async () => {
      if (!targetId) {
        setIsLoadingUser(false);
        return;
      }
      try {
        const docRef = doc(db, 'users', targetId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTargetUser(data);
          // Set defaults
          if (data.canTeach && data.canTeach.length > 0) setWantToLearn(data.canTeach[0]);
        }
      } catch (error) {
        console.error("Error fetching target user:", error);
      } finally {
        setIsLoadingUser(false);
      }
    };
    fetchTargetUser();
  }, [targetId]);

  // Set default willTeach based on current user's profile
  useEffect(() => {
    if (currentUser?.canTeach && currentUser.canTeach.length > 0 && !willTeach) {
      setWillTeach(currentUser.canTeach[0]);
    }
  }, [currentUser, willTeach]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!targetId || !currentUser) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'requests'), {
        fromUserId: currentUser.uid,
        toUserId: targetId,
        offering: willTeach,
        seeking: wantToLearn,
        message: pitch,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setStep(2);
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingUser) {
    return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">Loading...</div>;
  }

  if (!targetUser) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
        <Link to="/explore" className="text-[#10B981] hover:underline">Return to Explore</Link>
      </div>
    );
  }

  // Fallbacks if skills are empty
  const targetSkills = targetUser.canTeach?.length > 0 ? targetUser.canTeach : ['General Mentorship'];
  const mySkills = currentUser?.canTeach?.length > 0 ? currentUser.canTeach : ['General Knowledge'];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#FAFAFA] font-sans text-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        
        {step === 1 ? (
          <>
            <Link to="/explore" className="inline-flex items-center text-sm font-semibold text-[#737373] hover:text-[#0A0A0A] transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Explore
            </Link>

            <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-[0_2px_20px_rgb(0,0,0,0.04)] overflow-hidden">
              
              {/* Header */}
              <div className="p-6 sm:p-8 border-b border-[#E5E5E5] bg-[#FAFAFA] text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
                <img 
                  src={targetUser.avatarUrl || "https://i.pravatar.cc/150?img=47"} 
                  alt={targetUser.name} 
                  className="w-20 h-20 rounded-full border border-[#E5E5E5] grayscale shadow-sm object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">Propose a Swap</h1>
                  <p className="text-[#737373] mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                    with <span className="font-bold text-[#0A0A0A]">{targetUser.name}</span>
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left: What you want */}
                  <div className="space-y-4">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#FAFAFA] text-[#737373] border border-[#E5E5E5] uppercase tracking-wide">
                      Step 1
                    </div>
                    <label className="block text-base font-bold text-[#0A0A0A]">
                      What do you want to learn?
                    </label>
                    <div className="space-y-3">
                      {targetSkills.map((skill, i) => (
                        <label key={i} className="flex items-center p-3 border border-[#E5E5E5] rounded-lg cursor-pointer hover:bg-[#FAFAFA] transition-colors has-[:checked]:border-[#0A0A0A] has-[:checked]:ring-1 has-[:checked]:ring-[#0A0A0A]">
                          <input 
                            type="radio" 
                            name="wantToLearn" 
                            checked={wantToLearn === skill} 
                            onChange={() => setWantToLearn(skill)}
                            className="w-4 h-4 text-[#0A0A0A] border-gray-300 focus:ring-[#0A0A0A]" 
                          />
                          <span className="ml-3 text-sm font-semibold text-[#0A0A0A]">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Right: What you offer */}
                  <div className="space-y-4">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#FAFAFA] text-[#737373] border border-[#E5E5E5] uppercase tracking-wide">
                      Step 2
                    </div>
                    <label className="block text-base font-bold text-[#0A0A0A]">
                      What will you teach in return?
                    </label>
                    <div className="space-y-3">
                      {mySkills.map((skill, i) => (
                        <label key={i} className="flex items-center p-3 border border-[#E5E5E5] rounded-lg cursor-pointer hover:bg-[#FAFAFA] transition-colors has-[:checked]:border-[#0A0A0A] has-[:checked]:ring-1 has-[:checked]:ring-[#0A0A0A]">
                          <input 
                            type="radio" 
                            name="willTeach" 
                            checked={willTeach === skill}
                            onChange={() => setWillTeach(skill)}
                            className="w-4 h-4 text-[#0A0A0A] border-gray-300 focus:ring-[#0A0A0A]" 
                          />
                          <span className="ml-3 text-sm font-semibold text-[#0A0A0A]">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#E5E5E5]"></div>

                {/* Pitch Message */}
                <div className="space-y-4">
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#FAFAFA] text-[#737373] border border-[#E5E5E5] uppercase tracking-wide">
                    Step 3
                  </div>
                  <label className="block text-base font-bold text-[#0A0A0A]">
                    Write your pitch
                  </label>
                  <p className="text-sm text-[#737373]">Explain why this is a mutually beneficial trade. Be specific about your current roadblocks.</p>
                  <textarea 
                    rows="4" 
                    required
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    placeholder={`Hi ${targetUser.name.split(' ')[0]}, I am looking to improve my...`}
                    className="block w-full py-3 px-4 border border-[#E5E5E5] rounded-xl text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm bg-[#FAFAFA] focus:bg-white resize-none transition-colors"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <div className="pt-6">
                  <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg text-base font-bold text-white bg-[#0A0A0A] hover:bg-[#262626] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A0A0A] transition-colors shadow-sm disabled:opacity-50">
                    <Repeat className="w-5 h-5 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Swap Request'}
                  </button>
                  <p className="text-center text-xs text-[#737373] mt-4">
                    By requesting a swap, you commit to providing 1 hour of professional mentorship if accepted.
                  </p>
                </div>

              </form>
            </div>
          </>
        ) : (
          
          /* Success State */
          <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-lg p-10 text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#10B981]/20">
              <CheckCircle2 className="w-10 h-10 text-[#10B981]" />
            </div>
            <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Request Sent!</h2>
            <p className="text-lg text-[#737373] max-w-md mx-auto mb-10 leading-relaxed">
              Your swap proposal has been sent to <span className="font-bold text-[#0A0A0A]">{targetUser.name}</span>. We will notify you as soon as they respond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/requests" className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg text-base font-bold text-white bg-[#0A0A0A] hover:bg-[#262626] transition-colors">
                View Pending Requests
              </Link>
              <Link to="/explore" className="inline-flex justify-center items-center px-6 py-3 border border-[#E5E5E5] rounded-lg text-base font-bold text-[#0A0A0A] bg-white hover:bg-[#FAFAFA] transition-colors">
                Browse More Skills
              </Link>
            </div>
          </div>
          
        )}

      </div>
    </div>
  );
};

export default CreateRequest;
