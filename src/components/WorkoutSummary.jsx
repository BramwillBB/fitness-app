// src/components/WorkoutSummary.jsx
import React from 'react';
import { GAMIFICATION } from '../data/program';

const WorkoutSummary = ({ summary, gamification, onClose }) => {
    // summary: { day, focus, date, duration, logs, totalSets, completedSets, progressPercent }
    // gamification: { xp, streak, xpEarned, levelUp, currentLevel }

    const currentLevel = GAMIFICATION.levels.find(l => l.level === gamification.currentLevel) || GAMIFICATION.levels[0];

    // Build per-exercise summary
    const exerciseSummaries = [];
    if (summary.logs) {
        Object.entries(summary.logs).forEach(([exId, sets]) => {
            const isCardio = sets[0]?.duration !== undefined;
            if (isCardio) {
                exerciseSummaries.push({
                    id: exId,
                    isCardio: true,
                    duration: sets[0].duration,
                    distance: sets[0].distance,
                    avgHR: sets[0].avgHR,
                    completed: sets[0].completed,
                });
            } else {
                const completedSets = sets.filter(s => s.completed);
                const totalVolume = completedSets.reduce((vol, s) => vol + (parseFloat(s.weight) || 0) * (parseInt(s.reps) || 0), 0);
                const maxWeight = Math.max(0, ...completedSets.map(s => parseFloat(s.weight) || 0));
                exerciseSummaries.push({
                    id: exId,
                    isCardio: false,
                    setsCompleted: completedSets.length,
                    totalSets: sets.length,
                    totalVolume: Math.round(totalVolume),
                    maxWeight,
                });
            }
        });
    }

    const totalVolume = exerciseSummaries
        .filter(e => !e.isCardio)
        .reduce((sum, e) => sum + e.totalVolume, 0);

    return (
        <div className="workout-summary">
            <div className="summary-hero">
                <h2>Workout Complete! 🎉</h2>
                <p className="text-muted">{summary.day} — {summary.focus}</p>
            </div>

            {/* XP & Level */}
            <div className="summary-gamification card">
                <div className="summary-xp-row">
                    <div>
                        <span className="xp-earned">+{gamification.xpEarned} XP Earned</span>
                        {gamification.levelUp && <span className="level-up-badge">🎖️ Level Up!</span>}
                    </div>
                    <div className="current-level">
                        <span className="level-badge">{currentLevel.badge}</span>
                        <span>Lv.{currentLevel.level} {currentLevel.title}</span>
                    </div>
                </div>
                <div className="summary-streak">
                    🔥 Streak: {gamification.streak} {gamification.streak === 1 ? 'workout' : 'workouts'}
                </div>
            </div>

            {/* Key Metrics */}
            <div className="summary-metrics">
                <div className="card metric-card">
                    <span className="metric-label">Duration</span>
                    <span className="metric-value">{summary.duration} min</span>
                </div>
                <div className="card metric-card">
                    <span className="metric-label">Completion</span>
                    <span className="metric-value">{summary.progressPercent}%</span>
                </div>
                <div className="card metric-card">
                    <span className="metric-label">Total Volume</span>
                    <span className="metric-value">{totalVolume.toLocaleString()} kg</span>
                </div>
            </div>

            {/* Per-Exercise Breakdown */}
            <section className="summary-exercises">
                <h3>Exercise Breakdown</h3>
                {exerciseSummaries.map(ex => (
                    <div key={ex.id} className="summary-exercise-row card">
                        <span className="summary-ex-name">{ex.id.replace(/_/g, ' ').toUpperCase()}</span>
                        {ex.isCardio ? (
                            <div className="summary-ex-stats">
                                {ex.duration && <span>{ex.duration} min</span>}
                                {ex.distance && <span>{ex.distance} km</span>}
                                {ex.avgHR && <span>{ex.avgHR} bpm</span>}
                                <span className={ex.completed ? 'stat-good' : 'stat-miss'}>{ex.completed ? '✓' : '✗'}</span>
                            </div>
                        ) : (
                            <div className="summary-ex-stats">
                                <span>{ex.setsCompleted}/{ex.totalSets} sets</span>
                                <span>{ex.totalVolume} kg vol</span>
                                {ex.maxWeight > 0 && <span>Max: {ex.maxWeight} kg</span>}
                            </div>
                        )}
                    </div>
                ))}
            </section>

            <button className="finish-workout-btn" onClick={onClose}>
                ← Back to Dashboard
            </button>
        </div>
    );
};

export default WorkoutSummary;
