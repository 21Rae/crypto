import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import authBgImg from '../assets/images/ondo_auth_bg_1785259442538.jpg';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const supabase = getSupabase();

    if (supabase && isSupabaseConfigured()) {
      setLoading(true);
      try {
        if (mode === 'signup') {
          const { error: signUpErr } = await supabase.auth.signUp({
            email: email.trim(),
            password,
          });
          if (signUpErr) {
            setError(signUpErr.message);
            setLoading(false);
            return;
          }
        } else {
          const { error: signInErr } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });
          if (signInErr) {
            setError(signInErr.message);
            setLoading(false);
            return;
          }
        }
      } catch (err: any) {
        setError(err.message || 'Authentication error occurred.');
        setLoading(false);
        return;
      }
      setLoading(false);
    }

    onLogin(email.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-10 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-none md:rounded-3xl max-w-5xl w-full min-h-screen md:min-h-[580px] md:max-h-[92vh] overflow-hidden shadow-2xl flex flex-col md:flex-row relative border border-gray-100 my-auto">
        {/* Left Half: Moody Sepia Architecture Image with Logo Overlay */}
        <div className="w-full md:w-1/2 min-h-[220px] md:min-h-[580px] relative bg-neutral-900 overflow-hidden flex flex-col justify-between p-6 md:p-8">
          {/* Architectural Background Image */}
          <img
            src={authBgImg}
            alt="Ondo Architecture"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105 transform hover:scale-100 transition-transform duration-1000"
            style={{
              filter: 'sepia(0.25) contrast(1.1) brightness(0.9)',
            }}
          />
          {/* Warm Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 pointer-events-none" />

          {/* Top Left Brand Overlay */}
          <div className="relative z-10 flex items-center gap-1.5 text-white">
            <span className="font-sans text-2xl font-light tracking-tight leading-none">@</span>
            <span className="font-sans text-2xl font-semibold tracking-tight">Ondo</span>
          </div>
        </div>

        {/* Right Half: Sign up or Sign in Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-12 lg:p-14 bg-white flex flex-col justify-between relative overflow-y-auto">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 text-gray-800 hover:text-black hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6 stroke-[1.75]" />
          </button>

          <div>
            {/* Mode Switcher Tabs */}
            <div className="inline-flex bg-gray-100 p-1 rounded-xl gap-1 mb-6 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white text-gray-900 shadow-2xs font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError('');
                }}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-white text-gray-900 shadow-2xs font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-6">
              <h2 className="text-3xl sm:text-[32px] font-semibold text-gray-900 tracking-tight leading-tight">
                {mode === 'signup' ? 'Create an account' : 'Welcome back'}
              </h2>
              <p className="text-sm text-gray-600 font-normal mt-2 leading-relaxed max-w-md">
                {mode === 'signup'
                  ? 'Enter your email and password to create your Ondo account.'
                  : 'Enter your email and password to sign in to your Ondo account.'}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            {/* Email & Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Address Input */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#F2F2F2] border border-transparent rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:bg-white focus:border-gray-400 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-gray-700">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <a href="#forgot" className="text-[11px] font-medium text-blue-600 hover:underline">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === 'signup' ? 'At least 6 characters' : 'Enter your password'}
                    className="w-full bg-[#F2F2F2] border border-transparent rounded-xl pl-10 pr-10 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:bg-white focus:border-gray-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-gray-400 hover:text-gray-700 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Continue / Submit button */}
              <button
                type="submit"
                disabled={!email.trim() || !password || loading}
                className={`w-full py-3.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  email.trim() && password && !loading
                    ? 'bg-black text-white hover:bg-neutral-800 shadow-xs'
                    : 'bg-[#E5E5E5] text-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? 'Authenticating...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Legal / Support Footer note */}
          <div className="mt-6 pt-3 text-[11px] leading-relaxed text-gray-500 font-normal">
            <p>
              By continuing you agree to Ondo's{' '}
              <a href="#privacy" className="underline hover:text-gray-800">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="#terms" className="underline hover:text-gray-800">
                Terms of Service
              </a>.
            </p>
            <p className="mt-0.5">
              Need help? Contact{' '}
              <a href="mailto:support@ondo.finance" className="underline hover:text-gray-800">
                support@ondo.finance
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

