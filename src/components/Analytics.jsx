// src/components/Analytics.jsx
import React from 'react';
import { MILESTONES } from '../data/program';
import ProgressBar from './ProgressBar';

const Analytics = ({ workoutHistory, gamification }) => {
    const totalWorkouts = workoutHistory.length;
    const streak = gamification.streak || 0;

    // Calculate total volume from history
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

    const totalDuration = workoutHistory.reduce((sum, w) => sum + (w.duration || 0), 0);
    const hadPerfectWorkout = workoutHistory.some(w => w.progressPercent === 100);

    // Determine current rank from workout count
    const currentRank = [...MILESTONES.ranks].reverse().find(r => totalWorkouts >= r.minWorkouts) || MILESTONES.ranks[0];
    const nextRank = MILESTONES.ranks.find(r => r.minWorkouts > totalWorkouts);
    const workoutsToNext = nextRank ? nextRank.minWorkouts - totalWorkouts : 0;
    const progressInRank = nextRank
        ? totalWorkouts - currentRank.minWorkouts
        : 1;
    const rangeInRank = nextRank
        ? nextRank.minWorkouts - currentRank.minWorkouts
        : 1;

    // Check achievements
    const stats = { totalWorkouts, streak, totalVolume, hadPerfectWorkout };
    const unlockedAchievements = MILESTONES.achievements.filter(a => a.check(stats));
    const lockedAchievements = MILESTONES.achievements.filter(a => !a.check(stats));

    // Fun fact generators
    // Fun facts using real-world equivalents (accurate weights/times)
    const getVolumeFunFact = (kg) => {
        if (kg === 0) return "Your first rep is waiting! 💪";
        if (kg < 35) return "A Labrador Retriever 🐕 (~30 kg)";
        if (kg < 400) return "A Baby Grand Piano 🎹 (~300 kg)";
        if (kg < 700) return "A Male Polar Bear 🐻‍❄️ (~500 kg)";
        if (kg < 1500) return "A Small Hatchback Car 🚗 (~1,200 kg)";
        if (kg < 2500) return "A White Rhinoceros 🦏 (~2,300 kg)";
        if (kg < 6000) return "An African Elephant 🐘 (~5,000 kg)";
        if (kg < 15000) return "A T-Rex 🦖 (~8,000 kg)";
        if (kg < 50000) return "A City Bus 🚌 (~12,000 kg)";
        return "A Space Shuttle Orbiter 🚀 (~78,000 kg)";
    };

    const getTimeFunFact = (mins) => {
        if (mins === 0) return "Your clock starts now! ⏱️";
        if (mins < 30) return "A Sitcom Episode 📺 (~22 min)";
        if (mins < 95) return "A Football Match ⚽ (90 min)";
        if (mins < 200) return "A Feature Film 🎬 (~2 hours)";
        if (mins < 400) return "A Full School Day 🏫 (~6 hours)";
        if (mins < 700) return "The LOTR Extended Trilogy 🧝‍♂️ (~11 hrs)";
        if (mins < 1440) return "A Flight from Cape Town to London ✈️ (~11.5 hrs)";
        return "An Entire Day on Earth 🌍 (24 hrs)";
    };

    return (
        <section className="analytics">
            <h2>Your Progress</h2>

            {/* Rank Card */}
            <div className="card analytics-level-card">
                <div className="level-display">
                    <span className="level-emoji">{currentRank.badge}</span>
                    <div>
                        <h3>{currentRank.title}</h3>
                        <span className="text-muted">{currentRank.tagline}</span>
                    </div>
                </div>
                {nextRank && (
                    <div style={{ marginTop: 'var(--spacing-2)' }}>
                        <ProgressBar
                            current={progressInRank}
                            total={rangeInRank}
                            label={`${workoutsToNext} workout${workoutsToNext !== 1 ? 's' : ''} to ${nextRank.badge} ${nextRank.title}`}
                        />
                    </div>
                )}
                <div className="streak-display">
                    <span className="streak-fire">🔥</span>
                    <span>{streak} Workout Streak</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: '8px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    <span>🏋️ {totalWorkouts} workout{totalWorkouts !== 1 ? 's' : ''} completed</span>
                </div>
            </div>

            {/* Achievements */}
            <div className="card" style={{ marginTop: 'var(--spacing-2)' }}>
                <h3 style={{ marginBottom: 'var(--spacing-2)' }}>Achievements</h3>
                <div className="achievements-grid">
                    {unlockedAchievements.map(a => (
                        <div key={a.id} className="achievement-item unlocked" title={a.description}>
                            <span className="achievement-badge">{a.badge}</span>
                            <span className="achievement-title">{a.title}</span>
                        </div>
                    ))}
                    {lockedAchievements.map(a => (
                        <div key={a.id} className="achievement-item locked" title={a.description}>
                            <span className="achievement-badge">🔒</span>
                            <span className="achievement-title">{a.description}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fun Lifetime Stats */}
            <div className="analytics-stats-grid" style={{ gridTemplateColumns: '1fr', marginTop: 'var(--spacing-2)' }}>
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
