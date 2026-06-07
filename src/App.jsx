// src/App.jsx
import React, { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import ActiveWorkout from './components/ActiveWorkout';
import WorkoutSummary from './components/WorkoutSummary';
import { useAuth } from './hooks/useAuth';
import { useFirestore } from './hooks/useFirestore';
import { useWakeLock } from './hooks/useWakeLock';
import { MILESTONES, exerciseProgram as PROGRAM } from './data/program';
import Onboarding from './components/Onboarding';
import { generateProgram } from './utils/programGenerator';
import './index.css';

function App() {
  const [view, setView] = useState('dashboard'); // 'auth' | 'dashboard' | 'workout' | 'summary'
  const [activeProgram, setActiveProgram] = useState(null);
  const [lastSummary, setLastSummary] = useState(null);
  const [lastGamResult, setLastGamResult] = useState(null);

  const { user, loading: authLoading, error: authError, loginWithGoogle, loginWithEmail, signupWithEmail, logout } = useAuth();
  const {
    workoutHistory, gamification, previousLogs, userProfile, customProgram, loading: dataLoading,
    updateWorkoutHistory, updateGamification, updatePreviousLogs, updateUserProfile, updateCustomProgram,
    saveInProgressWorkout, clearInProgressWorkout, loadInProgressWorkout,
  } = useFirestore(user?.uid || null);

  const { requestWakeLock, releaseWakeLock } = useWakeLock();

  // Restore in-progress workout on mount
  useEffect(() => {
    if (dataLoading) return;
    const saved = loadInProgressWorkout();
    if (saved && saved.day) {
      // Find matching program day from customProgram or default PROGRAM
      const activeProgList = customProgram && customProgram.length > 0 ? customProgram : PROGRAM;
      const matchedProgram = activeProgList.find(p => p.day === saved.day);
      if (matchedProgram) {
        setActiveProgram({ ...matchedProgram, restoredLogs: saved.logs });
        setView('workout');
        requestWakeLock();
      }
    }
  }, [dataLoading, customProgram]);

  const handleOnboardingComplete = (profileData) => {
    updateUserProfile(profileData);
    const generated = generateProgram(profileData);
    updateCustomProgram(generated);
    setView('dashboard');
  };

  const handleStartWorkout = (program) => {
    setActiveProgram(program);
    setView('workout');
    requestWakeLock();
  };

  const handleSaveProgress = (progressData) => {
    // Save each set's data incrementally to previousLogs
    const prevLogs = { ...previousLogs };
    Object.entries(progressData.logs).forEach(([exId, sets]) => {
      const isCardio = sets[0]?.duration !== undefined;
      if (isCardio) {
        prevLogs[exId] = { duration: sets[0].duration, distance: sets[0].distance, avgHR: sets[0].avgHR };
      } else {
        // Only save sets that have actual data entered
        const setsWithData = sets.filter(s => s.weight !== '' || s.reps !== '' || s.completed);
        if (setsWithData.length > 0) {
          prevLogs[exId] = sets.map(s => ({ weight: s.weight, reps: s.reps }));
        }
      }
    });
    updatePreviousLogs(prevLogs);
    
    // Also persist the in-progress workout state so it survives page reloads
    saveInProgressWorkout({
      day: progressData.day,
      focus: progressData.focus,
      logs: progressData.logs,
    });
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

    // Clear in-progress workout since it's now complete
    clearInProgressWorkout();

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
    clearInProgressWorkout();
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

  const currentEffectiveView = (view !== 'auth' && !userProfile) ? 'onboarding' : view;

  return (
    <div className={`bg-background text-on-background font-body-md min-h-screen ${currentEffectiveView !== 'workout' ? 'pb-24' : ''}`}>
      {/* TopAppBar Shell */}
      {currentEffectiveView !== 'workout' && currentEffectiveView !== 'onboarding' && (
      <header className="w-full top-0 sticky bg-background border-b border-surface-variant z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-base">
        <div className="flex items-center gap-base">
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-surface-variant flex items-center justify-center text-primary font-bold">
            {user ? (user.displayName?.[0] || user.email[0]).toUpperCase() : 'IC'}
          </div>
          <span className="font-headline-lg text-[24px] font-bold tracking-tighter text-on-surface">
            IRONCORE
          </span>
        </div>
        <div className="flex items-center gap-md">
          {user ? (
            <button className="material-symbols-outlined text-primary hover:scale-105 transition-transform active:scale-95" onClick={logout} aria-label="Sign out" title="Sign Out">logout</button>
          ) : (
            <button className="material-symbols-outlined text-primary hover:scale-105 transition-transform active:scale-95" onClick={() => setView('auth')} aria-label="Sign in" title="Sign In">person</button>
          )}
        </div>
      </header>
      )}

      <main className={currentEffectiveView !== 'workout' && currentEffectiveView !== 'onboarding' ? "max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-md" : ""}>
        {currentEffectiveView === 'onboarding' && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
        {currentEffectiveView === 'auth' && (
          <AuthScreen
            onGoogleLogin={loginWithGoogle}
            onEmailLogin={loginWithEmail}
            onEmailSignup={signupWithEmail}
            error={authError}
          />
        )}
        {currentEffectiveView === 'dashboard' && (
          <Dashboard
            onStartWorkout={handleStartWorkout}
            workoutHistory={workoutHistory}
            gamification={gamification}
            program={customProgram}
          />
        )}
        {currentEffectiveView === 'workout' && activeProgram && (
          <ActiveWorkout
            program={activeProgram}
            previousLogs={previousLogs}
            onFinishWorkout={handleFinishWorkout}
            onSaveProgress={handleSaveProgress}
            onBackToDashboard={handleBackToDashboard}
          />
        )}
        {currentEffectiveView === 'summary' && lastSummary && lastGamResult && (
          <WorkoutSummary
            summary={lastSummary}
            gamification={lastGamResult}
            onClose={handleCloseSummary}
          />
        )}
      </main>

      {/* BottomNavBar Shell */}
      {currentEffectiveView !== 'workout' && currentEffectiveView !== 'onboarding' && (
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 bg-surface-container-lowest/80 backdrop-blur-xl border-t border-surface-variant z-50">
        <button onClick={() => setView('dashboard')} className={`flex flex-col items-center justify-center rounded-full px-md py-xs transition-all active:scale-90 ${view === 'dashboard' ? 'bg-primary-container text-on-primary-container' : 'text-secondary hover:text-primary'}`}>
          <span className="material-symbols-outlined">home_app_logo</span>
          <span className="font-label-sm text-label-sm">Home</span>
        </button>
        <button className="flex flex-col items-center justify-center text-secondary px-md py-xs hover:text-primary transition-colors active:scale-90">
          <span className="material-symbols-outlined">fitness_center</span>
          <span className="font-label-sm text-label-sm">Workouts</span>
        </button>
        <button className="flex flex-col items-center justify-center text-secondary px-md py-xs hover:text-primary transition-colors active:scale-90">
          <span className="material-symbols-outlined">trending_up</span>
          <span className="font-label-sm text-label-sm">Progress</span>
        </button>
        <button onClick={() => !user && setView('auth')} className={`flex flex-col items-center justify-center rounded-full px-md py-xs transition-all active:scale-90 ${view === 'auth' ? 'bg-primary-container text-on-primary-container' : 'text-secondary hover:text-primary'}`}>
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-sm text-label-sm">Profile</span>
        </button>
      </nav>
      )}
    </div>
  );
}

export default App;
