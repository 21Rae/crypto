import React, { useState, useEffect } from 'react';
import { Calculator, ShieldCheck, Zap, RefreshCw, ArrowRight, ArrowLeftRight, Layers } from 'lucide-react';

interface ToolsViewProps {
  initialSubTool?: string;
}

export const ToolsView: React.FC<ToolsViewProps> = ({ initialSubTool }) => {
  const [activeTab, setActiveTab] = useState<'bridge' | 'convert'>('bridge');

  // Bridge state
  const [bridgeToken, setBridgeToken] = useState<string>('USDY');
  const [sourceChain, setSourceChain] = useState<string>('Ethereum');
  const [destChain, setDestChain] = useState<string>('Mantle');
  const [bridgeAmount, setBridgeAmount] = useState<string>('0');

  // Convert state
  const [convertFromToken, setConvertFromToken] = useState<string>('USDY');
  const [convertToToken, setConvertToToken] = useState<string>('rUSDY');
  const [convertAmount, setConvertAmount] = useState<string>('0');

  useEffect(() => {
    if (initialSubTool === 'convert') {
      setActiveTab('convert');
    } else {
      setActiveTab('bridge');
    }
  }, [initialSubTool]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Main Active Tool Content */}
      {activeTab === 'convert' ? (
        <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
          {/* 3-Column Convert Layout matching the exact design screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Ondo Converter Description */}
            <div className="lg:col-span-3 space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Ondo Converter
              </h1>

              <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
                <p>
                  Most Ondo tokens are yield-bearing. This yield can be paid out either in a distributing form or in an accumulating form.
                </p>
                <p>
                  For distributing tokens, the yield accrues daily via additional tokens distributed to your wallet. The redemption value per token stays stable at $1, and the amount of tokens in your wallet increases.
                </p>
                <p>
                  For accumulating tokens, the yield accrues daily via an increasing redemption value per token. The quantity of tokens in your wallet remains the same, but the redemption value per token has increased.
                </p>
                <p>
                  You can convert anytime between these two forms with no slippage.
                </p>
              </div>

              <button
                type="button"
                disabled
                className="inline-block px-3.5 py-1.5 bg-[#EAEAEA] text-gray-900 text-xs font-semibold rounded-lg opacity-50 cursor-not-allowed mt-1"
              >
                Read More
              </button>
            </div>

            {/* Middle Column: Conversion Swap Widget & Contracts */}
            <div className="lg:col-span-5 space-y-4">
              {/* Network Dropdown Box */}
              <div className="bg-[#F3F3F5] rounded-2xl p-3.5 border border-gray-200/60 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-medium text-gray-500">Network</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-900 mt-0.5">
                    {/* ETH Circle Icon */}
                    <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                      Ξ
                    </div>
                    <span>Ethereum</span>
                  </div>
                </div>

                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              {/* Main Swap Card */}
              <div className="bg-[#F3F3F5] rounded-3xl p-3 sm:p-4 border border-gray-200/60 shadow-xs space-y-2">
                {/* Top Input Box (From) */}
                <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-2xs border border-gray-100">
                  <input
                    type="number"
                    value={convertAmount === '0' ? '' : convertAmount}
                    onChange={(e) => setConvertAmount(e.target.value)}
                    placeholder="0"
                    className="w-full text-2xl sm:text-3xl font-light text-gray-900 placeholder:text-gray-300 bg-transparent focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const temp = convertFromToken;
                      setConvertFromToken(convertToToken);
                      setConvertToToken(temp);
                    }}
                    className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200/80 rounded-2xl px-3 py-1.5 transition-colors cursor-pointer shrink-0 ml-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0F172A] flex items-center justify-center text-blue-400 font-bold text-[10px]">
                      $
                    </div>
                    <span className="text-xs font-bold text-gray-900">{convertFromToken}</span>
                  </button>
                </div>

                {/* Central Floating Swap Icon Button */}
                <div className="relative flex justify-center -my-3 z-10">
                  <button
                    type="button"
                    onClick={() => {
                      const temp = convertFromToken;
                      setConvertFromToken(convertToToken);
                      setConvertToToken(temp);
                    }}
                    className="w-8 h-8 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 hover:text-black transition-all cursor-pointer active:scale-95"
                    title="Swap converting tokens"
                  >
                    <svg className="w-3.5 h-3.5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 5v14M6 13l6 6 6-6" />
                    </svg>
                  </button>
                </div>

                {/* Bottom Input Box (To) */}
                <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-2xs border border-gray-100">
                  <div className="text-2xl sm:text-3xl font-light text-gray-900">
                    {convertAmount || '0'}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const temp = convertFromToken;
                      setConvertFromToken(convertToToken);
                      setConvertToToken(temp);
                    }}
                    className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200/80 rounded-2xl px-3 py-1.5 transition-colors cursor-pointer shrink-0 ml-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0F172A] flex items-center justify-center text-indigo-400 font-bold text-[10px]">
                      r
                    </div>
                    <span className="text-xs font-bold text-gray-900">{convertToToken}</span>
                  </button>
                </div>
              </div>

              {/* Terms Checkbox Card */}
              <div className="bg-[#F3F3F5] rounded-xl p-3.5 border border-gray-200/60 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="convert-terms"
                  defaultChecked
                  className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                />
                <label htmlFor="convert-terms" className="text-xs font-medium text-gray-800 cursor-pointer">
                  I have read and agree to the{' '}
                  <a href="#terms" className="font-semibold underline text-gray-900 hover:text-black">
                    Terms and Conditions
                  </a>
                  .
                </label>
              </div>

              {/* Connect Wallet Button */}
              <button
                type="button"
                disabled
                className="w-full py-3.5 bg-[#1C1C1E] text-white font-semibold text-sm rounded-xl opacity-50 cursor-not-allowed shadow-md transition-all text-center"
              >
                Connect Wallet
              </button>

              {/* Contracts Addresses Table */}
              <div className="pt-4 space-y-2">
                <h3 className="text-xs font-bold text-gray-900">Contracts</h3>

                <div className="divide-y divide-gray-100 text-xs">
                  <div className="py-2.5 flex items-center justify-between text-gray-700">
                    <span className="font-medium">USDY on Ethereum</span>
                    <div className="flex items-center gap-2 font-mono text-gray-900 font-semibold">
                      <span>0x96F6e...B985C</span>
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText('0x96F6e8d2e...B985C')}
                        className="text-gray-400 hover:text-gray-700 cursor-pointer"
                        title="Copy Contract Address"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                      </button>
                      <a
                        href="https://etherscan.io"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-gray-700"
                        title="View on Etherscan"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="py-2.5 flex items-center justify-between text-gray-700">
                    <span className="font-medium">rUSDY on Ethereum</span>
                    <div className="flex items-center gap-2 font-mono text-gray-900 font-semibold">
                      <span>0xaf37c...6b879</span>
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText('0xaf37c...6b879')}
                        className="text-gray-400 hover:text-gray-700 cursor-pointer"
                        title="Copy Contract Address"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                      </button>
                      <a
                        href="https://etherscan.io"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-gray-700"
                        title="View on Etherscan"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: History Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-2xs min-h-[420px] flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">History</h3>
              </div>

              <div className="flex flex-col items-center justify-center my-auto py-12 text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 mb-2">
                  <svg className="w-7 h-7 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <circle cx="16" cy="12" r="2" />
                    <path d="M6 12h.01" />
                  </svg>
                </div>
                <div className="text-xs font-bold text-gray-900">Connect Wallet</div>
                <p className="text-xs text-gray-500 max-w-[200px]">
                  Connect your wallet to see your history
                </p>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                <span>0% Slippage Protocol</span>
                <span>Ondo V2 Convert</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
          {/* 3-Column Bridge Layout matching the exact design screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Ondo Bridge About Info */}
            <div className="lg:col-span-3 space-y-5">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Ondo Bridge
              </h1>

              <div className="space-y-2">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">About</h3>
                <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
                  Transfer Ondo tokenized stocks, ETFs, and Treasuries between chains using LayerZero's cross-chain infrastructure.
                </p>
              </div>

              <button
                type="button"
                disabled
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#EAEAEA] text-gray-900 text-xs font-semibold rounded-lg opacity-50 cursor-not-allowed"
              >
                <span>Read More</span>
                <svg className="w-3.5 h-3.5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </button>
            </div>

            {/* Middle Column: Bridge Widget Box */}
            <div className="lg:col-span-5 bg-[#F3F3F5] rounded-3xl p-3 sm:p-4 border border-gray-200/60 shadow-xs space-y-3">
              {/* Send Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs border border-gray-100">
                <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                  <span>Send</span>
                  <div className="flex items-center gap-1 bg-gray-100/80 px-2 py-0.5 rounded-md text-[11px] font-mono text-gray-600">
                    <svg className="w-3 h-3 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <path d="M12 12h.01" />
                    </svg>
                    <span>0x...</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  {/* Token & Network Selector Dropdown/Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        const token = bridgeToken === 'USDY' ? 'OUSG' : 'USDY';
                        setBridgeToken(token);
                      }}
                      className="flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100/80 border border-gray-200/80 rounded-2xl p-2 pr-3 transition-colors cursor-pointer"
                    >
                      {/* Token icon */}
                      <div className="relative w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 6v12M6 12h12" />
                        </svg>
                        {/* Chain overlay badge */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold border border-white">
                          Ξ
                        </div>
                      </div>

                      <div className="text-left">
                        <div className="text-xs font-bold text-gray-900 leading-tight">{bridgeToken}</div>
                        <div className="text-[10px] text-gray-500 font-medium">{sourceChain}</div>
                      </div>

                      <svg className="w-3.5 h-3.5 text-gray-500 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </div>

                  {/* Big Amount Input */}
                  <input
                    type="number"
                    value={bridgeAmount === '0' ? '' : bridgeAmount}
                    onChange={(e) => setBridgeAmount(e.target.value)}
                    placeholder="0"
                    className="w-full text-right text-3xl font-light text-gray-900 placeholder:text-gray-300 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {/* Floating Vertical Swap Arrow Button */}
              <div className="relative flex justify-center -my-2.5 z-10">
                <button
                  type="button"
                  onClick={() => {
                    const temp = sourceChain;
                    setSourceChain(destChain);
                    setDestChain(temp);
                  }}
                  className="w-9 h-9 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 hover:text-black transition-all cursor-pointer active:scale-95"
                  title="Swap source and destination chains"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 16V4M7 4L3 8M7 4L11 8" />
                    <path d="M17 8v12M17 20l4-4M17 20l-4-4" />
                  </svg>
                </button>
              </div>

              {/* Receive Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs border border-gray-100">
                <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                  <span>Receive</span>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-600">
                    <span>0x...</span>
                    <button type="button" className="text-gray-400 hover:text-gray-600 cursor-pointer">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  {/* Token & Network Selector */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        const chains = ['BNB Chain', 'Mantle', 'Solana', 'Arbitrum', 'Ethereum'];
                        const nextIdx = (chains.indexOf(destChain) + 1) % chains.length;
                        setDestChain(chains[nextIdx]);
                      }}
                      className="flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100/80 border border-gray-200/80 rounded-2xl p-2 pr-3 transition-colors cursor-pointer"
                    >
                      {/* Token icon */}
                      <div className="relative w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 6v12M6 12h12" />
                        </svg>
                        {/* Chain overlay badge */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[8px] font-bold border border-white">
                          BNB
                        </div>
                      </div>

                      <div className="text-left">
                        <div className="text-xs font-bold text-gray-900 leading-tight">{bridgeToken}</div>
                        <div className="text-[10px] text-gray-500 font-medium">{destChain}</div>
                      </div>

                      <svg className="w-3.5 h-3.5 text-gray-500 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </div>

                  {/* Big Amount Output */}
                  <div className="text-right text-3xl font-light text-gray-900">
                    {bridgeAmount || '0'}
                  </div>
                </div>
              </div>

              {/* Order Summary Bar */}
              <div className="bg-[#E9E9EB]/70 border border-gray-200/60 rounded-xl px-4 py-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-700">Order Summary</span>

                <div className="flex items-center gap-2 text-gray-700 font-medium text-[11px]">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 22v-3a2 2 0 012-2h3a2 2 0 012 2v3M3 12a2 2 0 012-2h6a2 2 0 012 2v5" />
                      <path d="M14 13h2a2 2 0 012 2v2a2 2 0 002 2h0" />
                    </svg>
                    0.000038 ETH
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    20m
                  </span>
                  <svg className="w-3.5 h-3.5 text-gray-500 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2 px-1 pt-1">
                <input
                  type="checkbox"
                  id="bridge-terms"
                  defaultChecked
                  className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                />
                <label htmlFor="bridge-terms" className="text-xs font-medium text-gray-800 cursor-pointer">
                  I have read and agree to the{' '}
                  <a href="#terms" className="font-semibold underline text-gray-900 hover:text-black">
                    Terms and Conditions
                  </a>
                  .
                </label>
              </div>

              {/* Connect Wallet Button */}
              <button
                type="button"
                disabled
                className="w-full py-3.5 bg-[#1C1C1E] text-white font-semibold text-sm rounded-xl opacity-50 cursor-not-allowed shadow-md transition-all text-center mt-2"
              >
                Connect Wallet
              </button>
            </div>

            {/* Right Column: Activity Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-2xs min-h-[420px] flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Activity</h3>
              </div>

              <div className="flex flex-col items-center justify-center my-auto py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
                  <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M12 12h.01" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-gray-500 max-w-[200px]">
                  Connect your wallet to see your transactions
                </p>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                <span>LayerZero Powered</span>
                <span>Ondo V2 Bridge</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
