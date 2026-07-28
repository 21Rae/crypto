import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  Zap,
  ExternalLink,
  Plus,
  RefreshCw,
  Clock,
  ChevronRight,
  Lock,
  Globe,
  PieChart,
  DollarSign
} from 'lucide-react';
import { StockAsset } from '../types';
import { AccessDeeperAnalysesBanner } from './AccessDeeperAnalysesBanner';

interface PortfolioViewProps {
  connectedWallet: string | null;
  userEmail: string | null;
  onOpenWalletModal: () => void;
  onStartOnboarding: () => void;
  onSelectAsset?: (asset: StockAsset) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  connectedWallet,
  userEmail,
  onOpenWalletModal,
  onStartOnboarding,
}) => {
  const [activeTab, setActiveTab] = useState<'positions' | 'activity' | 'yield'>('positions');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down'>('up');
  const showcaseContainerRef = useRef<HTMLDivElement>(null);
  const isWheelLockedRef = useRef<boolean>(false);

  const goToSlide = (newIndex: number) => {
    if (newIndex === currentSlide) return;
    setSlideDirection(newIndex > currentSlide ? 'up' : 'down');
    setCurrentSlide(newIndex);
  };

  // Scroll observer to update showcase slide smoothly on page scroll (both scroll down and scroll UP)
  useEffect(() => {
    const handleScroll = () => {
      if (!showcaseContainerRef.current) return;
      const rect = showcaseContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const stickyTop = 144; // Offset top where sticky container pins lower down (top-36 = 144px)

      // Calculate distance scrolled into the showcase section once it reaches its sticky position
      const scrollOffset = stickyTop - rect.top;
      const containerHeight = rect.height;

      // Only start slide transitions once showcase container has reached its sticky offset
      if (scrollOffset <= 60) {
        setCurrentSlide((prev) => {
          if (prev !== 0) {
            setSlideDirection('down');
            return 0;
          }
          return prev;
        });
        return;
      }

      // Scrollable range while sticky is pinned
      const scrollableDistance = Math.max(1, containerHeight - (windowHeight - stickyTop));
      const adjustedOffset = scrollOffset - 60;
      const progress = Math.max(0, Math.min(0.999, adjustedOffset / (scrollableDistance - 60)));
      const targetIndex = Math.min(3, Math.floor(progress * 4));

      setCurrentSlide((prev) => {
        if (prev !== targetIndex) {
          setSlideDirection(targetIndex > prev ? 'up' : 'down');
          return targetIndex;
        }
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showcaseSlides = [
    {
      id: 'dashboard',
      title: 'All-in-one Dashboard',
      subtitle:
        'Track your entire portfolio in real time, with live valuations and performance charts across all your holdings. From stablecoins to tokenized equities, everything is visible in one place.',
    },
    {
      id: 'allocation',
      title: 'Allocation Breakdown',
      subtitle:
        'See how your capital is distributed across crypto, tokenized real-world assets, and cash, all in a single view. Understand your exposure clearly so you can make informed decisions.',
    },
    {
      id: 'transactions',
      title: 'Recent Transactions',
      subtitle:
        'Every buy, sell, swap, and bridge is searchable in one unified transaction history. Filter by type or network to quickly find what you need.',
    },
    {
      id: 'discovery',
      title: 'Asset Discovery',
      subtitle:
        "Discover tokenized real-world assets curated to your portfolio. Ondo Stocks surfaces what's relevant to your holdings, so you can explore on your own terms.",
    },
  ];

  // Sample portfolio holdings data
  const positions = [
    {
      id: 'usdy',
      name: 'USDY - US Dollar Yield',
      ticker: 'USDY',
      type: 'Yield Token',
      balance: '5,000.00',
      price: '$1.042',
      value: '$5,210.00',
      apy: '5.20%',
      pnl: '+$210.00 (+4.20%)',
      pnlIsPositive: true,
      color: 'bg-blue-600',
    },
    {
      id: 'nvda',
      name: 'NVIDIA Corporation',
      ticker: 'NVDA.on',
      type: 'Ondo Stock',
      balance: '12.50',
      price: '$128.50',
      value: '$1,606.25',
      apy: '24h +3.85%',
      pnl: '+$142.10 (+9.68%)',
      pnlIsPositive: true,
      color: 'bg-emerald-600',
    },
    {
      id: 'aapl',
      name: 'Apple Inc.',
      ticker: 'AAPL.on',
      type: 'Ondo Stock',
      balance: '15.00',
      price: '$224.30',
      value: '$3,364.50',
      apy: '24h +1.12%',
      pnl: '+$84.50 (+2.58%)',
      pnlIsPositive: true,
      color: 'bg-gray-900',
    },
    {
      id: 'tsla',
      name: 'Tesla, Inc.',
      ticker: 'TSLA.on',
      type: 'Ondo Stock',
      balance: '8.00',
      price: '$248.20',
      value: '$1,985.60',
      apy: '24h -0.45%',
      pnl: '-$32.00 (-1.58%)',
      pnlIsPositive: false,
      color: 'bg-red-600',
    },
  ];

  const transactions = [
    {
      id: 'tx-1',
      type: 'Mint',
      asset: 'USDY',
      amount: '$5,000.00 USDC',
      received: '4,807.69 USDY',
      date: 'Today, 09:42 AM',
      status: 'Completed',
      txHash: '0x8f32...9a21',
    },
    {
      id: 'tx-2',
      type: 'Buy',
      asset: 'NVDA.on',
      amount: '$1,500.00 USDY',
      received: '12.50 NVDA.on',
      date: 'Yesterday, 03:15 PM',
      status: 'Completed',
      txHash: '0x4b12...1e88',
    },
    {
      id: 'tx-3',
      type: 'Yield Distribution',
      asset: 'USDY',
      amount: '+$12.40 USDY',
      received: 'Auto-compounded',
      date: 'Jul 26, 2026',
      status: 'Completed',
      txHash: '0x9921...aa04',
    },
  ];

  return (
    <div className="min-h-[85vh] flex flex-col justify-center relative bg-white animate-fadeIn">
      {!connectedWallet ? (
        <>
          <div className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[65vh]">
            {/* Floating Asset Icons Background Cloud */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-80">
              {/* Top Left */}
              <div className="absolute top-[12%] left-[10%] w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">P&G</div>
              <div className="absolute top-[28%] left-[8%] w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-[10px]">M</div>
              <div className="absolute top-[35%] left-[15%] w-7 h-7 rounded-full bg-[#393939] text-white flex items-center justify-center font-bold text-[9px]">G</div>
              <div className="absolute top-[18%] left-[24%] w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-[8px]">X</div>
              <div className="absolute top-[58%] left-[11%] w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-md">G</div>

              {/* Top Right & Upper Middle */}
              <div className="absolute top-[10%] right-[10%] w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">J&J</div>
              <div className="absolute top-[18%] right-[12%] w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px]">☘</div>
              <div className="absolute top-[20%] right-[22%] w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs">P</div>
              <div className="absolute top-[10%] left-[58%] w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">Đ</div>
              <div className="absolute top-[10%] left-[43%] w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[10px]">Costco</div>

              {/* Floating Tesla & Eth Center */}
              <div className="absolute top-[33%] left-[47%] -translate-x-1/2 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-base shadow-lg">T</div>
              <div className="absolute top-[10%] right-[36%] w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">Ξ</div>

              {/* Middle Right */}
              <div className="absolute top-[34%] right-[21%] w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-xs">X</div>
              <div className="absolute top-[34%] right-[16%] w-7 h-7 rounded-full bg-amber-400 text-white flex items-center justify-center font-bold text-[10px]">👻</div>
              <div className="absolute top-[58%] right-[11%] w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md">🔷</div>
              <div className="absolute top-[62%] right-[20%] w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">TSMC</div>

              {/* Bottom Left / Bottom Center */}
              <div className="absolute bottom-[18%] left-[10%] w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">S</div>
              <div className="absolute bottom-[12%] left-[28%] w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs">Schwab</div>
              <div className="absolute bottom-[22%] left-[33%] w-7 h-7 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-[9px]">P</div>
              <div className="absolute bottom-[22%] left-[49%] w-8 h-8 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-[10px]">Invesco</div>

              {/* Bottom Right */}
              <div className="absolute bottom-[15%] right-[36%] w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">a</div>
              <div className="absolute bottom-[10%] right-[31%] w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[9px]">Cisco</div>
              <div className="absolute bottom-[16%] right-[20%] w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">VanEck</div>
              <div className="absolute bottom-[18%] right-[9%] w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">N</div>
              <div className="absolute bottom-[29%] right-[21%] w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">WMT</div>
              <div className="absolute bottom-[28%] right-[10%] w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm"></div>
            </div>

            {/* Centered Content Card */}
            <div className="relative z-10 max-w-xl mx-auto text-center space-y-6 animate-fadeIn">
              <h1 className="text-3xl sm:text-5xl font-semibold text-gray-900 tracking-tight leading-tight">
                Bring Your Portfolio<br />Into Focus
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed max-w-md mx-auto">
                Manage your onchain holdings in one seamless and secure view.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  disabled
                  onClick={onOpenWalletModal}
                  className="px-8 py-3.5 bg-[#1C1C1E] text-white text-sm font-semibold rounded-2xl opacity-50 cursor-not-allowed shadow-md"
                >
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>

        {/* Interactive Portfolio Features Showcase Section with Scrollup/Scrolldown Animations */}
        <div
          ref={showcaseContainerRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-gray-100 min-h-[220vh]"
        >
          <div className="sticky top-28 sm:top-36 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Headline, Slide Tabs & Controls */}
            <div className="lg:col-span-4 space-y-6 pt-2">
              {/* Feature Slide Selector Pills */}
              <div className="flex flex-wrap gap-2">
                {showcaseSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      currentSlide === idx
                        ? 'bg-gray-900 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    0{idx + 1} {slide.title.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Animated Slide Title & Description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: slideDirection === 'up' ? 20 : -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: slideDirection === 'up' ? -20 : 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 min-h-[140px]"
                >
                  <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight leading-tight">
                    {showcaseSlides[currentSlide].title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {showcaseSlides[currentSlide].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Slide Controls */}
              <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => goToSlide(currentSlide > 0 ? currentSlide - 1 : showcaseSlides.length - 1)}
                    className="w-9 h-9 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                    title="Previous feature"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToSlide(currentSlide < showcaseSlides.length - 1 ? currentSlide + 1 : 0)}
                    className="w-9 h-9 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                    title="Next feature"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs font-medium text-gray-400">
                  Feature {currentSlide + 1} of {showcaseSlides.length}
                </span>
              </div>
            </div>

            {/* Right Column: High-fidelity Dashboard Card + Slide Overlay Modal Card */}
            <div className="lg:col-span-8 relative">
              <AnimatePresence mode="wait" custom={slideDirection}>
                {/* Foreground Overlay Card for Slide 1: Allocation Breakdown */}
                {currentSlide === 1 && (
                  <motion.div
                    key="slide-allocation"
                    custom={slideDirection}
                    initial={{
                      y: slideDirection === 'up' ? 90 : -90,
                      opacity: 0,
                      scale: 0.95,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      y: slideDirection === 'up' ? -90 : 90,
                      opacity: 0,
                      scale: 0.95,
                    }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 z-20 flex items-end justify-center p-4 pb-6 sm:pb-8 bg-black/5 backdrop-blur-[2px] rounded-3xl"
                  >
                    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-100 max-w-sm sm:max-w-md w-full space-y-6">
                      <div className="text-center space-y-1">
                        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                          Portfolio Asset Distribution
                        </div>
                        <div className="text-2xl font-bold text-gray-900">$1,535,912.89</div>
                      </div>

                      {/* Donut Chart Ring */}
                      <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          {/* Circle Donut Segments */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="none"
                            stroke="#A855F7"
                            strokeWidth="11"
                            strokeDasharray="86 152"
                            strokeDashoffset="0"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="none"
                            stroke="#818CF8"
                            strokeWidth="11"
                            strokeDasharray="83 155"
                            strokeDashoffset="-88"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="none"
                            stroke="#34D399"
                            strokeWidth="11"
                            strokeDasharray="69 169"
                            strokeDashoffset="-173"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                          <div className="text-base font-bold text-gray-900">$553,235.82</div>
                          <div className="text-[10px] font-medium text-gray-500">Crypto | 36.02%</div>
                        </div>
                      </div>

                      {/* Legend Details */}
                      <div className="bg-gray-50/80 rounded-2xl p-3.5 space-y-2.5 border border-gray-100 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm bg-purple-500" />
                            <span className="font-semibold text-gray-900">Crypto</span>
                            <span className="text-[10px] text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                              +5
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-700">36.02%</span>
                            <span className="font-bold text-gray-900">$553K</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" />
                            <span className="font-semibold text-gray-900">Ondo GM</span>
                            <span className="text-[10px] text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                              +3
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-700">34.98%</span>
                            <span className="font-bold text-gray-900">$537K</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                            <span className="font-semibold text-gray-900">Cash</span>
                            <span className="text-[10px] text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                              USD
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-700">29.00%</span>
                            <span className="font-bold text-gray-900">$445K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Foreground Overlay Card for Slide 2: Recent Transactions */}
                {currentSlide === 2 && (
                  <motion.div
                    key="slide-transactions"
                    custom={slideDirection}
                    initial={{
                      y: slideDirection === 'up' ? 90 : -90,
                      opacity: 0,
                      scale: 0.95,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      y: slideDirection === 'up' ? -90 : 90,
                      opacity: 0,
                      scale: 0.95,
                    }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 z-20 flex items-end justify-center p-4 pb-6 sm:pb-8 bg-black/5 backdrop-blur-[2px] rounded-3xl"
                  >
                    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-gray-100 max-w-sm sm:max-w-md w-full space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <h3 className="text-sm font-semibold text-gray-900">Recent Transactions</h3>
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">Type ⌄</span>
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">Network ⌄</span>
                        </div>
                      </div>

                      {/* Table List */}
                      <div className="space-y-2 text-xs">
                        <div className="grid grid-cols-4 text-[10px] text-gray-400 font-semibold uppercase tracking-wider pb-1">
                          <span>Type</span>
                          <span>Token</span>
                          <span>Amount</span>
                          <span className="text-right">Status</span>
                        </div>

                        {/* Row 1 */}
                        <div className="grid grid-cols-4 items-center py-2 border-b border-gray-50">
                          <div>
                            <span className="bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded text-[10px]">
                              Bought
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">MSFTon</div>
                            <div className="text-[9px] text-gray-400">BNB Chain</div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">9.9182</div>
                            <div className="text-[9px] text-gray-400">$3,112.54</div>
                          </div>
                          <div className="text-right">
                            <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                              Processing
                            </span>
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-4 items-center py-2 border-b border-gray-50">
                          <div>
                            <span className="bg-purple-50 text-purple-700 font-bold px-1.5 py-0.5 rounded text-[10px]">
                              Sent
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">USDT</div>
                            <div className="text-[9px] text-gray-400">BNB Chain</div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">2,500.00</div>
                            <div className="text-[9px] text-gray-400">$2,500.00</div>
                          </div>
                          <div className="text-right">
                            <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                              Completed
                            </span>
                          </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-4 items-center py-2 border-b border-gray-50">
                          <div>
                            <span className="bg-sky-50 text-sky-700 font-bold px-1.5 py-0.5 rounded text-[10px]">
                              Swapped
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">UNI</div>
                            <div className="text-[9px] text-gray-400">Ethereum</div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">147.35</div>
                            <div className="text-[9px] text-gray-400">$765.22</div>
                          </div>
                          <div className="text-right">
                            <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                              Completed
                            </span>
                          </div>
                        </div>

                        {/* Row 4 */}
                        <div className="grid grid-cols-4 items-center py-2">
                          <div>
                            <span className="bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded text-[10px]">
                              Bridged
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">NVDAon</div>
                            <div className="text-[9px] text-gray-400">Ethereum</div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">2.7400</div>
                            <div className="text-[9px] text-gray-400">$540.00</div>
                          </div>
                          <div className="text-right">
                            <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                              Completed
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Highlighted Bottom Row */}
                      <div className="bg-[#0F172A] text-white rounded-2xl p-3.5 flex items-center justify-between text-xs shadow-md">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                            Ξ
                          </div>
                          <div>
                            <div className="font-semibold">ETH</div>
                            <div className="text-[9px] text-slate-400">Ethereum</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">1.2456</div>
                          <div className="text-[9px] text-slate-400">$2,874.47</div>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px]">
                          Bought
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Foreground Overlay Card for Slide 3: Asset Discovery */}
                {currentSlide === 3 && (
                  <motion.div
                    key="slide-discovery"
                    custom={slideDirection}
                    initial={{
                      y: slideDirection === 'up' ? 90 : -90,
                      opacity: 0,
                      scale: 0.95,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      y: slideDirection === 'up' ? -90 : 90,
                      opacity: 0,
                      scale: 0.95,
                    }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 z-20 flex items-end justify-center p-4 pb-6 sm:pb-8 bg-black/5 backdrop-blur-[2px] rounded-3xl"
                  >
                    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-gray-100 max-w-sm sm:max-w-md w-full space-y-4">
                      {/* Asset Card 1: GLDon */}
                      <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-gray-100 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-amber-600 text-white font-bold flex items-center justify-center text-[10px]">
                            G
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-xs">GLDon</div>
                            <div className="text-[10px] text-gray-400">SPDR Gold Trust</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">$527.25</div>
                          <div className="text-[11px] font-semibold text-emerald-600">
                            ▲ $13.37 (2.60%) 24h
                          </div>
                        </div>

                        {/* Green Sparkline SVG */}
                        <div className="w-full h-12 pt-1">
                          <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                            <path
                              d="M 0,35 Q 20,25 40,30 T 80,20 T 120,25 T 160,10 T 200,5"
                              fill="none"
                              stroke="#10B981"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Asset Card 2: HYGon */}
                      <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-gray-100 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-emerald-700 text-white font-bold flex items-center justify-center text-[10px]">
                            H
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-xs">HYGon</div>
                            <div className="text-[10px] text-gray-400">iShares iBoxx High Yield Corporate Bond ETF</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">$83.15</div>
                          <div className="text-[11px] font-semibold text-emerald-600">
                            ▲ $0.07 (0.0783%) 24h
                          </div>
                        </div>

                        {/* Green Sparkline SVG */}
                        <div className="w-full h-12 pt-1">
                          <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                            <path
                              d="M 0,30 Q 30,38 60,25 T 120,30 T 170,18 T 200,12"
                              fill="none"
                              stroke="#10B981"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Background Dashboard Card Frame */}
              <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 font-sans">
                {/* Header Bar */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      ☘
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      Welcome, <strong className="font-semibold text-gray-900">Demo Wallet</strong>
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium">
                    May 5, 2026, 11:14:26 AM EDT
                  </div>
                </div>

                {/* Main Balance & Timeframe Controls */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
                        $1,535,912
                      </span>
                      <span className="text-2xl sm:text-3xl font-medium text-gray-400">
                        .89
                      </span>
                      <span className="ml-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                        ▲ $9.77 (0.114%) 1M
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-lg text-xs font-semibold text-gray-600">
                      <button type="button" className="px-2 py-1 hover:text-gray-900">1D</button>
                      <button type="button" className="px-2 py-1 hover:text-gray-900">1W</button>
                      <button type="button" className="px-2.5 py-1 bg-white text-gray-900 rounded shadow-2xs">1M</button>
                      <button type="button" className="px-2 py-1 hover:text-gray-900">3M</button>
                      <button type="button" className="px-2 py-1 hover:text-gray-900">1Y</button>
                      <button type="button" className="px-2 py-1 hover:text-gray-900">ALL</button>
                    </div>
                  </div>

                  {/* Chart + Side Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {/* Area Chart Container */}
                    <div className="md:col-span-2 bg-gradient-to-b from-emerald-50/20 to-transparent border border-gray-100 rounded-2xl p-4 relative min-h-[220px] flex flex-col justify-between">
                      {/* Y-axis mock ticks */}
                      <div className="absolute left-3 top-3 bottom-8 flex flex-col justify-between text-[9px] text-gray-400 font-mono pointer-events-none">
                        <span>$1.54M</span>
                        <span>$1.52M</span>
                        <span>$1.50M</span>
                        <span>$1.48M</span>
                        <span>$1.46M</span>
                      </div>

                      {/* Smooth Area Path SVG */}
                      <div className="w-full h-36 pl-10 pr-2 pt-2">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0,55 Q 30,65 60,40 T 120,30 T 180,45 T 240,35 T 300,30 L 300,100 L 0,100 Z"
                            fill="url(#chartGrad)"
                          />
                          <path
                            d="M 0,55 Q 30,65 60,40 T 120,30 T 180,45 T 240,35 T 300,30"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>

                      {/* X-axis labels */}
                      <div className="flex justify-between pl-10 pr-2 text-[9px] text-gray-400 font-mono border-t border-gray-100 pt-1">
                        <span>&lt;NNN&gt;</span>
                        <span>&lt;NNN&gt;</span>
                        <span>&lt;NNN&gt;</span>
                        <span>&lt;NNN&gt;</span>
                        <span>&lt;NNN&gt;</span>
                      </div>
                    </div>

                    {/* Right Side Stats */}
                    <div className="space-y-3 flex flex-col justify-center">
                      <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-gray-100 space-y-1">
                        <div className="text-[11px] font-medium text-gray-500">Unrealized Gains</div>
                        <div className="text-xl font-bold text-gray-900">$285,912.89</div>
                        <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                          ▲ 38.10%
                        </div>
                      </div>

                      <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-gray-100 space-y-1">
                        <div className="text-[11px] font-medium text-gray-500">YTD Returns</div>
                        <div className="text-xl font-bold text-gray-900">$135,912.89</div>
                        <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                          ▲ 18.80%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* My Holdings Sub-Section */}
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-gray-900">My Holdings</h3>
                    <div className="flex items-center gap-2">
                      <button type="button" className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 flex items-center gap-1">
                        <span>Asset Class</span>
                        <ChevronRight className="w-3 h-3 rotate-90" />
                      </button>
                      <button type="button" className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 flex items-center gap-1">
                        <span>Network</span>
                        <ChevronRight className="w-3 h-3 rotate-90" />
                      </button>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search asset"
                          readOnly
                          className="w-32 sm:w-40 py-1.5 pl-7 pr-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 pointer-events-none"
                        />
                        <span className="absolute left-2.5 top-2 text-gray-400 text-xs">🔍</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlight Cards Grid (USDC & USDT) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* USDC Card */}
                    <div className="bg-[#EDF4FF] rounded-2xl p-4 flex items-center justify-between border border-blue-100/60">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                          $
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-700">USDC</div>
                          <div className="text-base font-bold text-gray-900">$259,765.88</div>
                        </div>
                      </div>
                      <button type="button" className="px-3 py-1 bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1">
                        <span>Invest</span>
                        <ChevronRight className="w-3 h-3 rotate-90" />
                      </button>
                    </div>

                    {/* USDT Card */}
                    <div className="bg-[#EFF5EE] rounded-2xl p-4 flex items-center justify-between border border-emerald-100/60">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                          ₮
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-700">USDT</div>
                          <div className="text-base font-bold text-gray-900">$259,765.88</div>
                        </div>
                      </div>
                      <button type="button" className="px-3 py-1 bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1">
                        <span>Invest</span>
                        <ChevronRight className="w-3 h-3 rotate-90" />
                      </button>
                    </div>
                  </div>

                  {/* Holdings Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-gray-400 font-medium border-b border-gray-100 pb-2">
                          <th className="py-2.5 font-normal">Token</th>
                          <th className="py-2.5 font-normal">Asset Class</th>
                          <th className="py-2.5 font-normal">Price ($)</th>
                          <th className="py-2.5 font-normal">Balance</th>
                          <th className="py-2.5 font-normal">Value ($)</th>
                          <th className="py-2.5 font-normal text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                        <tr>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-md bg-purple-600 text-white font-bold flex items-center justify-center text-[10px]">
                                Q
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">QQQon</div>
                                <div className="text-[10px] text-gray-400">Invesco QQQ Trust</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-medium">
                              Ondo Global Markets
                            </span>
                          </td>
                          <td className="py-3">$603.20</td>
                          <td className="py-3">436.5615</td>
                          <td className="py-3 font-semibold text-gray-900">$263,636.56</td>
                          <td className="py-3 text-right">
                            <span className="text-xs font-semibold text-gray-900 hover:underline cursor-pointer">Buy</span>
                            <span className="ml-2 text-gray-400">•••</span>
                          </td>
                        </tr>

                        <tr>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-md bg-black text-white font-bold flex items-center justify-center text-[10px]">
                                M
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">MSFTon</div>
                                <div className="text-[10px] text-gray-400">Microsoft Corp</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-medium">
                              Ondo Global Markets
                            </span>
                          </td>
                          <td className="py-3">$400.00</td>
                          <td className="py-3">652.4276</td>
                          <td className="py-3 font-semibold text-gray-900">$260,971.04</td>
                          <td className="py-3 text-right">
                            <span className="text-xs font-semibold text-gray-900 hover:underline cursor-pointer">Buy</span>
                            <span className="ml-2 text-gray-400">•••</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Access Deeper Analyses Today Banner (Bottom of Page, Just Above Footer) */}
        <AccessDeeperAnalysesBanner onConnectWallet={onOpenWalletModal} />
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Portfolio Header Summary Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total Portfolio Value
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Onchain
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <h1 className="text-3xl sm:text-5xl font-semibold text-gray-900 tracking-tight">
                    $12,166.35
                  </h1>
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +$404.60 (+3.44%)
                  </span>
                </div>

                <p className="text-xs text-gray-500 font-normal">
                  Wallet: {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)} • Ethereum Mainnet
                </p>
              </div>

              {/* Action CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onStartOnboarding}
                  className="px-5 py-3 bg-[#1e40af] hover:bg-blue-800 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>KYC / Investor Profile</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenWalletModal}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Wallet className="w-3.5 h-3.5 text-gray-500" />
                  <span>Wallet Options</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
              <div>
                <div className="text-xs text-gray-400 font-normal">Yield Earned</div>
                <div className="text-base sm:text-lg font-semibold text-emerald-600 mt-0.5">
                  +$210.00 USDY
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 font-normal">Current APY</div>
                <div className="text-base sm:text-lg font-semibold text-gray-900 mt-0.5">
                  5.20%
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 font-normal">Ondo Tokenized Stocks</div>
                <div className="text-base sm:text-lg font-semibold text-gray-900 mt-0.5">
                  $6,956.35
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 font-normal">KYC Verification</div>
                <div className="text-base sm:text-lg font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Verified
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Switcher */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('positions')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'positions'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Tokenized Positions ({positions.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('activity')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'activity'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Transaction History
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('yield')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'yield'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                USDY Yield Rewards
              </button>
            </div>
          </div>

          {/* Tab Content: Positions */}
          {activeTab === 'positions' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      <th className="py-4 px-6">Asset Name</th>
                      <th className="py-4 px-6">Balance</th>
                      <th className="py-4 px-6">Token Price</th>
                      <th className="py-4 px-6">Total Value</th>
                      <th className="py-4 px-6">Unrealized PnL</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                    {positions.map((pos) => (
                      <tr key={pos.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl ${pos.color} text-white flex items-center justify-center font-bold text-xs shadow-2xs`}
                            >
                              {pos.ticker.slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{pos.name}</div>
                              <div className="text-xs text-gray-500">{pos.ticker} • {pos.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-900">
                          {pos.balance} <span className="text-xs text-gray-400 font-normal">{pos.ticker}</span>
                        </td>
                        <td className="py-4 px-6 text-gray-700 font-medium">
                          {pos.price}
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-900">
                          {pos.value}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`font-semibold ${
                              pos.pnlIsPositive ? 'text-emerald-600' : 'text-red-600'
                            }`}
                          >
                            {pos.pnl}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              className="px-3 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                            >
                              Trade
                            </button>
                            <button
                              type="button"
                              className="px-3 py-1.5 border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                            >
                              Redeem
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content: Activity */}
          {activeTab === 'activity' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Recent Transactions</h3>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100/70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-xs">
                        {tx.type === 'Mint' ? <Plus className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {tx.type} {tx.asset}
                        </div>
                        <div className="text-xs text-gray-500">{tx.date}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">{tx.amount}</div>
                      <div className="text-xs text-emerald-600 font-medium">{tx.status} • {tx.txHash}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Yield */}
          {activeTab === 'yield' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">USDY Yield Accumulation</h3>
                  <p className="text-xs text-gray-500">
                    USDY accumulates daily token price appreciation backed by short-term US Treasuries.
                  </p>
                </div>
                <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  <span>5.20% Net APY</span>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl space-y-4">
                <div className="text-xs text-blue-200 font-medium">Estimated Annualized Yield</div>
                <div className="text-3xl font-bold">$270.92 / year</div>
                <p className="text-xs text-blue-300 leading-relaxed max-w-xl">
                  Yield is automatically reflected in the USDY token price. You do not need to claim or stake — holding USDY in your wallet automatically generates daily yield.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
