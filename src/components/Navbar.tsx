import React from 'react';
import { Search, Globe, Wallet, User, LogOut } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenWalletModal: () => void;
  onOpenAuthModal: () => void;
  connectedWallet: string | null;
  onDisconnectWallet: () => void;
  userEmail?: string | null;
  onNavigateHome?: () => void;
  onNavigateAccount?: () => void;
  onStartOnboarding?: () => void;
  activeNavTab?: string;
  onSelectNavTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenWalletModal,
  onOpenAuthModal,
  connectedWallet,
  onDisconnectWallet,
  userEmail,
  onNavigateHome,
  onNavigateAccount,
  onStartOnboarding,
  activeNavTab = 'explore',
  onSelectNavTab,
}) => {
  const [currentTab, setCurrentTab] = React.useState<string>(activeNavTab);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    if (onSelectNavTab) {
      onSelectNavTab(tab);
    }
    if (tab === 'explore' && onNavigateHome) {
      onNavigateHome();
    }
  };

  const userInitials = userEmail
    ? userEmail.slice(0, 2).toUpperCase()
    : 'ES';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 lg:px-8 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Spiral Logo + Nav Links */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center cursor-pointer group text-gray-900 focus:outline-none flex-shrink-0"
            title="Ondo Finance"
          >
            <svg className="w-7 h-7 text-gray-900" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" />
              <path d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C20.42 26 24.16 23.13 25.42 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22C18.65 22 20.89 20.28 21.65 17.8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M16 14C14.8954 14 14 14.8954 14 16C14 17.1046 14.8954 18 16 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Nav Items from screenshot */}
          <nav className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleTabClick('explore')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentTab === 'explore'
                  ? 'bg-[#EAEAEA] text-gray-900'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              Explore
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('portfolio')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentTab === 'portfolio'
                  ? 'bg-[#EAEAEA] text-gray-900'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              Portfolio
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('tools')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentTab === 'tools'
                  ? 'bg-[#EAEAEA] text-gray-900'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              Tools
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('resources')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentTab === 'resources'
                  ? 'bg-[#EAEAEA] text-gray-900'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              Resources
            </button>
          </nav>
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search assets"
              className="w-full bg-[#f3f4f6] text-gray-900 placeholder-gray-400 text-xs font-medium pl-9 pr-4 py-2 rounded-xl border border-transparent focus:outline-none focus:bg-white focus:border-gray-300 transition-all"
            />
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Globe language selector icon */}
          <button
            type="button"
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            title="Language & Region"
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* Connect Wallet Button */}
          {connectedWallet ? (
            <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}</span>
              <button
                type="button"
                onClick={onDisconnectWallet}
                className="ml-1 hover:text-red-600 p-0.5"
                title="Disconnect Wallet"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenWalletModal}
              className="px-3.5 py-1.5 text-xs font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <Wallet className="w-3.5 h-3.5 text-gray-600" />
              <span>Connect Wallet</span>
            </button>
          )}

          {/* User Auth or Account controls */}
          {userEmail ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onStartOnboarding}
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#18181B] rounded-lg hover:bg-black transition-colors shadow-2xs cursor-pointer"
              >
                Complete Onboarding
              </button>

              <button
                type="button"
                onClick={onNavigateAccount}
                title="My Account"
                className="px-2.5 py-1.5 text-xs font-semibold text-gray-900 bg-[#E5E7EB] hover:bg-gray-300 rounded-md transition-colors cursor-pointer flex items-center justify-center min-w-[34px]"
              >
                {userInitials}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0F172A] rounded-lg hover:bg-slate-800 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-slate-300" />
              <span>Sign Up / Log In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
