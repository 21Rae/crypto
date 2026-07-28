import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { TopLists } from './components/TopLists';
import { ExploreAssets } from './components/ExploreAssets';
import { Footer } from './components/Footer';
import { ConnectWalletModal } from './components/ConnectWalletModal';
import { AuthModal } from './components/AuthModal';
import { WelcomeModal } from './components/WelcomeModal';
import { AccountView } from './components/AccountView';
import { OnboardingView } from './components/OnboardingView';
import { PortfolioView } from './components/PortfolioView';
import { ToolsView } from './components/ToolsView';
import { ResourcesView } from './components/ResourcesView';
import { StockDetailModal } from './components/StockDetailModal';
import { AccessDeeperAnalysesBanner } from './components/AccessDeeperAnalysesBanner';
import { EXPLORE_ASSETS } from './data/stocks';
import { StockAsset } from './types';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<StockAsset | null>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'explore' | 'portfolio' | 'tools' | 'resources' | 'account'>('explore');

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setCurrentView('account');
    setIsWelcomeModalOpen(true);
  };

  const handleLogout = () => {
    setUserEmail(null);
    setCurrentView('explore');
    setIsWelcomeModalOpen(false);
  };

  const handleSelectTicker = (ticker: string) => {
    const found = EXPLORE_ASSETS.find(
      (a) => a.ticker.toLowerCase() === ticker.toLowerCase()
    );
    if (found) {
      setSelectedAsset(found);
    }
  };

  const handleScrollToExplore = () => {
    if (currentView !== 'explore') {
      setCurrentView('explore');
    }
    setTimeout(() => {
      const element = document.getElementById('explore-assets-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#FAFCFD] text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 flex flex-col justify-between">
      <div>
        {/* Top Navigation Bar */}
        <Navbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenWalletModal={() => setIsWalletModalOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          connectedWallet={connectedWallet}
          onDisconnectWallet={() => setConnectedWallet(null)}
          userEmail={userEmail}
          onNavigateHome={() => setCurrentView('explore')}
          onNavigateAccount={() => setCurrentView('account')}
          onStartOnboarding={() => setIsOnboardingOpen(true)}
          activeNavTab={currentView}
          onSelectNavTab={(tab) => setCurrentView(tab as any)}
        />

        {/* Main Content View Switcher */}
        {currentView === 'account' && userEmail ? (
          <AccountView
            userEmail={userEmail}
            connectedWallet={connectedWallet}
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
            onLogout={handleLogout}
            onStartOnboarding={() => setIsOnboardingOpen(true)}
          />
        ) : currentView === 'portfolio' ? (
          <PortfolioView
            connectedWallet={connectedWallet}
            userEmail={userEmail}
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
            onStartOnboarding={() => setIsOnboardingOpen(true)}
            onSelectAsset={(asset) => setSelectedAsset(asset)}
          />
        ) : currentView === 'tools' ? (
          <ToolsView />
        ) : currentView === 'resources' ? (
          <ResourcesView />
        ) : (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {/* Hero Banner */}
            <HeroBanner onTradeNowClick={handleScrollToExplore} />

            {/* Top Lists (Top Gainers, Trending, Newly Added) */}
            <TopLists onSelectTicker={handleSelectTicker} />

            {/* Explore Assets Section */}
            <div id="explore-assets-section">
              <ExploreAssets
                assets={EXPLORE_ASSETS}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAssetClick={(asset) => setSelectedAsset(asset)}
              />
            </div>
          </main>
        )}
      </div>

      {/* Access Deeper Analyses Today Banner (Just Above Footer) */}
      {currentView !== 'portfolio' && !connectedWallet && (
        <AccessDeeperAnalysesBanner onConnectWallet={() => setIsWalletModalOpen(true)} />
      )}

      {/* Comprehensive Ondo Legal Disclaimer Footer */}
      <Footer />

      {/* Modals */}
      <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={(addr) => setConnectedWallet(addr)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        onStartOnboarding={() => {
          setIsWelcomeModalOpen(false);
          setIsOnboardingOpen(true);
        }}
      />

      {isOnboardingOpen && (
        <OnboardingView
          userEmail={userEmail || 'emmanuelsolomon325@gmail.com'}
          onExit={() => setIsOnboardingOpen(false)}
          onComplete={() => {
            setIsOnboardingOpen(false);
            setCurrentView('account');
          }}
        />
      )}

      <StockDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        connectedWallet={connectedWallet}
        onOpenWalletModal={() => {
          setSelectedAsset(null);
          setIsWalletModalOpen(true);
        }}
      />
    </div>
  );
}
