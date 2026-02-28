// src/App.jsx
import React, { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import ActiveWorkout from './components/ActiveWorkout';
import WorkoutSummary from './components/WorkoutSummary';
import { useAuth } from './hooks/useAuth';
import { useFirestore } from './hooks/useFirestore';
import { useWakeLock } from './hooks/useWakeLock';
import { GAMIFICATION } from './data/program';
import './index.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [view, setView] = useState('dashboard'); // 'auth' | 'dashboard' | 'workout' | 'summary'
  const [activeProgram, setActiveProgram] = useState(null);
  const [lastSummary, setLastSummary] = useState(null);
  const [lastGamResult, setLastGamResult] = useState(null);

  const { user, loading: authLoading, error: authError, loginWithGoogle, loginWithEmail, signupWithEmail, logout } = useAuth();
  const {
    workoutHistory, gamification, previousLogs, loading: dataLoading,
    updateWorkoutHistory, updateGamification, updatePreviousLogs
  } = useFirestore(user?.uid || null);

  const { requestWakeLock, releaseWakeLock } = useWakeLock();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleStartWorkout = (program) => {
    setActiveProgram(program);
    setView('workout');
    requestWakeLock();
  };

  const handleFinishWorkout = (summary) => {
    releaseWakeLock();

    // Persist previous logs for next workout pre-fill
    const prevLogs = { ...previousLogs };
    Object.entries(summary.logs).forEach(([exId, sets]) => {
      const isCardio = sets[0]?.duration !== undefined;
      if (isCardio) {
        prevLogs[exId] = { duration: sets[0].duration, distance: sets[0].distance, avgHR: sets[0].avgHR };
      } else {
        const lastCompleted = [...sets].reverse().find(s => s.completed);
        if (lastCompleted) {
          prevLogs[exId] = { weight: lastCompleted.weight, reps: lastCompleted.reps };
        }
      }
    });
    updatePreviousLogs(prevLogs);

    // Update workout history
    const updatedHistory = [...workoutHistory, summary];
    updateWorkoutHistory(updatedHistory);

    // Gamification calculations
    const completedCount = summary.completedSets;
    let xpEarned = completedCount * GAMIFICATION.xpPerExercise;
    if (summary.progressPercent === 100) xpEarned += GAMIFICATION.xpPerWorkoutComplete;

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
      badges: gamification.badges || [],
    };
    updateGamification(updatedGam);

    setLastSummary(summary);
    setLastGamResult({ xpEarned, streak: newStreak, levelUp, currentLevel: newLevel.level, xp: newXp });
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

  // Loading state
  if (authLoading || dataLoading) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-5)' }}>
          <h2 style={{ marginBottom: 'var(--spacing-2)' }}>Loading...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header>
        <div>
          <h1>Visceral Fat Protocol</h1>
          <p className="text-muted">
            {user ? `Welcome, ${user.displayName || user.email}` : 'Clinical 4-Day Plan Tracker'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-1)', alignItems: 'center' }}>
          {view === 'workout' && (
            <button className="theme-toggle" onClick={handleBackToDashboard} aria-label="Back to dashboard" title="Back to Dashboard">←</button>
          )}
          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          {user ? (
            <button className="theme-toggle" onClick={logout} aria-label="Sign out" title="Sign Out">🚪</button>
          ) : (
            <button className="theme-toggle" onClick={() => setView('auth')} aria-label="Sign in" title="Sign In">👤</button>
          )}
        </div>
      </header>

      <main>
        {view === 'auth' && (
          <AuthScreen
            onGoogleLogin={loginWithGoogle}
            onEmailLogin={loginWithEmail}
            onEmailSignup={signupWithEmail}
            error={authError}
          />
        )}
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
            previousLogs={previousLogs}
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
        {user && <p style={{ fontSize: '0.75rem', marginTop: '4px' }}>☁️ Synced to cloud</p>}
      </footer>
    </div>
  );
}

export default App;
