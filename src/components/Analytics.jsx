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

    // Fun fact generators
    const getVolumeFunFact = (kg) => {
        if (kg === 0) return "Ready to lift!";
        if (kg < 500) return "A Grand Piano 🎹";
        if (kg < 1500) return "A Polar Bear 🐻‍❄️";
        if (kg < 3000) return "A Rhinoceros 🦏";
        if (kg < 6000) return "An Elephant 🐘";
        if (kg < 12000) return "A T-Rex 🦖";
        return "A Space Shuttle 🚀";
    };

    const getTimeFunFact = (mins) => {
        if (mins === 0) return "Time to start!";
        if (mins < 60) return "A Sitcom Episode 📺";
        if (mins < 180) return "A Feature Film 🎬";
        if (mins < 600) return "Lord of the Rings Marathon 🧝‍♂️";
        if (mins < 1440) return "A Flight across the World ✈️";
        return "A Literal Marathon 🏃‍♂️";
    };

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

            {/* Fun Lifetime Stats */}
            <div className="analytics-stats-grid" style={{ gridTemplateColumns: '1fr' }}>
                <div className="card metric-card" style={{ alignItems: 'flex-start' }}>
                    <span className="metric-label">Total Volume Lifted</span>
                    <span className="metric-value" style={{ color: 'var(--color-primary)' }}>{Math.round(totalVolume).toLocaleString()} kg</span>
                    <div style={{ marginTop: '8px', padding: '8px', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', width: '100%' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>💡 Fun Fact:</span>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>You've lifted the equivalent of <strong>{getVolumeFunFact(totalVolume)}</strong></p>
                    </div>
                </div>
                <div className="card metric-card" style={{ alignItems: 'flex-start' }}>
                    <span className="metric-label">Total Time Training</span>
                    <span className="metric-value" style={{ color: 'var(--color-secondary)' }}>{totalDuration} min</span>
                    <div style={{ marginTop: '8px', padding: '8px', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', width: '100%' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>💡 Fun Fact:</span>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>You've been working out for the length of <strong>{getTimeFunFact(totalDuration)}</strong></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Analytics;
