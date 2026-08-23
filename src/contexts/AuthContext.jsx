import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign Up
  const signup = async (email, password, name, title) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create initial user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      title,
      email,
      createdAt: new Date().toISOString(),
      canTeach: [],
      wantToLearn: [],
      bio: '',
      avatarUrl: ''
    });

    return userCredential;
  };

  // Log In
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Log Out
  const logout = () => {
    return signOut(auth);
  };

  // Track auth state changes
  useEffect(() => {
    let userUnsub;
    
    const authUnsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Listen to the user document in Firestore in real-time
        userUnsub = onSnapshot(doc(db, 'users', user.uid), (userDoc) => {
          if (userDoc.exists()) {
            setCurrentUser({ ...user, ...userDoc.data() });
          } else {
            setCurrentUser(user);
          }
          setLoading(false);
        }, (error) => {
          console.error("Error listening to user data:", error);
          setCurrentUser(user);
          setLoading(false);
        });
      } else {
        setCurrentUser(null);
        setLoading(false);
        if (userUnsub) userUnsub();
      }
    });

    return () => {
      authUnsub();
      if (userUnsub) userUnsub();
    };
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
