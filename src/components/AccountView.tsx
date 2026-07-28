import React, { useState } from 'react';
import { Globe, Wallet, Building2, FileText, Settings, HelpCircle, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';

interface AccountViewProps {
  userEmail: string;
  connectedWallet: string | null;
  onOpenWalletModal: () => void;
  onLogout: () => void;
  onStartOnboarding: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  userEmail,
  connectedWallet,
  onOpenWalletModal,
  onLogout,
  onStartOnboarding,
}) => {
  const [activeTab, setActiveTab] = useState<'access' | 'wallets' | 'bank' | 'documents' | 'settings'>('access');

  const initials = userEmail
    ? userEmail.slice(0, 2).toUpperCase()
    : 'ES';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[70vh]">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Sidebar Navigation */}
        <div className="w-full md:w-56 flex-shrink-0 space-y-6">
          <h1 className="text-2xl font-normal text-gray-900 tracking-tight">My Account</h1>

          <nav className="space-y-1 text-sm font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('access')}
              className={`w-full text-left px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'access'
                  ? 'bg-[#E5E7EB] text-gray-900 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Access
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('wallets')}
              className={`w-full text-left px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'wallets'
                  ? 'bg-[#E5E7EB] text-gray-900 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Wallets
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('bank')}
              className={`w-full text-left px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'bank'
                  ? 'bg-[#E5E7EB] text-gray-900 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Bank Details
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('documents')}
              className={`w-full text-left px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'documents'
                  ? 'bg-[#E5E7EB] text-gray-900 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Documents
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#E5E7EB] text-gray-900 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Settings
            </button>

            <div className="pt-4 border-t border-gray-200/80 space-y-1">
              <a
                href="mailto:support@ondo.finance"
                className="block text-left px-3.5 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </a>

              <button
                type="button"
                onClick={onLogout}
                className="w-full text-left px-3.5 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </nav>
        </div>

        {/* Right Main Content Area */}
        <div className="flex-1 max-w-3xl">
          {activeTab === 'access' && (
            <div>
              <h2 className="text-2xl font-normal text-gray-900 tracking-tight mb-6">Access</h2>

              {/* Access Card matching screenshot */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-6">
                <div className="p-3 bg-gray-50 rounded-xl w-fit border border-gray-100">
                  <Globe className="w-5 h-5 text-gray-700" />
                </div>

                <div className="space-y-4 pt-2 border-t border-gray-100 text-xs sm:text-sm">
                  {/* Status row */}
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 font-normal">Status</span>
                    <span className="px-3 py-1 bg-[#E5E7EB] text-gray-800 text-xs font-semibold rounded-md">
                      No Access
                    </span>
                  </div>

                  {/* Eligibility row */}
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 font-normal">Eligibility</span>
                    <span className="text-gray-900 font-medium">
                      US and non-US{' '}
                      <a href="#qualified" className="underline hover:text-gray-600">
                        qualified purchasers
                      </a>
                    </span>
                  </div>

                  {/* Minimum row */}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-500 font-normal">Minimum</span>
                    <div className="flex items-center gap-1.5 text-gray-900 font-medium">
                      <span>5,000 USDC</span>
                      <span className="w-4 h-4 rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold flex items-center justify-center cursor-help" title="Minimum requirement to mint or redeem tokenized assets">
                        ?
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onStartOnboarding}
                    className="w-full py-3 bg-[#18181B] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    Complete Onboarding to Get Access
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wallets' && (
            <div>
              <h2 className="text-2xl font-normal text-gray-900 tracking-tight mb-6">Wallets</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gray-100 rounded-xl">
                      <Wallet className="w-5 h-5 text-gray-800" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {connectedWallet ? 'Connected Web3 Wallet' : 'No Wallet Connected'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {connectedWallet ? connectedWallet : 'Connect MetaMask, Coinbase Wallet, or WalletConnect'}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenWalletModal}
                    className="px-4 py-2 bg-[#18181B] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors cursor-pointer"
                  >
                    {connectedWallet ? 'Change Wallet' : 'Connect Wallet'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bank' && (
            <div>
              <h2 className="text-2xl font-normal text-gray-900 tracking-tight mb-6">Bank Details</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 text-sm text-gray-500">
                Bank wire details for minting and redeeming USD assets will appear here once onboarding is completed.
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <h2 className="text-2xl font-normal text-gray-900 tracking-tight mb-6">Documents</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 text-sm text-gray-500">
                No active tax or KYC documents required at this time.
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-normal text-gray-900 tracking-tight mb-6">Settings</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 text-sm">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Email Address</span>
                  <span className="font-medium text-gray-900">{userEmail}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Two-Factor Authentication</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Enabled
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
