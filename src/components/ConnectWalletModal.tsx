import React from 'react';
import { X, Wallet, ShieldCheck, ArrowRight } from 'lucide-react';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (address: string) => void;
}

export const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  onClose,
  onConnect,
}) => {
  if (!isOpen) return null;

  const handleSelectWallet = (walletName: string) => {
    // Generate a clean mock Ethereum address
    const randomHex = Math.random().toString(16).substring(2, 10);
    const mockAddress = `0x71C${randomHex}49fB`;
    onConnect(mockAddress);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-gray-100 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Wallet className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-gray-900">Connect Wallet</h3>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Connect your Web3 wallet to trade tokenized stocks 24/7 onchain.
          </p>
        </div>

        <div className="space-y-2.5">
          {[
            { name: 'MetaMask', icon: '🦊', desc: 'Popular Ethereum browser extension' },
            { name: 'Coinbase Wallet', icon: '🟦', desc: 'Self-custody Web3 wallet' },
            { name: 'WalletConnect', icon: '🌐', desc: 'Connect with QR code or mobile app' },
            { name: 'Phantom', icon: '👻', desc: 'Multi-chain Web3 wallet' },
          ].map((w) => (
            <button
              key={w.name}
              type="button"
              onClick={() => handleSelectWallet(w.name)}
              className="w-full flex items-center justify-between p-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200/80 rounded-2xl transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{w.icon}</span>
                <div>
                  <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {w.name}
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium">{w.desc}</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Non-custodial, end-to-end encrypted connection</span>
        </div>
      </div>
    </div>
  );
};
