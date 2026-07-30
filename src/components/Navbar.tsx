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
  onSelectNavTab?: (tab: string, subTool?: string) => void;
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
  const [isToolsHovered, setIsToolsHovered] = React.useState<boolean>(false);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    setCurrentTab(activeNavTab);
  }, [activeNavTab]);

  const handleMouseEnterTools = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsToolsHovered(true);
  };

  const handleMouseLeaveTools = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsToolsHovered(false);
    }, 180);
  };

  const handleTabClick = (tab: string, subTool?: string) => {
    setCurrentTab(tab);
    if (onSelectNavTab) {
      onSelectNavTab(tab, subTool);
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

            <div
              className="relative"
              onMouseEnter={handleMouseEnterTools}
              onMouseLeave={handleMouseLeaveTools}
            >
              <button
                type="button"
                onClick={() => handleTabClick('tools', 'bridge')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTab === 'tools' || isToolsHovered
                    ? 'bg-[#EAEAEA] text-gray-900'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                Tools
              </button>

              {/* Hover Dropdown Menu */}
              {isToolsHovered && (
                <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white rounded-3xl p-3.5 shadow-2xl border border-gray-100 z-50 animate-fadeIn space-y-1">
                  {/* Bridge Item */}
                  <button
                    type="button"
                    onClick={() => {
                      handleTabClick('tools', 'bridge');
                      setIsToolsHovered(false);
                    }}
                    className="w-full p-2.5 rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-3.5 text-left cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] group-hover:bg-gray-200/80 flex items-center justify-center shrink-0 transition-colors">
                      <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="8" y1="5" x2="8" y2="19" />
                        <line x1="16" y1="5" x2="16" y2="19" />
                        <path d="M8 10h8M8 14h8" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-black">
                        Bridge
                      </div>
                      <div className="text-[11px] sm:text-xs text-gray-500 font-normal leading-tight mt-0.5">
                        Transfer Ondo tokens across chains
                      </div>
                    </div>
                  </button>

                  {/* Convert Item */}
                  <button
                    type="button"
                    onClick={() => {
                      handleTabClick('tools', 'convert');
                      setIsToolsHovered(false);
                    }}
                    className="w-full p-2.5 rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-3.5 text-left cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] group-hover:bg-gray-200/80 flex items-center justify-center shrink-0 transition-colors">
                      <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24" />
                        <path d="M21 3v6h-6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-black">
                        Convert
                      </div>
                      <div className="text-[11px] sm:text-xs text-gray-500 font-normal leading-tight mt-0.5">
                        Convert Ondo tokens between different forms
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

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
              disabled
              onClick={onOpenWalletModal}
              className="px-3.5 py-1.5 text-xs font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg opacity-50 cursor-not-allowed shadow-2xs flex items-center gap-1.5"
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
                disabled
                onClick={onStartOnboarding}
                className="px-3.5 py-1.5 text-xs font-medium text-gray-400 bg-gray-200 rounded-lg opacity-60 cursor-not-allowed shadow-2xs"
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
