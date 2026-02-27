// src/hooks/useStorage.js
// Centralized localStorage persistence for workout history, gamification, and settings.

const STORAGE_KEYS = {
    WORKOUT_HISTORY: 'vfp-workout-history',
    GAMIFICATION: 'vfp-gamification',
    PREVIOUS_LOGS: 'vfp-previous-logs',
};

export function loadWorkoutHistory() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

export function saveWorkoutHistory(history) {
    localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(history));
}

export function loadGamification() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.GAMIFICATION);
        return raw ? JSON.parse(raw) : { xp: 0, streak: 0, lastWorkoutDate: null, badges: [] };
    } catch { return { xp: 0, streak: 0, lastWorkoutDate: null, badges: [] }; }
}

export function saveGamification(data) {
    localStorage.setItem(STORAGE_KEYS.GAMIFICATION, JSON.stringify(data));
}

// Store the last logged weight/reps/duration per exercise id
export function loadPreviousLogs() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.PREVIOUS_LOGS);
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}

export function savePreviousLogs(data) {
    localStorage.setItem(STORAGE_KEYS.PREVIOUS_LOGS, JSON.stringify(data));
}
