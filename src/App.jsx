// src/App.jsx
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import ActiveWorkout from './components/ActiveWorkout';
import WorkoutSummary from './components/WorkoutSummary';
import { useWakeLock } from './hooks/useWakeLock';
import { GAMIFICATION } from './data/program';
import {
  loadWorkoutHistory, saveWorkoutHistory,
  loadGamification, saveGamification,
  loadPreviousLogs, savePreviousLogs,
} from './hooks/useStorage';
import './index.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'workout' | 'summary'
  const [activeProgram, setActiveProgram] = useState(null);
  const [lastSummary, setLastSummary] = useState(null);
  const [lastGamResult, setLastGamResult] = useState(null);

  const [workoutHistory, setWorkoutHistory] = useState(loadWorkoutHistory);
  const [gamification, setGamification] = useState(loadGamification);

  const { requestWakeLock, releaseWakeLock } = useWakeLock();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleStartWorkout = (program) => {
    setActiveProgram(program);
    setView('workout');
    requestWakeLock(); // Keep screen on during workout
  };

  const handleFinishWorkout = (summary) => {
    releaseWakeLock();

    // Persist previous logs for next workout pre-fill
    const prevLogs = loadPreviousLogs();
    Object.entries(summary.logs).forEach(([exId, sets]) => {
      const isCardio = sets[0]?.duration !== undefined;
      if (isCardio) {
        prevLogs[exId] = { duration: sets[0].duration, distance: sets[0].distance, avgHR: sets[0].avgHR };
      } else {
        // Use last completed set as default for next time
        const lastCompleted = [...sets].reverse().find(s => s.completed);
        if (lastCompleted) {
          prevLogs[exId] = { weight: lastCompleted.weight, reps: lastCompleted.reps };
        }
      }
    });
    savePreviousLogs(prevLogs);

    // Update workout history
    const updatedHistory = [...workoutHistory, summary];
    setWorkoutHistory(updatedHistory);
    saveWorkoutHistory(updatedHistory);

    // Gamification calculations
    const completedCount = summary.completedSets;
    let xpEarned = completedCount * GAMIFICATION.xpPerExercise;
    if (summary.progressPercent === 100) xpEarned += GAMIFICATION.xpPerWorkoutComplete;

    // Streak logic
    const today = new Date().toDateString();
    let newStreak = gamification.streak;
    if (gamification.lastWorkoutDate !== today) {
      newStreak += 1;
      xpEarned += GAMIFICATION.xpPerStreak;
    }

    const newXp = gamification.xp + xpEarned;
    const oldLevel = GAMIFICATION.levels.filter(l => l.xpRequired <= gamification.xp).pop();
    const newLevel = GAMIFICATION.levels.filter(l => l.xpRequired <= newXp).pop();
    const levelUp = newLevel.level > (oldLevel?.level || 0);

    const updatedGam = {
      xp: newXp,
      streak: newStreak,
      lastWorkoutDate: today,
      badges: gamification.badges,
    };
    setGamification(updatedGam);
    saveGamification(updatedGam);

    setLastSummary(summary);
    setLastGamResult({
      xpEarned,
      streak: newStreak,
      levelUp,
      currentLevel: newLevel.level,
      xp: newXp,
    });
    setView('summary');
  };

  const handleCloseSummary = () => {
    setView('dashboard');
    setActiveProgram(null);
    setLastSummary(null);
    setLastGamResult(null);
  };

  const handleBackToDashboard = () => {
    releaseWakeLock();
    setView('dashboard');
    setActiveProgram(null);
  };

  return (
    <div className="app-container">
      <header>
        <div>
          <h1>Visceral Fat Protocol</h1>
          <p className="text-muted">Clinical 4-Day Plan Tracker</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-1)', alignItems: 'center' }}>
          {view === 'workout' && (
            <button className="theme-toggle" onClick={handleBackToDashboard} aria-label="Back to dashboard" title="Back to Dashboard">
              ←
            </button>
          )}
          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main>
        {view === 'dashboard' && (
          <Dashboard
            onStartWorkout={handleStartWorkout}
            workoutHistory={workoutHistory}
            gamification={gamification}
          />
        )}
        {view === 'workout' && activeProgram && (
          <ActiveWorkout
            program={activeProgram}
            onFinishWorkout={handleFinishWorkout}
          />
        )}
        {view === 'summary' && lastSummary && lastGamResult && (
          <WorkoutSummary
            summary={lastSummary}
            gamification={lastGamResult}
            onClose={handleCloseSummary}
          />
        )}
      </main>

      <footer style={{ marginTop: 'var(--spacing-5)', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem', paddingBottom: 'var(--spacing-3)' }}>
        <p>Based on peer-reviewed endocrinology and exercise physiology data.</p>
      </footer>
    </div>
  );
}

export default App;
