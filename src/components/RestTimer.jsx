// src/components/RestTimer.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';

const RestTimer = ({ defaultSeconds, onComplete }) => {
    const [totalSeconds, setTotalSeconds] = useState(defaultSeconds);
    const [remaining, setRemaining] = useState(defaultSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        setTotalSeconds(defaultSeconds);
        setRemaining(defaultSeconds);
        setIsRunning(false);
    }, [defaultSeconds]);

    useEffect(() => {
        if (isRunning && remaining > 0) {
            intervalRef.current = setInterval(() => {
                setRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        if (onComplete) onComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning, remaining, onComplete]);

    const adjustTime = (delta) => {
        const newTotal = Math.max(10, totalSeconds + delta);
        setTotalSeconds(newTotal);
        if (!isRunning) {
            setRemaining(newTotal);
        } else {
            setRemaining(prev => Math.max(1, prev + delta));
        }
    };

    const startTimer = () => {
        if (remaining <= 0) setRemaining(totalSeconds);
        setIsRunning(true);
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setRemaining(totalSeconds);
    };

    const progress = totalSeconds > 0 ? ((totalSeconds - remaining) / totalSeconds) * 100 : 0;
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;

    return (
        <div className="rest-timer" role="timer" aria-label="Rest timer">
            <div className="rest-timer-display">
                <div className="rest-timer-circle">
                    <svg viewBox="0 0 100 100" className="rest-timer-svg">
                        <circle cx="50" cy="50" r="45" className="rest-timer-track" />
                        <circle cx="50" cy="50" r="45" className="rest-timer-progress"
                            style={{ strokeDashoffset: `${283 - (283 * progress) / 100}` }}
                        />
                    </svg>
                    <span className="rest-timer-text">
                        {mins}:{secs.toString().padStart(2, '0')}
                    </span>
                </div>
            </div>

            <div className="rest-timer-controls">
                <button className="rest-btn rest-btn-adjust" onClick={() => adjustTime(-10)} aria-label="Decrease rest by 10 seconds">−10s</button>
                {!isRunning ? (
                    <button className="rest-btn rest-btn-start" onClick={startTimer} aria-label="Start rest timer">
                        {remaining === 0 ? 'Restart' : 'Start Rest'}
                    </button>
                ) : (
                    <button className="rest-btn rest-btn-reset" onClick={resetTimer} aria-label="Reset rest timer">Reset</button>
                )}
                <button className="rest-btn rest-btn-adjust" onClick={() => adjustTime(10)} aria-label="Increase rest by 10 seconds">+10s</button>
            </div>
            {remaining === 0 && <p className="rest-timer-done">✅ Rest complete! Next set.</p>}
        </div>
    );
};

export default RestTimer;
