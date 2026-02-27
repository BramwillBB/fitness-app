// src/components/WorkoutCard.jsx
import React from 'react';

const WorkoutCard = ({ program, completedExs, onToggleExercise }) => {
    const isAllDone = program.workouts.every(w => completedExs.includes(w.id));

    return (
        <article className="card">
            <header className="card-header">
                <div>
                    <h2>{program.day}</h2>
                    <span className="badge">{program.focus}</span>
                </div>
                <span className="badge" style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)' }}>
                    {program.timeLimit}
                </span>
            </header>

            {/* Resistance Block */}
            <h3 style={{ marginTop: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)', fontSize: '1.1rem' }}>Resistance Training</h3>
            <ul className="exercise-list">
                {program.workouts.filter(w => w.category === 'Resistance').map(exercise => {
                    const isDone = completedExs.includes(exercise.id);
                    return (
                        <li key={exercise.id} className={`exercise-item ${isDone ? 'completed' : ''}`}>
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={isDone}
                                    onChange={() => onToggleExercise(exercise.id)}
                                    aria-label={`Mark ${exercise.name} as ${isDone ? 'incomplete' : 'complete'}`}
                                />
                                <span className="checkmark"></span>
                            </label>
                            <div className="exercise-details">
                                <p className="exercise-name">{exercise.name}</p>
                                <p className="exercise-meta">
                                    {exercise.sets} sets x {exercise.reps} | Rest: {exercise.rest}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Cardio / HIIT Block */}
            <h3 style={{ marginTop: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)', fontSize: '1.1rem' }}>Cardio / HIIT</h3>
            <ul className="exercise-list">
                {program.workouts.filter(w => w.category !== 'Resistance').map(exercise => {
                    const isDone = completedExs.includes(exercise.id);
                    return (
                        <li key={exercise.id} className={`exercise-item ${isDone ? 'completed' : ''}`}>
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={isDone}
                                    onChange={() => onToggleExercise(exercise.id)}
                                    aria-label={`Mark ${exercise.name} as ${isDone ? 'incomplete' : 'complete'}`}
                                />
                                <span className="checkmark"></span>
                            </label>
                            <div className="exercise-details">
                                <p className="exercise-name">
                                    {exercise.name} {exercise.category === 'HIIT' && <span className="badge" style={{ marginLeft: '8px', color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}>HIIT</span>}
                                </p>
                                <p className="exercise-meta">
                                    {exercise.duration} | {exercise.details}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>

        </article>
    );
};

export default WorkoutCard;
