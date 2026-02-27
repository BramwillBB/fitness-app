// src/components/Analytics.jsx
import React from 'react';
import { GAMIFICATION } from '../data/program';
import ProgressBar from './ProgressBar';

const Analytics = ({ workoutHistory, gamification }) => {
    const currentLevel = GAMIFICATION.levels.find(l => l.xpRequired <= gamification.xp);
    const nextLevel = GAMIFICATION.levels.find(l => l.xpRequired > gamification.xp);
    const xpToNext = nextLevel ? nextLevel.xpRequired - gamification.xp : 0;
    const xpInLevel = nextLevel ? gamification.xp - (currentLevel?.xpRequired || 0) : gamification.xp;
    const xpLevelRange = nextLevel ? nextLevel.xpRequired - (currentLevel?.xpRequired || 0) : 1;

    // Calculate total stats from history
    const totalWorkouts = workoutHistory.length;
    const totalDuration = workoutHistory.reduce((sum, w) => sum + (w.duration || 0), 0);

    const totalVolume = workoutHistory.reduce((sum, w) => {
        if (!w.logs) return sum;
        return sum + Object.values(w.logs).reduce((exerciseSum, sets) => {
            return exerciseSum + sets.reduce((setSum, s) => {
                if (s.weight && s.reps && s.completed) {
                    return setSum + (parseFloat(s.weight) || 0) * (parseInt(s.reps) || 0);
                }
                return setSum;
            }, 0);
        }, 0);
    }, 0);

    const avgCompletion = totalWorkouts > 0
        ? Math.round(workoutHistory.reduce((sum, w) => sum + (w.progressPercent || 0), 0) / totalWorkouts)
        : 0;

    // Last 4 workouts for mini chart
    const recentWorkouts = workoutHistory.slice(-4);

    return (
        <section className="analytics">
            <h2>Smart Analytics</h2>

            {/* Level & XP Card */}
            <div className="card analytics-level-card">
                <div className="level-display">
                    <span className="level-emoji">{currentLevel?.badge || '🌱'}</span>
                    <div>
                        <h3>Lv.{currentLevel?.level || 1} — {currentLevel?.title || 'Beginner'}</h3>
                        <span className="text-muted">{gamification.xp} XP Total</span>
                    </div>
                </div>
                {nextLevel && (
                    <div style={{ marginTop: 'var(--spacing-2)' }}>
                        <ProgressBar
                            current={xpInLevel}
                            total={xpLevelRange}
                            label={`${xpToNext} XP to Lv.${nextLevel.level} ${nextLevel.title}`}
                        />
                    </div>
                )}
                <div className="streak-display">
                    <span className="streak-fire">🔥</span>
                    <span>{gamification.streak} Workout Streak</span>
                </div>
            </div>

            {/* Lifetime Stats */}
            <div className="analytics-stats-grid">
                <div className="card metric-card">
                    <span className="metric-label">Workouts</span>
                    <span className="metric-value">{totalWorkouts}</span>
                </div>
                <div className="card metric-card">
                    <span className="metric-label">Total Time</span>
                    <span className="metric-value">{totalDuration} min</span>
                </div>
                <div className="card metric-card">
                    <span className="metric-label">Volume Lifted</span>
                    <span className="metric-value">{totalVolume.toLocaleString()} kg</span>
                </div>
                <div className="card metric-card">
                    <span className="metric-label">Avg Completion</span>
                    <span className="metric-value">{avgCompletion}%</span>
                </div>
            </div>

            {/* Recent Workouts Mini History */}
            {recentWorkouts.length > 0 && (
                <div className="card" style={{ marginTop: 'var(--spacing-2)' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-2)' }}>Recent Sessions</h3>
                    <div className="recent-sessions">
                        {recentWorkouts.map((w, i) => (
                            <div key={i} className="recent-session-row">
                                <div>
                                    <span style={{ fontWeight: 600 }}>{w.day}</span>
                                    <span className="text-muted" style={{ marginLeft: '8px', fontSize: '0.8rem' }}>
                                        {new Date(w.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                                    <span className="text-muted">{w.duration}min</span>
                                    <div className="mini-progress-bg">
                                        <div className="mini-progress-fill" style={{ width: `${w.progressPercent}%` }}></div>
                                    </div>
                                    <span style={{ fontWeight: 600, minWidth: '36px', textAlign: 'right' }}>{w.progressPercent}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Analytics;
