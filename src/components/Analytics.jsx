// src/components/Analytics.jsx
import React from 'react';
import { MILESTONES } from '../data/program';
import ProgressBar from './ProgressBar';

const Analytics = ({ workoutHistory, gamification }) => {
    const totalWorkouts = workoutHistory.length;
    const streak = gamification.streak || 0;

    const totalVolume = workoutHistory.reduce((sum, w) => {
        if (!w.logs) return sum;
        return sum + Object.values(w.logs).reduce((exSum, sets) => {
            return exSum + sets.reduce((setSum, s) => {
                if (s.weight && s.reps && s.completed) {
                    return setSum + (parseFloat(s.weight) || 0) * (parseInt(s.reps) || 0);
                }
                return setSum;
            }, 0);
        }, 0);
    }, 0);

    const totalDuration = workoutHistory.reduce((sum, w) => sum + (w.duration || 0), 0);

    const currentRank = [...MILESTONES.ranks].reverse().find(r => totalWorkouts >= r.minWorkouts) || MILESTONES.ranks[0];
    const nextRank = MILESTONES.ranks.find(r => r.minWorkouts > totalWorkouts);
    const workoutsToNext = nextRank ? nextRank.minWorkouts - totalWorkouts : 0;
    
    // Fun facts
    const getVolumeFunFact = (kg) => {
        if (kg === 0) return "Your first rep is waiting! 💪";
        if (kg < 35) return "A Labrador Retriever 🐕 (~30 kg)";
        if (kg < 400) return "A Baby Grand Piano 🎹 (~300 kg)";
        if (kg < 700) return "A Male Polar Bear 🐻‍❄️ (~500 kg)";
        if (kg < 1500) return "A Small Hatchback Car 🚗 (~1,200 kg)";
        return "An African Elephant 🐘 (~5,000 kg)";
    };

    const stats = { totalWorkouts, streak, totalVolume, hadPerfectWorkout: workoutHistory.some(w => w.progressPercent === 100) };
    const unlockedAchievements = MILESTONES.achievements.filter(a => a.check(stats));
    const lockedAchievements = MILESTONES.achievements.filter(a => !a.check(stats));

    return (
        <section className="mt-xl">
            <header className="mb-lg">
                <h2 className="font-display-lg text-[40px] text-on-surface mb-xs leading-none">Performance Hub</h2>
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Lifetime Statistics</p>
            </header>

            {/* Stats Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-xl">
                {/* Workouts Card */}
                <div className="bg-surface border border-surface-variant p-md md:col-span-1 border-l-4 border-l-primary-container rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
                    <p className="font-label-sm text-label-sm text-secondary mb-base">TOTAL WORKOUTS</p>
                    <div className="flex items-baseline gap-xs">
                        <span className="font-headline-lg text-[32px] font-bold">{totalWorkouts}</span>
                    </div>
                    {nextRank && (
                        <div className="mt-md h-1 bg-surface-container rounded-full overflow-hidden">
                            <div className="bg-primary-container h-full transition-all duration-1000" style={{ width: `${(totalWorkouts / nextRank.minWorkouts) * 100}%` }}></div>
                        </div>
                    )}
                    {nextRank && <p className="text-[10px] text-secondary mt-1">{workoutsToNext} left to {nextRank.title}</p>}
                </div>

                {/* Duration Card */}
                <div className="bg-surface border border-surface-variant p-md md:col-span-1 border-l-4 border-l-primary-container rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
                    <p className="font-label-sm text-label-sm text-secondary mb-base">TOTAL TIME</p>
                    <div className="flex items-baseline gap-xs">
                        <span className="font-headline-lg text-[32px] font-bold">{totalDuration}</span>
                        <span className="font-label-sm text-label-sm text-secondary">MIN</span>
                    </div>
                </div>

                {/* Volume Lifted Card */}
                <div className="bg-surface border border-surface-variant p-md md:col-span-2 rounded-xl shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-md">
                        <p className="font-label-sm text-label-sm text-secondary">TOTAL VOLUME LIFTED</p>
                        <span className="material-symbols-outlined text-secondary">fitness_center</span>
                    </div>
                    <div className="flex items-baseline gap-xs mb-sm">
                        <span className="font-headline-lg text-[40px] font-bold">{Math.round(totalVolume).toLocaleString()}</span>
                        <span className="font-label-sm text-label-sm text-secondary">KG</span>
                    </div>
                    <div className="bg-surface-container-low p-sm rounded-lg border border-surface-variant mt-auto">
                        <span className="font-label-sm text-[10px] text-primary font-bold">FUN FACT</span>
                        <p className="text-sm text-on-surface-variant mt-1">You've lifted the equivalent of <strong>{getVolumeFunFact(totalVolume)}</strong>.</p>
                    </div>
                </div>
            </div>

            {/* Rank / Milestones */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
                <section>
                    <h2 className="font-headline-lg text-[24px] mb-md">Current Rank</h2>
                    <div className="bg-on-surface p-md rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container opacity-10 rotate-45 translate-x-16 -translate-y-16"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center mb-md text-[24px]">
                                {currentRank.badge}
                            </div>
                            <h3 className="font-headline-lg text-[32px] text-surface-container-lowest font-bold mb-xs">{currentRank.title}</h3>
                            <p className="font-body-md text-surface-variant mb-lg">{currentRank.tagline}</p>
                            
                            <div className="flex items-center gap-base">
                                <div className="flex items-center gap-xs">
                                    <span className="text-2xl">🔥</span>
                                    <span className="text-surface-container-lowest font-bold">{streak} Day Streak</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="font-headline-lg text-[24px] mb-md">Achievements</h2>
                    <div className="space-y-base max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                        {unlockedAchievements.map(a => (
                            <div key={a.id} className="flex items-center gap-md p-base bg-primary/5 border border-primary rounded-lg transition-colors">
                                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-xl shadow-sm">
                                    {a.badge}
                                </div>
                                <div className="flex-1">
                                    <p className="font-label-sm text-label-sm font-bold text-on-surface">{a.title}</p>
                                    <p className="text-[10px] text-secondary uppercase mt-0.5">{a.description}</p>
                                </div>
                                <span className="material-symbols-outlined text-primary">verified</span>
                            </div>
                        ))}
                        {lockedAchievements.map(a => (
                            <div key={a.id} className="flex items-center gap-md p-base border border-surface-variant rounded-lg bg-surface-container-low opacity-60">
                                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined text-[18px]">lock</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-label-sm text-label-sm font-bold text-secondary">Locked</p>
                                    <p className="text-[10px] text-secondary uppercase mt-0.5">{a.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Analytics;
