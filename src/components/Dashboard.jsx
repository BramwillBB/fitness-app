// src/components/Dashboard.jsx
import React from 'react';
import Analytics from './Analytics';
import { exerciseProgram as DEFAULT_PROGRAM } from '../data/program';

// Exercise icon mapping
const EXERCISE_ICONS = {
  'Resistance': '🏋️',
  'HIIT': '⚡',
  'Cardio': '🏃',
};

const MUSCLE_ICONS = {
  'Upper Chest': '💪',
  'Back': '🔙',
  'Shoulders': '🎯',
  'Arms': '💪',
  'Quads': '🦵',
  'Glutes/Legs': '🦵',
  'Hamstrings/Glutes': '🍑',
  'Core': '🎯',
  'Full Body/Legs': '🏋️',
  'Back/Biceps': '💪',
  'Shoulders/Power': '⚡',
  'Core/Grip': '✊',
  'Chest/Triceps': '💪',
  'Back (Lats)': '🔙',
  'Quads/Core': '🦵',
  'Obliques/Core': '🎯',
};

const Dashboard = ({ onStartWorkout, workoutHistory, gamification, program }) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayAbbr = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    
    const activeProgram = program && program.length > 0 ? program : DEFAULT_PROGRAM;
    
    // JS dates are 0=Sunday, 1=Monday... We'll map them so Mon=0 ... Sun=6 for a consistent layout
    const now = new Date();
    const todayIndex = now.getDay();
    // In JS: 0=Sunday, 1=Monday, 2=Tuesday, etc.
    // If the program days are 'Day 1', 'Day 2', etc. (from programGenerator), we should display the corresponding Day or today's name.
    // Let's check: if activeProgram uses Day 1/2/3, we search for todayName or fall back to Day 1.
    // Let's make it search by day name (e.g. 'Tuesday') or map to Day 1/Day 2/Day 3 based on current day of week.
    // Let's write a small helper to find today's workout in both styles:
    const todayName = days[todayIndex];
    let todayWorkout = activeProgram.find(p => p.day === todayName);
    
    // Fallback if the program is Day 1, Day 2, etc.:
    if (!todayWorkout && activeProgram.length > 0) {
        // If it's a 3-day split, we can map: Tuesday -> Day 1, Thursday -> Day 2, Saturday -> Day 3, else Rest Day.
        // Or we can just find any day or show Day 1/2/3 in the listing.
        // Let's see: if user has a custom program using Day 1/Day 2, let's map:
        // Tue -> Day 1, Thu -> Day 2, Sat -> Day 3 (if 3 or 4 days) or simply check if day is today.
        // Let's map Day 1 to Tuesday, Day 2 to Thursday, Day 3 to Saturday, Day 4 to Sunday.
        const dayMap = {
            'Tuesday': 'Day 1',
            'Thursday': 'Day 2',
            'Saturday': 'Day 3',
            'Sunday': 'Day 4'
        };
        const mappedDayName = dayMap[todayName];
        todayWorkout = activeProgram.find(p => p.day === mappedDayName);
    }

    // Build 7-day window around today
    const weekDays = [];
    for (let i = -3; i <= 3; i++) {
        const d = new Date(now);
        d.setDate(now.getDate() + i);
        const dayOfWeek = days[d.getDay()];
        
        // Check if there is a workout on this day:
        let hasWorkout = activeProgram.some(p => p.day === dayOfWeek);
        if (!hasWorkout && activeProgram.length > 0) {
            const dayMap = {
                'Tuesday': 'Day 1',
                'Thursday': 'Day 2',
                'Saturday': 'Day 3',
                'Sunday': 'Day 4'
            };
            const MappedDayName = dayMap[dayOfWeek];
            hasWorkout = activeProgram.some(p => p.day === MappedDayName);
        }
        
        weekDays.push({
            date: d,
            dayName: d.getDay() === 0 ? 'SUN' : d.getDay() === 1 ? 'MON' : d.getDay() === 2 ? 'TUE' : d.getDay() === 3 ? 'WED' : d.getDay() === 4 ? 'THU' : d.getDay() === 5 ? 'FRI' : 'SAT',
            dayNum: d.getDate(),
            isToday: i === 0,
            hasWorkout,
        });
    }

    return (
        <div className="flex flex-col gap-lg">
            {/* Horizontal Date Picker */}
            <section className="mb-md overflow-x-auto">
                <div className="flex gap-base py-base scrollbar-hide">
                    {weekDays.map((day, i) => {
                        const baseClasses = "flex flex-col items-center justify-center min-w-[64px] h-20 rounded-xl transition-all cursor-pointer ";
                        const todayClasses = day.isToday 
                            ? "bg-primary-container border-2 border-primary text-on-primary-container shadow-sm scale-110"
                            : "bg-surface-container-lowest border border-surface-variant/50 text-secondary hover:bg-surface-container-low";
                        
                        return (
                            <div key={i} className={baseClasses + todayClasses}>
                                <span className="font-label-sm text-label-sm">{day.dayName}</span>
                                <span className="font-headline-lg text-headline-lg-mobile">{day.dayNum}</span>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Quick Stats & Next Workout (Bento Grid) */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                {/* Next Workout Card */}
                <div className="md:col-span-12 bg-inverse-surface p-md rounded-xl text-inverse-on-surface">
                    <p className="font-label-sm text-label-sm opacity-70 mb-xs">TODAY'S PLAN</p>
                    {todayWorkout ? (
                        <>
                            <h3 className="font-headline-lg text-[24px] text-primary-container">
                                {todayWorkout.focus}
                            </h3>
                            <p className="text-sm opacity-80 mt-1">{todayWorkout.sequence} • {todayWorkout.timeLimit}</p>
                            <div className="flex justify-between items-center mt-md">
                                <span className="font-label-sm text-label-sm uppercase">{todayWorkout.workouts.length} EXERCISES</span>
                                <button 
                                    onClick={() => onStartWorkout(todayWorkout)}
                                    className="bg-primary-container text-on-primary-container px-md py-xs rounded-full font-label-sm font-bold hover:scale-105 transition-transform active:scale-95"
                                >
                                    START WORKOUT
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3 className="font-headline-lg text-[24px] text-primary-container">Rest Day</h3>
                            <p className="text-sm opacity-80 mt-1">Complete physical rest. Maintain 7-9 hours of sleep.</p>
                        </>
                    )}
                </div>
            </section>

            {/* Today Exercise Horizontal Preview (Weekly Schedule) */}
            <section className="mt-md">
                <div className="flex justify-between items-end mb-md">
                    <h2 className="font-headline-lg text-[24px]">Full Schedule</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                    {activeProgram.map(program => {
                        const isToday = program.day === todayName;
                        return (
                            <div key={program.day} className={`group relative p-md rounded-xl overflow-hidden border transition-all duration-300 ${isToday ? 'border-primary bg-primary/5' : 'border-surface-variant bg-surface-container-highest hover:border-primary/50'}`}>
                                <div className="flex justify-between items-start mb-sm">
                                    <div>
                                        <span className="font-label-sm text-[10px] text-primary-container bg-on-primary-fixed-variant px-base py-1 rounded uppercase tracking-tighter">
                                            {program.day}
                                        </span>
                                        <h4 className="font-headline-lg text-[20px] text-on-surface mt-xs">{program.focus}</h4>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-secondary">{program.timeLimit}</span>
                                </div>
                                <p className="text-sm text-secondary mb-md line-clamp-2">{program.sequence || "Rest and recover."}</p>
                                <button 
                                    onClick={() => onStartWorkout(program)}
                                    className="w-full py-2 border border-surface-variant rounded-lg font-label-sm hover:bg-surface-container-low transition-colors"
                                >
                                    VIEW
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Analytics Section (Imported from Analytics.jsx, which we will style next) */}
            <Analytics workoutHistory={workoutHistory} gamification={gamification} />
            
        </div>
    );
};

export default Dashboard;
