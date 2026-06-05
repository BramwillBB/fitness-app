// src/components/ActiveWorkout.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import RestTimer from './RestTimer';
import IntervalTimer from './IntervalTimer';

const ActiveWorkout = ({ program, previousLogs: prevLogsProp, onFinishWorkout, onSaveProgress }) => {
    const previousLogs = prevLogsProp || {};

    const buildInitialLogs = () => {
        const logs = {};
        program.workouts.forEach(ex => {
            let prevData = previousLogs[ex.id];
            const numSets = ex.sets || 3;
            const prevSets = Array.isArray(prevData) ? prevData : (prevData ? Array(numSets).fill(prevData) : []);
            if (ex.category === 'Resistance') {
                logs[ex.id] = Array.from({ length: numSets }, (_, i) => ({
                    setNum: i + 1,
                    weight: '',
                    reps: '',
                    completed: false,
                }));
            } else {
                logs[ex.id] = [{
                    setNum: 1,
                    duration: prevSets[0]?.duration ?? '',
                    distance: prevSets[0]?.distance ?? '',
                    avgHR: prevSets[0]?.avgHR ?? '',
                    completed: false,
                }];
            }
        });
        return logs;
    };

    const [exerciseLogs, setExerciseLogs] = useState(() => {
        if (program.restoredLogs) return program.restoredLogs;
        return buildInitialLogs();
    });
    
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [showTip, setShowTip] = useState(false);
    const [activeTimer, setActiveTimer] = useState(null);
    const [activeIntervals, setActiveIntervals] = useState(null);
    const [workoutStartTime] = useState(Date.now());

    const saveTimeoutRef = useRef(null);
    const triggerSave = (logs) => {
        if (!onSaveProgress) return;
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
            onSaveProgress({ day: program.day, focus: program.focus, logs });
        }, 500);
    };

    const updateSetField = (exerciseId, setIndex, field, value) => {
        setExerciseLogs(prev => {
            const updated = { ...prev };
            updated[exerciseId] = [...updated[exerciseId]];
            updated[exerciseId][setIndex] = { ...updated[exerciseId][setIndex], [field]: value };
            triggerSave(updated);
            return updated;
        });
    };

    const markSetDone = (exerciseId, setIndex) => {
        setExerciseLogs(prev => {
            const updated = { ...prev };
            updated[exerciseId] = [...updated[exerciseId]];
            
            const currentSet = updated[exerciseId][setIndex];
            const isCompleting = !currentSet.completed;
            
            if (isCompleting) {
                let prevData = previousLogs[exerciseId];
                const prevSets = Array.isArray(prevData) ? prevData : (prevData ? Array(updated[exerciseId].length).fill(prevData) : []);
                const prevSet = prevSets[setIndex];
                
                if (prevSet) {
                    if (currentSet.weight === '' && prevSet.weight !== undefined) currentSet.weight = prevSet.weight;
                    if (currentSet.reps === '' && prevSet.reps !== undefined) currentSet.reps = prevSet.reps;
                }
                
                const exercise = program.workouts.find(ex => ex.id === exerciseId);
                if (exercise && exercise.defaultRest > 0) {
                    setActiveTimer(exercise.defaultRest);
                }
            }
            
            currentSet.completed = isCompleting;
            triggerSave(updated);
            return updated;
        });
    };

    const addSet = (exerciseId) => {
        setExerciseLogs(prev => {
            const updated = { ...prev };
            updated[exerciseId] = [...updated[exerciseId], {
                setNum: updated[exerciseId].length + 1,
                weight: '',
                reps: '',
                completed: false
            }];
            triggerSave(updated);
            return updated;
        });
    };

    const handleFinish = () => {
        const totalSets = Object.values(exerciseLogs).reduce((sum, sets) => sum + sets.length, 0);
        const completedSets = Object.values(exerciseLogs).reduce((sum, sets) => sum + sets.filter(s => s.completed).length, 0);
        const progressPercent = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
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

    const exercise = program.workouts[currentExerciseIndex];
    if (!exercise) return null;

    const sets = exerciseLogs[exercise.id] || [];
    let prevData = previousLogs[exercise.id];
    const prevSets = Array.isArray(prevData) ? prevData : (prevData ? Array(sets.length).fill(prevData) : []);
    const isResistance = exercise.category === 'Resistance';
    const isLastExercise = currentExerciseIndex === program.workouts.length - 1;

    // Progress
    const totalProgramSets = Object.values(exerciseLogs).reduce((sum, sets) => sum + sets.length, 0);
    const completedProgramSets = Object.values(exerciseLogs).reduce((sum, sets) => sum + sets.filter(s => s.completed).length, 0);
    const progressPercent = totalProgramSets > 0 ? Math.round((completedProgramSets / totalProgramSets) * 100) : 0;

    // Estimate 1RM helper
    const calculate1RM = () => {
        if (!isResistance) return null;
        let max1RM = 0;
        prevSets.forEach(s => {
            if (s && s.weight && s.reps) {
                const w = parseFloat(s.weight);
                const r = parseFloat(s.reps);
                if (w > 0 && r > 0) {
                    const e1rm = w * (1 + (r / 30));
                    if (e1rm > max1RM) max1RM = e1rm;
                }
            }
        });
        return max1RM > 0 ? max1RM.toFixed(1) : '--';
    };
    const e1rm = calculate1RM();
    
    // Previous Best helper
    const getPreviousBest = () => {
        if (!isResistance || !prevSets || prevSets.length === 0) return 'No previous data';
        let best = { weight: 0, reps: 0 };
        prevSets.forEach(s => {
            if (s && parseFloat(s.weight) > best.weight) {
                best = { weight: parseFloat(s.weight), reps: parseFloat(s.reps) || 0 };
            }
        });
        return best.weight > 0 ? `${best.weight}kg × ${best.reps} reps` : 'No previous data';
    };
    const prevBestStr = getPreviousBest();

    return (
        <div className="min-h-screen bg-surface flex flex-col relative z-[100]">
            {/* Custom Header */}
            <header className="w-full top-0 sticky bg-background border-b border-surface-variant flex justify-between items-center px-margin-mobile md:px-margin-desktop py-base z-50">
                <div className="flex items-center gap-base">
                    <button onClick={() => {
                        if (currentExerciseIndex > 0) setCurrentExerciseIndex(currentExerciseIndex - 1);
                    }} className={`active:scale-95 transition-all p-xs ${currentExerciseIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}>
                        <span className="material-symbols-outlined text-on-surface">arrow_back</span>
                    </button>
                    <h1 className="font-headline-lg-mobile text-[24px] font-bold tracking-tighter text-on-surface truncate max-w-[200px] sm:max-w-[400px]">
                        {exercise.name}
                    </h1>
                </div>
                <button className="active:scale-95 transition-all p-xs" onClick={() => setShowTip(!showTip)}>
                    <span className="material-symbols-outlined text-primary">info</span>
                </button>
            </header>

            <main className="pb-xl flex-1 flex flex-col">
                {/* Progress Bar */}
                <section className="px-margin-mobile md:px-margin-desktop py-md bg-surface-container-lowest">
                    <div className="flex justify-between items-center mb-xs">
                        <span className="font-label-sm text-[12px] text-secondary uppercase">Workout Progress</span>
                        <span className="font-label-sm text-[12px] font-bold text-primary">{progressPercent}% ({completedProgramSets}/{totalProgramSets})</span>
                    </div>
                    <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                </section>

                {/* Hero Section Gradient */}
                <section className="w-full h-48 sm:h-64 relative overflow-hidden bg-gradient-to-br from-surface-dim via-primary-container/20 to-surface-variant flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                    <span className="material-symbols-outlined text-[80px] text-primary/30 z-0">
                        {isResistance ? 'fitness_center' : 'directions_run'}
                    </span>
                </section>

                {/* Exercise Details Card */}
                <section className="px-margin-mobile md:px-margin-desktop -mt-md relative z-10 flex-1">
                    <div className="bg-surface-container-lowest/80 backdrop-blur-xl border border-surface-variant rounded-xl p-md shadow-sm">
                        <div className="flex justify-between items-start mb-md">
                            <div>
                                <p className="font-label-sm text-[12px] text-secondary uppercase mb-xs">Standard Goal</p>
                                <h2 className="font-headline-lg-mobile text-[24px] font-bold leading-tight">
                                    {isResistance ? `${exercise.sets} sets × ${exercise.reps} reps` : exercise.duration}
                                </h2>
                            </div>
                            <button 
                                className="bg-primary-container text-on-primary-fixed-variant px-sm py-xs rounded-full flex items-center gap-xs active:scale-95 transition-transform"
                                onClick={() => setShowTip(!showTip)}
                            >
                                <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                                <span className="font-label-sm text-[12px] font-bold uppercase hidden sm:inline">Tip</span>
                            </button>
                        </div>

                        {showTip && exercise.tip && (
                            <div className="mb-md p-sm bg-surface-container rounded-lg border border-surface-variant text-sm text-on-surface-variant">
                                <strong>Expert Tip:</strong> {exercise.tip}
                                {exercise.details && <div className="mt-2 text-xs opacity-80">{exercise.details}</div>}
                            </div>
                        )}

                        {/* Logging Area */}
                        {isResistance ? (
                            <>
                                {/* Table Header */}
                                <div className="grid grid-cols-[40px_1fr_1fr_48px] gap-sm px-sm mb-base">
                                    <span className="font-label-sm text-[12px] text-secondary uppercase">Set</span>
                                    <span className="font-label-sm text-[12px] text-secondary uppercase text-center">Weight (kg)</span>
                                    <span className="font-label-sm text-[12px] text-secondary uppercase text-center">Reps</span>
                                    <span className="font-label-sm text-[12px] text-secondary uppercase text-right">Done</span>
                                </div>
                                {/* Set Rows */}
                                <div className="space-y-base">
                                    {sets.map((set, i) => (
                                        <div key={i} className="grid grid-cols-[40px_1fr_1fr_48px] gap-sm items-center px-sm py-xs border-b border-surface-variant group focus-within:border-primary-container transition-all">
                                            <span className="font-headline-lg-mobile text-[24px] font-bold text-secondary opacity-50">{set.setNum}</span>
                                            <input 
                                                className="w-full bg-surface-container-lowest border border-surface-variant rounded-lg p-sm text-center font-label-sm text-on-surface focus:border-on-surface focus:outline-none transition-colors" 
                                                placeholder={prevSets[i]?.weight ? `Last: ${Math.round(parseFloat(prevSets[i].weight))}` : "kg"} 
                                                type="number"
                                                inputMode="decimal"
                                                value={set.weight}
                                                onChange={e => updateSetField(exercise.id, i, 'weight', e.target.value)}
                                            />
                                            <input 
                                                className="w-full bg-surface-container-lowest border border-surface-variant rounded-lg p-sm text-center font-label-sm text-on-surface focus:border-on-surface focus:outline-none transition-colors" 
                                                placeholder={prevSets[i]?.reps ? `Last: ${Math.round(parseFloat(prevSets[i].reps))}` : "reps"} 
                                                type="number"
                                                inputMode="decimal"
                                                value={set.reps}
                                                onChange={e => updateSetField(exercise.id, i, 'reps', e.target.value)}
                                            />
                                            <button 
                                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors active:scale-90 ml-auto ${set.completed ? 'bg-primary-container border-primary-container' : 'border-surface-variant'}`}
                                                onClick={() => markSetDone(exercise.id, i)}
                                            >
                                                <span className={`material-symbols-outlined text-[16px] text-on-primary-container transition-opacity ${set.completed ? 'opacity-100' : 'opacity-0'}`}>check</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="space-y-md">
                                {exercise.intervals && (
                                    <button 
                                        className="w-full bg-surface-container text-on-surface py-md rounded-xl font-label-sm font-bold uppercase tracking-wider flex justify-center items-center gap-sm active:scale-[0.98] transition-transform"
                                        onClick={() => setActiveIntervals({ ...exercise.intervals, exerciseId: exercise.id })}
                                    >
                                        <span className="material-symbols-outlined">timer</span>
                                        Start Interval Timer
                                    </button>
                                )}
                                <div className="grid grid-cols-2 gap-sm">
                                    <div className="flex flex-col gap-xs">
                                        <label className="font-label-sm text-[12px] text-secondary uppercase">Duration (min)</label>
                                        <input 
                                            type="number" 
                                            className="w-full bg-surface-container-lowest border border-surface-variant rounded-lg p-md font-label-sm text-on-surface focus:border-on-surface focus:outline-none" 
                                            placeholder="mins"
                                            value={sets[0]?.duration ?? ''}
                                            onChange={e => updateSetField(exercise.id, 0, 'duration', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-xs">
                                        <label className="font-label-sm text-[12px] text-secondary uppercase">Distance (km)</label>
                                        <input 
                                            type="number" 
                                            step="0.1"
                                            className="w-full bg-surface-container-lowest border border-surface-variant rounded-lg p-md font-label-sm text-on-surface focus:border-on-surface focus:outline-none" 
                                            placeholder="km"
                                            value={sets[0]?.distance ?? ''}
                                            onChange={e => updateSetField(exercise.id, 0, 'distance', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button
                                    className={`w-full py-md rounded-xl font-label-sm font-bold uppercase transition-colors flex items-center justify-center gap-xs ${sets[0]?.completed ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container border border-surface-variant text-on-surface'}`}
                                    onClick={() => markSetDone(exercise.id, 0)}
                                >
                                    {sets[0]?.completed && <span className="material-symbols-outlined text-[18px]">check</span>}
                                    {sets[0]?.completed ? 'Completed' : 'Mark Complete'}
                                </button>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-lg flex gap-base">
                            {isResistance && (
                                <button 
                                    className="flex-1 bg-surface-container-high text-on-surface font-label-sm text-[12px] font-bold py-md rounded-xl active:scale-95 transition-transform"
                                    onClick={() => addSet(exercise.id)}
                                >
                                    ADD SET
                                </button>
                            )}
                            <button 
                                className="flex-[2] bg-primary-container text-on-primary-fixed-variant font-label-sm text-[12px] font-bold py-md rounded-xl active:scale-95 transition-transform uppercase tracking-wider"
                                onClick={() => {
                                    if (isLastExercise) {
                                        handleFinish();
                                    } else {
                                        setCurrentExerciseIndex(i => i + 1);
                                    }
                                }}
                            >
                                {isLastExercise ? 'Finish Workout' : 'Next Exercise'}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Insights & Trends Bento */}
                {isResistance && (
                    <section className="px-margin-mobile md:px-margin-desktop mt-lg pb-md">
                        <h3 className="font-label-sm text-[12px] text-secondary uppercase tracking-wider mb-md">Insights & Trends</h3>
                        <div className="grid grid-cols-2 gap-base">
                            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-md flex flex-col justify-between h-32">
                                <span className="material-symbols-outlined text-primary">trending_up</span>
                                <div>
                                    <p className="font-label-sm text-[10px] text-secondary uppercase">Estimated 1RM</p>
                                    <p className="font-headline-lg-mobile text-[24px] font-bold text-on-surface">{e1rm} {e1rm !== '--' ? 'kg' : ''}</p>
                                </div>
                            </div>
                            <div className="bg-on-background rounded-xl p-md flex flex-col justify-between h-32 text-surface">
                                <span className="material-symbols-outlined text-primary-container">timer</span>
                                <div>
                                    <p className="font-label-sm text-[10px] opacity-60 uppercase">Rest Timer</p>
                                    <p className="font-headline-lg-mobile text-[24px] font-bold font-mono">
                                        {exercise.defaultRest ? `${Math.floor(exercise.defaultRest/60)}:${(exercise.defaultRest%60).toString().padStart(2,'0')}` : '0:00'}
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-2 bg-surface-container-lowest border border-surface-variant rounded-xl p-md flex items-center justify-between">
                                <div className="flex items-center gap-base">
                                    <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">history</span>
                                    </div>
                                    <div>
                                        <p className="font-label-sm text-[12px] text-on-surface font-bold uppercase">Previous Best</p>
                                        <p className="font-label-sm text-[11px] text-secondary">{prevBestStr}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* Modals */}
            {activeTimer !== null && (
                <div className="fixed inset-0 bg-on-background/80 backdrop-blur-sm z-[200] flex justify-center items-center" onClick={() => setActiveTimer(null)}>
                    <div className="bg-surface p-lg rounded-2xl w-[90%] max-w-sm" onClick={e => e.stopPropagation()}>
                        <RestTimer defaultSeconds={activeTimer} autoStart={true} onComplete={() => setActiveTimer(null)} />
                        <button className="w-full mt-md bg-surface-container py-sm rounded-lg font-label-sm font-bold active:scale-95 transition-transform" onClick={() => setActiveTimer(null)}>Close</button>
                    </div>
                </div>
            )}

            {activeIntervals && (
                <div className="fixed inset-0 bg-on-background/90 z-[200]">
                    <IntervalTimer 
                        intervals={activeIntervals} 
                        onComplete={() => {
                            if (activeIntervals.exerciseId) {
                                markSetDone(activeIntervals.exerciseId, 0);
                            }
                            setActiveIntervals(null);
                        }}
                        onClose={() => setActiveIntervals(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default ActiveWorkout;
