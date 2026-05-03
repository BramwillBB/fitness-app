import React, { useState, useEffect } from 'react';

const IntervalTimer = ({ intervals, onComplete, onClose }) => {
    // states: "PREPARE", "WORK", "REST", "DONE"
    const [phase, setPhase] = useState("PREPARE");
    const [round, setRound] = useState(1);
    const [timeLeft, setTimeLeft] = useState(5); // 5 seconds preparation
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused || phase === "DONE") return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev > 1) return prev - 1;

                // Time's up for current phase, transition
                if (phase === "PREPARE") {
                    setPhase("WORK");
                    return intervals.work;
                } else if (phase === "WORK") {
                    if (round >= intervals.rounds) {
                        setPhase("DONE");
                        if (onComplete) onComplete();
                        return 0;
                    } else {
                        setPhase("REST");
                        return intervals.rest;
                    }
                } else if (phase === "REST") {
                    setPhase("WORK");
                    setRound((r) => r + 1);
                    return intervals.work;
                }
                return 0;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [phase, round, isPaused, intervals, onComplete]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        if (m > 0) {
            return `${m}:${s.toString().padStart(2, '0')}`;
        }
        return s.toString();
    };

    let phaseClass = '';
    if (phase === "PREPARE") phaseClass = "phase-prepare";
    if (phase === "WORK") phaseClass = "phase-work";
    if (phase === "REST") phaseClass = "phase-rest";
    if (phase === "DONE") phaseClass = "phase-done";

    return (
        <div className="interval-modal-overlay" onClick={onClose}>
            <div className={`interval-modal-content ${phaseClass}`} onClick={(e) => e.stopPropagation()}>
                <button className="interval-close-btn" onClick={onClose} aria-label="Close Timer">✕</button>
                
                <div className="interval-header">
                    <h2>Round {Math.min(round, intervals.rounds)} of {intervals.rounds}</h2>
                    <div className="interval-phase-label">{phase}</div>
                </div>

                <div className="interval-time-display">
                    {formatTime(timeLeft)}
                </div>

                <div className="interval-controls">
                    {phase !== "DONE" && (
                        <button className="interval-btn" onClick={() => setIsPaused(!isPaused)}>
                            {isPaused ? "▶ Resume" : "⏸ Pause"}
                        </button>
                    )}
                    <button className="interval-btn stop" onClick={onClose}>
                        {phase === "DONE" ? "Finish" : "⏹ Stop"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IntervalTimer;
