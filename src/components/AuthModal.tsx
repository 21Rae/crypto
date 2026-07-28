import React, { useState } from 'react';
import { X } from 'lucide-react';
import authBgImg from '../assets/images/ondo_auth_bg_1785259442538.jpg';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onLogin(email.trim());
      onClose();
    }
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
        <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-12 lg:p-14 bg-white flex flex-col justify-between relative">
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
            {/* Title & Subtitle */}
            <div className="mb-8 mt-2">
              <h2 className="text-3xl sm:text-[32px] font-semibold text-gray-900 tracking-tight leading-tight">
                Sign up or Sign in
              </h2>
              <p className="text-sm text-gray-600 font-normal mt-3 leading-relaxed max-w-md">
                Enter your email to sign in to your account. If you don't have an account yet, one will be created for you.
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-normal text-gray-500 mb-1.5">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                    className="w-full bg-[#F2F2F2] border border-transparent rounded-xl px-4 py-3.5 text-sm font-medium text-gray-900 focus:outline-none focus:bg-white focus:border-gray-400 transition-all pr-12"
                  />
                  {/* FaceID / Passkey Icon */}
                  <div className="absolute right-3.5 text-gray-700 pointer-events-none">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <path d="M8 9h.01" />
                      <path d="M16 9h.01" />
                      <path d="M9 15c1.5 1 4.5 1 6 0" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Continue button */}
              <button
                type="submit"
                disabled={!email.trim()}
                className={`w-full py-3.5 rounded-xl text-sm font-medium transition-all ${
                  email.trim()
                    ? 'bg-black text-white hover:bg-neutral-800 cursor-pointer shadow-xs'
                    : 'bg-[#E5E5E5] text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <span className="relative bg-white px-4 text-xs font-normal text-gray-500">Or</span>
            </div>

            {/* Google Sign In button */}
            <button
              type="button"
              onClick={() => {
                onLogin(email.trim() || 'user@ondo.finance');
                onClose();
              }}
              className="w-full py-3.5 bg-[#1C1C1E] hover:bg-black text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xs"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Legal / Support Footer note */}
          <div className="mt-8 pt-4 text-[11px] leading-relaxed text-gray-500 font-normal">
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
              Forgot your email or need help? Get assistance via{' '}
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

