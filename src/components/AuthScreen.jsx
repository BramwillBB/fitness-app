// src/components/AuthScreen.jsx
import React, { useState } from 'react';

const AuthScreen = ({ onGoogleLogin, onEmailLogin, onEmailSignup, error }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            onEmailSignup(email, password, displayName);
        } else {
            onEmailLogin(email, password);
        }
    };

    return (
        <div className="flex justify-center items-center py-xl">
            <div className="bg-surface border border-surface-variant p-lg rounded-xl shadow-sm max-w-md w-full relative overflow-hidden group">
                {/* Decorative Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container opacity-20 rotate-45 translate-x-16 -translate-y-16"></div>

                <div className="text-center mb-lg relative z-10">
                    <h2 className="font-display-lg text-[48px] font-bold text-on-surface tracking-tighter leading-none mb-sm">IRONCORE</h2>
                    
                    <div className="flex justify-center gap-xs mb-md">
                        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-xl shadow-sm">💪</div>
                        <div className="w-10 h-10 rounded-full border border-surface-variant flex items-center justify-center text-xl shadow-sm bg-surface-container-lowest">🏃</div>
                        <div className="w-10 h-10 rounded-full border border-surface-variant flex items-center justify-center text-xl shadow-sm bg-surface-container-lowest">🏋️</div>
                    </div>
                    
                    <p className="font-headline-lg text-[20px] font-bold">Stronger Every Day.</p>
                    <p className="font-body-md text-secondary mt-1">Move More. Live Better.</p>
                </div>

                {error && (
                    <div className="bg-error-container text-on-error-container p-sm rounded-lg mb-md text-sm border border-error/20">
                        <p>{error}</p>
                    </div>
                )}

                <button 
                    className="w-full flex items-center justify-center gap-sm bg-surface-container-lowest border border-surface-variant py-3 rounded-lg hover:bg-surface-container-low transition-colors font-label-sm font-bold active:scale-[0.98]"
                    onClick={onGoogleLogin} 
                    type="button"
                >
                    <svg width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    </svg>
                    CONTINUE WITH GOOGLE
                </button>

                <div className="flex items-center my-md">
                    <div className="flex-1 border-t border-surface-variant"></div>
                    <span className="mx-sm font-label-sm text-secondary uppercase text-[10px]">or email</span>
                    <div className="flex-1 border-t border-surface-variant"></div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-sm">
                    {isSignup && (
                        <input
                            type="text"
                            className="w-full bg-surface-container-lowest border border-surface-variant rounded-lg px-md py-3 focus:border-on-surface focus:outline-none transition-colors"
                            placeholder="Display Name"
                            value={displayName}
                            onChange={e => setDisplayName(e.target.value)}
                            aria-label="Display name"
                        />
                    )}
                    <input
                        type="email"
                        className="w-full bg-surface-container-lowest border border-surface-variant rounded-lg px-md py-3 focus:border-on-surface focus:outline-none transition-colors"
                        placeholder="Email address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        aria-label="Email address"
                    />
                    <input
                        type="password"
                        className="w-full bg-surface-container-lowest border border-surface-variant rounded-lg px-md py-3 focus:border-on-surface focus:outline-none transition-colors"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength={6}
                        aria-label="Password"
                    />
                    <button type="submit" className="w-full bg-primary-container text-on-primary-container rounded-lg py-3 font-label-sm font-bold mt-xs hover:scale-[1.02] active:scale-[0.98] transition-transform">
                        {isSignup ? 'CREATE ACCOUNT' : 'SIGN IN'}
                    </button>
                </form>

                <p className="text-center mt-lg font-body-md text-sm">
                    {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                    <button className="font-bold text-primary hover:underline" onClick={() => setIsSignup(!isSignup)} type="button">
                        {isSignup ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>

                <p className="text-center mt-md text-[11px] text-secondary">
                    You can also use the app without signing in — data will be stored locally on this device only.
                </p>
            </div>
        </div>
    );
};

export default AuthScreen;
