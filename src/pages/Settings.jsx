import React, { useState, useEffect, useRef } from 'react';
import { User, Lock, Bell, Shield, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db, storage, auth } from '../firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { sendPasswordResetEmail, deleteUser } from 'firebase/auth';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { currentUser, logout } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    canTeach: '',
    wantToLearn: '',
    experience: 'Intermediate',
    availability: 'Flexible'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Account Security States
  const [deleteStep, setDeleteStep] = useState(0);
  const [authLoading, setAuthLoading] = useState(false);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File must be smaller than 5MB');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      // Compress image using HTML5 Canvas to avoid Firebase Storage
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 256;
          const MAX_HEIGHT = 256;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          
          // Fill white background to prevent transparent PNGs from turning black
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          
          ctx.drawImage(img, 0, 0, width, height);

          // Get base64 string (heavily compressed)
          const base64String = canvas.toDataURL('image/jpeg', 0.7);

          try {
            const userRef = doc(db, 'users', currentUser.uid);
            await setDoc(userRef, { avatarUrl: base64String }, { merge: true });
          } catch (firestoreErr) {
            console.error("Firestore error:", firestoreErr);
            setUploadError('Database error. Check Firestore rules.');
          } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
      
    } catch (err) {
      console.error("Error processing avatar:", err);
      setUploadError('Failed to process image. Please try again.');
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveAvatar = async () => {
    if (!currentUser?.avatarUrl) return;
    setUploading(true);
    setUploadError('');
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, { avatarUrl: '' }, { merge: true });
    } catch (err) {
      console.error("Error removing avatar:", err);
      setUploadError('Failed to remove image.');
    } finally {
      setUploading(false);
    }
  };
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const handlePasswordReset = async () => {
    if (!currentUser?.email) return;
    setAuthLoading(true);
    setPasswordResetSent(false);
    try {
      await sendPasswordResetEmail(auth, currentUser.email);
      setPasswordResetSent(true);
    } catch (err) {
      console.error(err);
      alert('Failed to send password reset email. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteStep === 0) {
      setDeleteStep(1);
      return;
    }
    if (deleteStep === 1) {
      setDeleteStep(2);
      return;
    }
    
    // Step 2 -> Actually delete
    setAuthLoading(true);
    try {
      // 1. Delete user document from Firestore
      await deleteDoc(doc(db, 'users', currentUser.uid));
      // 2. Delete user from Firebase Auth
      await deleteUser(auth.currentUser);
      // Auth context will automatically kick them to login page
    } catch (err) {
      console.error(err);
      // If it throws an error like 'requires-recent-login', alert the user
      alert("Failed to delete account. You may need to log out and log back in to verify your identity before deleting your account.");
      setDeleteStep(0);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        title: currentUser.title || '',
        bio: currentUser.bio || '',
        canTeach: currentUser.canTeach ? currentUser.canTeach.join(', ') : '',
        wantToLearn: currentUser.wantToLearn ? currentUser.wantToLearn.join(', ') : '',
        experience: currentUser.experience || 'Intermediate',
        availability: currentUser.availability || 'Flexible'
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!currentUser) return;
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, {
        name: formData.name,
        title: formData.title,
        bio: formData.bio,
        canTeach: formData.canTeach.split(',').map(s => s.trim()).filter(Boolean),
        wantToLearn: formData.wantToLearn.split(',').map(s => s.trim()).filter(Boolean),
        experience: formData.experience,
        availability: formData.availability,
      }, { merge: true });
      setSaveMessage('Profile saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveMessage('Failed to save profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#0A0A0A] pb-16">
      
      {/* Page Header */}
      <div className="bg-white border-b border-[#E5E5E5] px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0A]">Settings</h1>
            <p className="mt-1 text-sm text-[#737373]">Manage your account preferences and profile details.</p>
          </div>
          <div className="flex items-center gap-4">
            {saveMessage && <span className="text-sm font-semibold text-[#10B981]">{saveMessage}</span>}
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0A0A0A] hover:bg-[#262626] transition-colors shadow-sm disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
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
              <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
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
                    <img 
                      src={currentUser?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'U')}&background=0A0A0A&color=fff&size=150`}
                      alt="Current Avatar" 
                      className="w-20 h-20 rounded-full border border-[#E5E5E5] object-cover" 
                    />
                    <div>
                      <div className="flex gap-3 mb-2">
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileSelect}
                          accept="image/jpeg, image/png, image/gif"
                          className="hidden" 
                        />
                        <button 
                          onClick={() => fileInputRef.current.click()}
                          disabled={uploading}
                          className="px-4 py-2 bg-[#0A0A0A] text-white text-sm font-semibold rounded-lg hover:bg-[#262626] transition-colors disabled:opacity-50"
                        >
                          {uploading ? 'Uploading...' : 'Change'}
                        </button>
                        <button 
                          onClick={handleRemoveAvatar}
                          disabled={uploading || !currentUser?.avatarUrl}
                          className="px-4 py-2 bg-white border border-[#E5E5E5] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:bg-[#FAFAFA] transition-colors disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                      {uploadError && <p className="text-xs text-red-500 mb-1">{uploadError}</p>}
                      <p className="text-xs text-[#737373]">JPG, GIF or PNG. Max size of 2MB.</p>
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
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="block w-full py-2.5 px-3 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-2">Professional Title</label>
                      <input type="text" name="title" value={formData.title} onChange={handleChange} className="block w-full py-2.5 px-3 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-2">Bio</label>
                    <textarea rows="4" name="bio" value={formData.bio} onChange={handleChange} className="block w-full py-2.5 px-3 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm transition-colors resize-none"></textarea>
                    <p className="mt-2 text-xs text-[#737373]">Brief description for your profile. URLs are hyperlinked.</p>
                  </div>
                </div>

                <div className="h-px bg-[#E5E5E5]"></div>

                {/* Swap Preferences */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-[#0A0A0A]">Swap Preferences</h3>
                  
                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-2">I Can Teach (Comma separated)</label>
                    <input type="text" name="canTeach" value={formData.canTeach} onChange={handleChange} className="block w-full py-2.5 px-3 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm transition-colors" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-2">I Want To Learn (Comma separated)</label>
                    <input type="text" name="wantToLearn" value={formData.wantToLearn} onChange={handleChange} className="block w-full py-2.5 px-3 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm transition-colors" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-2">Experience Level</label>
                      <select name="experience" value={formData.experience} onChange={handleChange} className="block w-full py-2.5 px-3 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm transition-colors">
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-2">Availability</label>
                      <select name="availability" value={formData.availability} onChange={handleChange} className="block w-full py-2.5 px-3 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm transition-colors">
                        <option value="Flexible">Flexible</option>
                        <option value="Weekdays">Weekdays</option>
                        <option value="Evenings">Evenings</option>
                        <option value="Weekends">Weekends</option>
                      </select>
                    </div>
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
                    <input type="email" disabled value={currentUser?.email || ''} className="block w-full py-2.5 px-3 border border-[#E5E5E5] rounded-lg text-[#737373] bg-[#E5E5E5]/30 sm:text-sm cursor-not-allowed" />
                    <p className="mt-2 text-xs text-[#737373]">Your email address is verified and cannot be changed.</p>
                  </div>
                  
                  <div className="pt-4">
                    {currentUser?.providerData?.[0]?.providerId === 'google.com' ? (
                      <p className="text-sm text-[#737373] bg-[#FAFAFA] p-3 rounded-lg border border-[#E5E5E5]">
                        You signed in using Google. Your password is managed securely by Google.
                      </p>
                    ) : (
                      <div>
                        <button 
                          onClick={handlePasswordReset}
                          disabled={authLoading}
                          className="px-4 py-2 border border-[#E5E5E5] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:bg-[#FAFAFA] transition-colors disabled:opacity-50"
                        >
                          {authLoading ? 'Sending...' : 'Send Password Reset Email'}
                        </button>
                        {passwordResetSent && (
                          <p className="mt-3 text-sm font-bold text-[#10B981]">
                            Email sent! Please check your Spam / Junk folder.
                          </p>
                        )}
                      </div>
                    )}
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
                    
                    {deleteStep === 0 && (
                      <button 
                        onClick={handleDeleteAccount}
                        className="shrink-0 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                      >
                        Delete Account
                      </button>
                    )}
                    
                    {deleteStep === 1 && (
                      <button 
                        onClick={handleDeleteAccount}
                        className="shrink-0 px-4 py-2 bg-red-700 text-white text-sm font-bold rounded-lg animate-pulse shadow-sm"
                      >
                        Are you sure? Click to confirm.
                      </button>
                    )}

                    {deleteStep === 2 && (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setDeleteStep(0)}
                          className="shrink-0 px-4 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleDeleteAccount}
                          disabled={authLoading}
                          className="shrink-0 px-4 py-2 bg-red-800 text-white text-sm font-black rounded-lg hover:bg-red-900 transition-colors shadow-sm disabled:opacity-50"
                        >
                          {authLoading ? 'Deleting...' : 'PERMANENTLY DELETE'}
                        </button>
                      </div>
                    )}
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
