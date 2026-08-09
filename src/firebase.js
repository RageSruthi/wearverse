// src/firebase.js
// Firebase SDK Configuration & Service Initialization for WearVerse
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// User's Web App Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEC0KkB2gW8dVbZQCflr4bJqFhUz9axek",
  authDomain: "wearverse.firebaseapp.com",
  projectId: "wearverse",
  storageBucket: "wearverse.firebasestorage.app",
  messagingSenderId: "320176761810",
  appId: "1:320176761810:web:f8e9324ac0407108ca760b",
  measurementId: "G-1XNXB6TQ12",
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Services with Safe Fallbacks
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
