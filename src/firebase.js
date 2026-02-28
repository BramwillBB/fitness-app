// src/firebase.js
// Firebase configuration and initialization.

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA1cwQgd9l3rLbxwMTI0r4dVUyTa3PUKWM",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fitness-app-f7ae8.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fitness-app-f7ae8",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fitness-app-f7ae8.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "663981397989",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:663981397989:web:745daaa3c3b063aca8410c",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-15RRR8LWCT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
