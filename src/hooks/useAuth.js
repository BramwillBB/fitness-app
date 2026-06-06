// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Capacitor } from '@capacitor/core';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        setError(null);
        if (Capacitor.isNativePlatform()) {
            setError("Google Sign-In is not supported on the mobile app yet. Please use email & password to sign in.");
            return;
        }
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            setError(err.message);
        }
    };

    const loginWithEmail = async (email, password) => {
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);
        }
    };

    const signupWithEmail = async (email, password, displayName) => {
        setError(null);
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            if (displayName) {
                await updateProfile(cred.user, { displayName });
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const logout = async () => {
        setError(null);
        try {
            await signOut(auth);
        } catch (err) {
            setError(err.message);
        }
    };

    return { user, loading, error, loginWithGoogle, loginWithEmail, signupWithEmail, logout };
}
