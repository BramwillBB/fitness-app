// src/components/ActiveWorkout.jsx
import React, { useState, useMemo } from 'react';
import RestTimer from './RestTimer';

const ActiveWorkout = ({ program, previousLogs: prevLogsProp, onFinishWorkout }) => {
    const previousLogs = prevLogsProp || {};

    // Build initial log state: each exercise has an array of set entries
    const buildInitialLogs = () => {
        const logs = {};
        program.workouts.forEach(ex => {
            const prev = previousLogs[ex.id];
            if (ex.category === 'Resistance') {
                const numSets = ex.sets || 3;
                logs[ex.id] = Array.from({ length: numSets }, (_, i) => ({
                    setNum: i + 1,
                    weight: prev?.weight ?? '',
                    reps: prev?.reps ?? '',
                    completed: false,
                }));
            } else {
                // Cardio / HIIT
                logs[ex.id] = [{
                    setNum: 1,
                    duration: prev?.duration ?? '',
                    distance: prev?.distance ?? '',
                    avgHR: prev?.avgHR ?? '',
                    completed: false,
                }];
            }
        });
        return logs;
    };

    const [exerciseLogs, setExerciseLogs] = useState(buildInitialLogs);
    const [activeExercise, setActiveExercise] = useState(null);
    const [showTip, setShowTip] = useState(null);
    const [workoutStartTime] = useState(Date.now());

    const updateSetField = (exerciseId, setIndex, field, value) => {
        setExerciseLogs(prev => {
            const updated = { ...prev };
            updated[exerciseId] = [...updated[exerciseId]];
            updated[exerciseId][setIndex] = { ...updated[exerciseId][setIndex], [field]: value };
            return updated;
        });
    };

    const markSetDone = (exerciseId, setIndex) => {
        setExerciseLogs(prev => {
            const updated = { ...prev };
            updated[exerciseId] = [...updated[exerciseId]];
            updated[exerciseId][setIndex] = { ...updated[exerciseId][setIndex], completed: !updated[exerciseId][setIndex].completed };
            return updated;
        });
    };

    // Calculate completion
    const totalSets = Object.values(exerciseLogs).reduce((sum, sets) => sum + sets.length, 0);
    const completedSets = Object.values(exerciseLogs).reduce(
        (sum, sets) => sum + sets.filter(s => s.completed).length, 0
    );
    const progressPercent = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

    const handleFinish = () => {
        const duration = Math.round((Date.now() - workoutStartTime) / 1000 / 60);
        onFinishWorkout({
            day: program.day,
            focus: program.focus,
            date: new Date().toISOString(),
            duration,
            logs: exerciseLogs,
            totalSets,
            completedSets,
            progressPercent,
        });
    };

    return (
        <div className="active-workout">
            {/* Workout Header */}
            <div className="active-workout-header">
                <div>
                    <h2>{program.day}: {program.focus}</h2>
                    <p className="text-muted">{program.sequence}</p>
                </div>
                <span className="badge">{program.timeLimit}</span>
            </div>

            {/* Live Progress */}
            <div className="progress-container" style={{ marginBottom: 'var(--spacing-3)' }}>
                <div className="progress-header">
                    <span>Workout Progress</span>
                    <span>{progressPercent}% ({completedSets}/{totalSets})</span>
                </div>
                <div className="progress-bar-bg" role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
                </div>
            </div>

            {/* Exercise List */}
            {program.workouts.map(exercise => {
                const sets = exerciseLogs[exercise.id] || [];
                const allDone = sets.every(s => s.completed);
                const isExpanded = activeExercise === exercise.id;
                const isResistance = exercise.category === 'Resistance';

                return (
                    <article key={exercise.id} className={`card exercise-card ${allDone ? 'exercise-done' : ''}`}>
                        <header
                            className="exercise-card-header"
                            onClick={() => setActiveExercise(isExpanded ? null : exercise.id)}
                            role="button"
                            tabIndex={0}
                            aria-expanded={isExpanded}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)' }}>
                                <span className={`exercise-status-dot ${allDone ? 'done' : ''}`}></span>
                                <div>
                                    <h3 className="exercise-card-name">{exercise.name}</h3>
                                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                                        {isResistance ? `${exercise.sets} sets × ${exercise.reps}` : exercise.duration}
                                        {exercise.category === 'HIIT' && <span className="badge hiit-badge" style={{ marginLeft: '8px' }}>HIIT</span>}
                                    </span>
                                </div>
                            </div>
                            <span className="expand-arrow">{isExpanded ? '▲' : '▼'}</span>
                        </header>

                        {isExpanded && (
                            <div className="exercise-card-body">
                                {/* Expert Tip */}
                                <button className="tip-toggle" onClick={(e) => { e.stopPropagation(); setShowTip(showTip === exercise.id ? null : exercise.id); }}>
                                    {showTip === exercise.id ? '💡 Hide Expert Tip' : '💡 Show Expert Tip'}
                                </button>
                                {showTip === exercise.id && (
                                    <div className="expert-tip">
                                        <p>{exercise.tip}</p>
                                    </div>
                                )}

                                {/* Logging Sets */}
                                {isResistance ? (
                                    <div className="set-log-grid">
                                        <div className="set-log-header">
                                            <span>Set</span><span>Weight (kg)</span><span>Reps</span><span>Done</span>
                                        </div>
                                        {sets.map((set, i) => (
                                            <div key={i} className={`set-log-row ${set.completed ? 'set-completed' : ''}`}>
                                                <span className="set-num">{set.setNum}</span>
                                                <input
                                                    type="number"
                                                    className="set-input"
                                                    placeholder="kg"
                                                    value={set.weight}
                                                    onChange={e => updateSetField(exercise.id, i, 'weight', e.target.value)}
                                                    aria-label={`Weight for set ${set.setNum}`}
                                                />
                                                <input
                                                    type="number"
                                                    className="set-input"
                                                    placeholder="reps"
                                                    value={set.reps}
                                                    onChange={e => updateSetField(exercise.id, i, 'reps', e.target.value)}
                                                    aria-label={`Reps for set ${set.setNum}`}
                                                />
                                                <button
                                                    className={`set-done-btn ${set.completed ? 'checked' : ''}`}
                                                    onClick={() => markSetDone(exercise.id, i)}
                                                    aria-label={`Mark set ${set.setNum} as ${set.completed ? 'incomplete' : 'complete'}`}
                                                >
                                                    {set.completed ? '✓' : '○'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    /* Cardio / HIIT Logging */
                                    <div className="cardio-log">
                                        <div className="cardio-log-grid">
                                            <div className="cardio-field">
                                                <label>Duration (min)</label>
                                                <input type="number" className="set-input" placeholder="mins"
                                                    value={sets[0]?.duration ?? ''}
                                                    onChange={e => updateSetField(exercise.id, 0, 'duration', e.target.value)}
                                                />
                                            </div>
                                            <div className="cardio-field">
                                                <label>Distance (km)</label>
                                                <input type="number" className="set-input" placeholder="km" step="0.1"
                                                    value={sets[0]?.distance ?? ''}
                                                    onChange={e => updateSetField(exercise.id, 0, 'distance', e.target.value)}
                                                />
                                            </div>
                                            <div className="cardio-field">
                                                <label>Avg HR (bpm)</label>
                                                <input type="number" className="set-input" placeholder="bpm"
                                                    value={sets[0]?.avgHR ?? ''}
                                                    onChange={e => updateSetField(exercise.id, 0, 'avgHR', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            className={`set-done-btn cardio-done-btn ${sets[0]?.completed ? 'checked' : ''}`}
                                            onClick={() => markSetDone(exercise.id, 0)}
                                        >
                                            {sets[0]?.completed ? '✓ Completed' : 'Mark Complete'}
                                        </button>
                                    </div>
                                )}

                                {/* Rest Timer */}
                                {exercise.defaultRest > 0 && (
                                    <RestTimer defaultSeconds={exercise.defaultRest} />
                                )}
                            </div>
                        )}
                    </article>
                );
            })}

            {/* Finish Workout Button */}
            <button className="finish-workout-btn" onClick={handleFinish}>
                🏁 Finish Workout
            </button>
        </div>
    );
};

export default ActiveWorkout;
