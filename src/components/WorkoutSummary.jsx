// src/components/WorkoutSummary.jsx
import React from 'react';

const WorkoutSummary = ({ summary, gamification, onClose }) => {
    // summary: { day, focus, date, duration, logs, totalSets, completedSets, progressPercent }
    // gamification: { streak, rankUp, currentRank, nextRank, totalWorkouts }

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
                const maxWeight = Math.round(Math.max(0, ...completedSets.map(s => parseFloat(s.weight) || 0)));
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

            {/* Rank & Streak */}
            <div className="summary-gamification card">
                <div className="summary-xp-row">
                    <div>
                        <span className="xp-earned">{gamification.currentRank?.badge} {gamification.currentRank?.title}</span>
                        {gamification.rankUp && <span className="level-up-badge">🎖️ Rank Up!</span>}
                    </div>
                    <div className="current-level">
                        <span>Workout #{gamification.totalWorkouts}</span>
                    </div>
                </div>
                {gamification.nextRank && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                        {gamification.nextRank.minWorkouts - gamification.totalWorkouts} more to reach {gamification.nextRank.badge} {gamification.nextRank.title}
                    </div>
                )}
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
                                {ex.duration && <span>{Math.round(parseFloat(ex.duration))} min</span>}
                                {ex.distance && <span>{Math.round(parseFloat(ex.distance))} km</span>}
                                {ex.avgHR && <span>{Math.round(parseFloat(ex.avgHR))} bpm</span>}
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
