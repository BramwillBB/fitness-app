// src/App.jsx
import React, { useState } from 'react';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import ActiveWorkout from './components/ActiveWorkout';
import WorkoutSummary from './components/WorkoutSummary';
import { useAuth } from './hooks/useAuth';
import { useFirestore } from './hooks/useFirestore';
import { useWakeLock } from './hooks/useWakeLock';
import { MILESTONES } from './data/program';
import './index.css';

function App() {
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
        // Save the array of sets so each set's historical data is preserved
        prevLogs[exId] = sets.map(s => ({ weight: s.weight, reps: s.reps }));
      }
    });
    updatePreviousLogs(prevLogs);

    // Update workout history
    const updatedHistory = [...workoutHistory, summary];
    updateWorkoutHistory(updatedHistory);

    // Streak calculation
    const today = new Date().toDateString();
    let newStreak = gamification.streak || 0;
    if (gamification.lastWorkoutDate !== today) {
      newStreak += 1;
    }

    // Determine rank from total workout count
    const totalWorkouts = updatedHistory.length;
    const currentRank = [...MILESTONES.ranks].reverse().find(r => totalWorkouts >= r.minWorkouts) || MILESTONES.ranks[0];
    const nextRank = MILESTONES.ranks.find(r => r.minWorkouts > totalWorkouts);
    const oldRank = [...MILESTONES.ranks].reverse().find(r => workoutHistory.length >= r.minWorkouts) || MILESTONES.ranks[0];
    const rankUp = currentRank.title !== oldRank.title;

    const updatedGam = {
      streak: newStreak,
      lastWorkoutDate: today,
      badges: gamification.badges || [],
    };
    updateGamification(updatedGam);

    setLastSummary(summary);
    setLastGamResult({ streak: newStreak, rankUp, currentRank, nextRank, totalWorkouts });
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
          <h1>IronCore</h1>
          <p className="text-muted">
            {user ? `Welcome, ${user.displayName || user.email}` : 'Train Smarter. Track Everything.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-1)', alignItems: 'center' }}>
          {view === 'workout' && (
            <button className="header-btn" onClick={handleBackToDashboard} aria-label="Back to dashboard" title="Back to Dashboard">←</button>
          )}
          {user ? (
            <button className="header-btn" onClick={logout} aria-label="Sign out" title="Sign Out">🚪</button>
          ) : (
            <button className="header-btn" onClick={() => setView('auth')} aria-label="Sign in" title="Sign In">👤</button>
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
        <p>Science-backed training · Built for results</p>
        {user && <p style={{ fontSize: '0.75rem', marginTop: '4px' }}>☁️ Synced to cloud</p>}
      </footer>
    </div>
  );
}

export default App;
