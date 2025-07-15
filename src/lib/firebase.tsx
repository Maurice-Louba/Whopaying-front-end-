// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: "whoppaying.firebaseapp.com",
  projectId: "whoppaying",
  storageBucket: "whoppaying.firebasestorage.app",
  messagingSenderId: "242177862862",
  appId: "1:242177862862:web:ca93880d214f29c7a2b49f",
  measurementId: "G-7EBZ8WRMJY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
export const storage =getStorage()
