// src/components/Dashboard.jsx
import React from 'react';
import Analytics from './Analytics';
import { exerciseProgram } from '../data/program';

const Dashboard = ({ onStartWorkout, workoutHistory, gamification }) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = days[new Date().getDay()];
    const todayWorkout = exerciseProgram.find(p => p.day === todayName);

    return (
        <div className="dashboard">
            {/* Today's Workout CTA */}
            <section className="today-section">
                <h2>Today — {todayName}</h2>
                {todayWorkout ? (
                    <div className="card today-card">
                        <div className="today-card-info">
                            <h3>{todayWorkout.focus}</h3>
                            <p className="text-muted">{todayWorkout.sequence}</p>
                            <div style={{ display: 'flex', gap: 'var(--spacing-1)', marginTop: 'var(--spacing-1)', flexWrap: 'wrap' }}>
                                <span className="badge">{todayWorkout.timeLimit}</span>
                                <span className="badge">{todayWorkout.workouts.length} exercises</span>
                            </div>
                        </div>
                        <button className="start-workout-btn" onClick={() => onStartWorkout(todayWorkout)}>
                            ▶ Start Workout
                        </button>
                    </div>
                ) : (
                    <div className="card rest-day-card">
                        <h3 style={{ color: 'var(--color-success)' }}>🧘 Rest Day</h3>
                        <p className="text-muted">
                            Complete physical rest. Maintain 7-9 hours of sleep to maximize nocturnal growth hormone pulses. Prioritize protein pacing and intermittent fasting.
                        </p>
                    </div>
                )}
            </section>

            {/* Analytics */}
            <Analytics workoutHistory={workoutHistory} gamification={gamification} />

            {/* Full Weekly Schedule */}
            <section className="schedule-section">
                <h2>Weekly Schedule</h2>
                <div className="schedule-grid">
                    {exerciseProgram.map(program => {
                        const isToday = program.day === todayName;
                        return (
                            <div key={program.day} className={`card schedule-card ${isToday ? 'schedule-today' : ''}`}>
                                <div className="schedule-card-header">
                                    <div>
                                        <h3>{program.day}</h3>
                                        <span className="text-muted" style={{ fontSize: '0.85rem' }}>{program.focus}</span>
                                    </div>
                                    <span className="badge">{program.timeLimit}</span>
                                </div>
                                <ul className="schedule-exercises">
                                    {program.workouts.map(w => (
                                        <li key={w.id} className="schedule-exercise-item">
                                            <span className={`cat-dot ${w.category.toLowerCase()}`}></span>
                                            {w.name}
                                        </li>
                                    ))}
                                </ul>
                                <button className="start-workout-btn-small" onClick={() => onStartWorkout(program)}>
                                    Start
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
