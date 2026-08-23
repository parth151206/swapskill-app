import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDjTeF8sFhT0g4hVmba0sr-KSHwTY7XmKk",
  authDomain: "swapskill-web.firebaseapp.com",
  projectId: "swapskill-web",
  storageBucket: "swapskill-web.firebasestorage.app",
  messagingSenderId: "295139835965",
  appId: "1:295139835965:web:21eb7a31214729b5c0aa54",
  measurementId: "G-WT2PJNRKHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
