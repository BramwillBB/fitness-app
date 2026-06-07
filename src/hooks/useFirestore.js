// src/hooks/useFirestore.js
// Cloud storage layer using Firestore. Falls back to localStorage if user is not authenticated.
import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

// localStorage fallback helpers (same as before)
function loadLocal(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
}

function saveLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function useFirestore(userId) {
    const [workoutHistory, setWorkoutHistory] = useState([]);
    const [gamification, setGamification] = useState({ xp: 0, streak: 0, lastWorkoutDate: null, badges: [] });
    const [previousLogs, setPreviousLogs] = useState({});
    const [userProfile, setUserProfile] = useState(null);
    const [customProgram, setCustomProgram] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- Load initial data ---
    useEffect(() => {
        if (!userId) {
            // No user → use localStorage
            setWorkoutHistory(loadLocal('vfp-workout-history', []));
            setGamification(loadLocal('vfp-gamification', { xp: 0, streak: 0, lastWorkoutDate: null, badges: [] }));
            setPreviousLogs(loadLocal('vfp-previous-logs', {}));
            setUserProfile(loadLocal('vfp-user-profile', null));
            setCustomProgram(loadLocal('vfp-custom-program', null));
            setLoading(false);
            return;
        }

        // User authenticated → listen to Firestore in real time
        const userDocRef = doc(db, 'users', userId);
        const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                setWorkoutHistory(data.workoutHistory || []);
                setGamification(data.gamification || { xp: 0, streak: 0, lastWorkoutDate: null, badges: [] });
                setPreviousLogs(data.previousLogs || {});
                setUserProfile(data.userProfile || null);
                setCustomProgram(data.customProgram || null);
            }
            setLoading(false);
        }, (err) => {
            console.error('Firestore listener error:', err);
            // Fallback to localStorage
            setWorkoutHistory(loadLocal('vfp-workout-history', []));
            setGamification(loadLocal('vfp-gamification', { xp: 0, streak: 0, lastWorkoutDate: null, badges: [] }));
            setPreviousLogs(loadLocal('vfp-previous-logs', {}));
            setUserProfile(loadLocal('vfp-user-profile', null));
            setCustomProgram(loadLocal('vfp-custom-program', null));
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId]);

    // --- Save helpers ---
    const saveToCloud = useCallback(async (field, value) => {
        if (userId) {
            try {
                const userDocRef = doc(db, 'users', userId);
                await setDoc(userDocRef, { [field]: value }, { merge: true });
            } catch (err) {
                console.error(`Failed to save ${field} to Firestore:`, err);
            }
        }
    }, [userId]);

    const updateWorkoutHistory = useCallback((newHistory) => {
        setWorkoutHistory(newHistory);
        saveLocal('vfp-workout-history', newHistory);
        saveToCloud('workoutHistory', newHistory);
    }, [saveToCloud]);

    const updateGamification = useCallback((newGam) => {
        setGamification(newGam);
        saveLocal('vfp-gamification', newGam);
        saveToCloud('gamification', newGam);
    }, [saveToCloud]);

    const updatePreviousLogs = useCallback((newLogs) => {
        setPreviousLogs(newLogs);
        saveLocal('vfp-previous-logs', newLogs);
        saveToCloud('previousLogs', newLogs);
    }, [saveToCloud]);

    const updateUserProfile = useCallback((profile) => {
        setUserProfile(profile);
        saveLocal('vfp-user-profile', profile);
        saveToCloud('userProfile', profile);
    }, [saveToCloud]);

    const updateCustomProgram = useCallback((program) => {
        setCustomProgram(program);
        saveLocal('vfp-custom-program', program);
        saveToCloud('customProgram', program);
    }, [saveToCloud]);

    // In-progress workout persistence
    const saveInProgressWorkout = useCallback((data) => {
        saveLocal('vfp-in-progress-workout', data);
        saveToCloud('inProgressWorkout', data);
    }, [saveToCloud]);

    const clearInProgressWorkout = useCallback(() => {
        localStorage.removeItem('vfp-in-progress-workout');
        saveToCloud('inProgressWorkout', null);
    }, [saveToCloud]);

    const loadInProgressWorkout = useCallback(() => {
        return loadLocal('vfp-in-progress-workout', null);
    }, []);

    // Migrate localStorage data to Firestore on first login
    const migrateLocalData = useCallback(async () => {
        if (!userId) return;
        const userDocRef = doc(db, 'users', userId);
        const snapshot = await getDoc(userDocRef);

        if (!snapshot.exists()) {
            // First time user — migrate any existing localStorage data to Firestore
            const localHistory = loadLocal('vfp-workout-history', []);
            const localGam = loadLocal('vfp-gamification', { xp: 0, streak: 0, lastWorkoutDate: null, badges: [] });
            const localLogs = loadLocal('vfp-previous-logs', {});
            const localProfile = loadLocal('vfp-user-profile', null);
            const localProg = loadLocal('vfp-custom-program', null);

            if (localHistory.length > 0 || localGam.xp > 0 || localProfile) {
                await setDoc(userDocRef, {
                    workoutHistory: localHistory,
                    gamification: localGam,
                    previousLogs: localLogs,
                    userProfile: localProfile,
                    customProgram: localProg,
                }, { merge: true });
            }
        }
    }, [userId]);

    useEffect(() => {
        if (userId) migrateLocalData();
    }, [userId, migrateLocalData]);

    return {
        workoutHistory,
        gamification,
        previousLogs,
        userProfile,
        customProgram,
        loading,
        updateWorkoutHistory,
        updateGamification,
        updatePreviousLogs,
        updateUserProfile,
        updateCustomProgram,
        saveInProgressWorkout,
        clearInProgressWorkout,
        loadInProgressWorkout,
    };
}
