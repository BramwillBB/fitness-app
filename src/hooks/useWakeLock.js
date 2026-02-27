// src/hooks/useWakeLock.js
import { useState, useEffect, useCallback } from 'react';

export function useWakeLock() {
    const [isActive, setIsActive] = useState(false);
    const [wakeLock, setWakeLock] = useState(null);

    const requestWakeLock = useCallback(async () => {
        if ('wakeLock' in navigator) {
            try {
                const lock = await navigator.wakeLock.request('screen');
                setWakeLock(lock);
                setIsActive(true);
                lock.addEventListener('release', () => {
                    setIsActive(false);
                    setWakeLock(null);
                });
            } catch (err) {
                console.warn('Wake Lock request failed:', err);
                setIsActive(false);
            }
        }
    }, []);

    const releaseWakeLock = useCallback(async () => {
        if (wakeLock) {
            await wakeLock.release();
            setWakeLock(null);
            setIsActive(false);
        }
    }, [wakeLock]);

    // Re-acquire wake lock if page becomes visible again
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && isActive && !wakeLock) {
                requestWakeLock();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [isActive, wakeLock, requestWakeLock]);

    return { isActive, requestWakeLock, releaseWakeLock };
}
