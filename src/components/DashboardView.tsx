import React, { useState } from 'react';
import {
  Calendar,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  Shield,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';
import { Sparkline } from './Sparkline';
import { StockAsset } from '../types';

interface DashboardViewProps {
  connectedWallet: string | null;
  userEmail: string | null;
  onOpenWalletModal: () => void;
  onSelectAsset?: (asset: StockAsset) => void;
  onNavigateExplore?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  connectedWallet,
  userEmail,
  onOpenWalletModal,
  onSelectAsset,
  onNavigateExplore,
}) => {
  const [activeTimeframe, setActiveTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1D');
  const [holdingsSearch, setHoldingsSearch] = useState('');
  const [txSearch, setTxSearch] = useState('');
  const [allocationTab, setAllocationTab] = useState<'all' | 'crypto' | 'ondo'>('all');
  const [selectedAssetClass, setSelectedAssetClass] = useState('All');
  const [selectedNetwork, setSelectedNetwork] = useState('All');

  const displayWallet = connectedWallet
    ? `${connectedWallet.slice(0, 6)}...${connectedWallet.slice(-4)}`
    : userEmail
    ? userEmail.split('@')[0]
    : '0xD74f...Fa47';

  // Sample holdings matching user video
  const holdingsData = [
    {
      id: 'bnb',
      name: 'BNB',
      ticker: 'BNB',
      class: 'Crypto',
      price: 573.10,
      balance: 0.0003,
      value: 0.15,
      iconBg: 'bg-amber-400 text-black',
      symbol: 'BNB',
    },
    {
      id: 'pit',
      name: 'Pitbull',
      ticker: 'PIT',
      class: 'Crypto',
      price: 0.00,
      balance: 0,
      value: 0.00,
      iconBg: 'bg-gray-200 text-gray-700',
      symbol: '🐶',
    },
    {
      id: 'anon-v2',
      name: 'ANON INU v2',
      ticker: 'ANON INU v2',
      class: 'Crypto',
      price: 0.00,
      balance: 15.00,
      value: 0.00,
      iconBg: 'bg-gray-300 text-gray-800',
      symbol: '👤',
    },
    {
      id: 'anon-check',
      name: 'Anonymous',
      ticker: 'Anonymous',
      verified: true,
      class: 'Crypto',
      price: 0.00,
      balance: 1.00,
      value: 0.00,
      iconBg: 'bg-gray-200 text-gray-800',
      symbol: '✔',
    },
    {
      id: 'anon-inu',
      name: 'ANON INU',
      ticker: 'ANON INU',
      class: 'Crypto',
      price: 0.00,
      balance: 0,
      value: 0.00,
      iconBg: 'bg-gray-300 text-gray-700',
      symbol: '🐶',
    },
    {
      id: 'gmlu',
      name: 'Gimlu',
      ticker: 'GMLU',
      class: 'Crypto',
      price: 0.00,
      balance: 0,
      value: 0.00,
      iconBg: 'bg-gray-200 text-gray-700',
      symbol: 'G',
    },
  ];

  // Transactions list matching user video
  const transactionsData = [
    {
      id: 'tx1',
      date: '20 Sep 2025',
      time: '22:54:46 BST',
      type: 'Sent',
      typeColor: 'bg-purple-50 text-purple-700',
      token: 'TOSHI',
      network: 'BNB Chain',
      amount: '22.0342',
      fiatValue: '$0.02',
      status: 'Completed',
    },
    {
      id: 'tx2',
      date: '20 Sep 2025',
      time: '22:53:42 BST',
      type: 'Swapped',
      typeColor: 'bg-blue-50 text-blue-700',
      token: 'BNB',
      network: 'BNB Chain',
      amount: '0.0003',
      fiatValue: '$0.27',
      status: 'Completed',
    },
    {
      id: 'tx3',
      date: '20 Sep 2025',
      time: '22:53:33 BST',
      type: 'Approved',
      typeColor: 'bg-gray-100 text-gray-700',
      token: 'BUSD',
      network: 'BNB Chain',
      amount: '0',
      fiatValue: '$0.00',
      status: 'Completed',
    },
    {
      id: 'tx4',
      date: '20 Sep 2025',
      time: '22:51:53 BST',
      type: 'Swapped',
      typeColor: 'bg-blue-50 text-blue-700',
      token: 'TOSHI',
      network: 'BNB Chain',
      amount: '22.0342',
      fiatValue: '$0.02',
      status: 'Completed',
    },
    {
      id: 'tx5',
      date: '17 Sep 2025',
      time: '18:12:00 BST',
      type: 'Approved',
      typeColor: 'bg-gray-100 text-gray-700',
      token: 'AINU',
      network: 'BNB Chain',
      amount: '0',
      fiatValue: '$0.00',
      status: 'Completed',
    },
    {
      id: 'tx6',
      date: '15 Sep 2025',
      time: '14:02:11 BST',
      type: 'Bought',
      typeColor: 'bg-emerald-50 text-emerald-700',
      token: 'BNB',
      network: 'BNB Chain',
      amount: '0.0076',
      fiatValue: '$3.69',
      status: 'Completed',
    },
    {
      id: 'tx7',
      date: '12 Sep 2025',
      time: '10:11:45 BST',
      type: 'Swapped',
      typeColor: 'bg-blue-50 text-blue-700',
      token: 'ENEDEX',
      network: 'BNB Chain',
      amount: '32,000.00',
      fiatValue: '—',
      status: 'Completed',
    },
    {
      id: 'tx8',
      date: '10 Sep 2025',
      time: '09:20:12 BST',
      type: 'Bought',
      typeColor: 'bg-emerald-50 text-emerald-700',
      token: 'BNB',
      network: 'BNB Chain',
      amount: '0.0082',
      fiatValue: '$3.98',
      status: 'Completed',
    },
    {
      id: 'tx9',
      date: '08 Sep 2025',
      time: '15:44:01 BST',
      type: 'Bought',
      typeColor: 'bg-emerald-50 text-emerald-700',
      token: 'BNB',
      network: 'BNB Chain',
      amount: '0.0013',
      fiatValue: '$0.52',
      status: 'Completed',
    },
    {
      id: 'tx10',
      date: '05 Sep 2025',
      time: '11:30:19 BST',
      type: 'Swapped',
      typeColor: 'bg-blue-50 text-blue-700',
      token: 'WETH',
      network: 'BNB Chain',
      amount: '0.0005',
      fiatValue: '$1.52',
      status: 'Completed',
    },
  ];

  // Investors also own assets matching video
  const investorsAssets: StockAsset[] = [
    {
      id: 'intcon',
      name: 'Intel',
      ticker: 'INTCon',
      price: 87.03,
      changeAmount: -2.05,
      changePercent: -2.30,
      isPositive: false,
      sparklineData: [92, 90, 91, 88, 89, 86, 87.03],
      categories: ['All assets'],
      iconBg: 'bg-[#1D4ED8]',
      iconType: 'intel',
      popularityRank: 1,
      volume: '$1.2M',
      marketCap: '$36.8B',
      assetType: 'stock',
    },
    {
      id: 'soxlon',
      name: 'Direxion Daily Semi Bull 3X ETF',
      ticker: 'SOXLon',
      price: 110.56,
      changeAmount: -6.83,
      changePercent: -5.81,
      isPositive: false,
      sparklineData: [120, 118, 116, 114, 112, 109, 110.56],
      categories: ['All assets', 'ETF'],
      iconBg: 'bg-[#6D28D9]',
      iconType: 'etf',
      popularityRank: 2,
      volume: '$4.5M',
      marketCap: '$8.2B',
      assetType: 'stock',
    },
    {
      id: 'nokon',
      name: 'Nokia',
      ticker: 'NOKon',
      price: 8.86,
      changeAmount: -0.10,
      changePercent: -1.11,
      isPositive: false,
      sparklineData: [9.1, 9.0, 8.95, 8.9, 8.88, 8.84, 8.86],
      categories: ['All assets'],
      iconBg: 'bg-[#1D4ED8]',
      iconType: 'nokia',
      popularityRank: 3,
      volume: '$450K',
      marketCap: '$24.1B',
      assetType: 'stock',
    },
    {
      id: 'nvdaon',
      name: 'NVIDIA',
      ticker: 'NVDAon',
      price: 197.15,
      changeAmount: 0.16,
      changePercent: 0.08,
      isPositive: true,
      sparklineData: [194, 195, 193, 196, 195.5, 196.8, 197.15],
      categories: ['All assets', 'Technology'],
      iconBg: 'bg-[#15803D]',
      iconType: 'nvidia',
      popularityRank: 4,
      volume: '$18.4M',
      marketCap: '$3.1T',
      assetType: 'stock',
    },
  ];

  const filteredHoldings = holdingsData.filter((h) =>
    h.name.toLowerCase().includes(holdingsSearch.toLowerCase()) ||
    h.ticker.toLowerCase().includes(holdingsSearch.toLowerCase())
  );

  const filteredTx = transactionsData.filter((t) =>
    t.token.toLowerCase().includes(txSearch.toLowerCase()) ||
    t.type.toLowerCase().includes(txSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fadeIn font-sans">
      {/* 1. Welcome Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shadow-2xs">
            ☘
          </div>
          <div className="text-base font-normal text-gray-800">
            Welcome, <strong className="font-semibold text-gray-900">{displayWallet}</strong>
          </div>
        </div>

        <button
          type="button"
          className="p-2 border border-gray-200/80 rounded-xl hover:bg-gray-50 transition-colors text-gray-600 cursor-pointer"
          title="Date calendar"
        >
          <Calendar className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Main Balance & Area Chart Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-2xs space-y-6">
        {/* Balance & Subtitle */}
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            <AnimatedNumber value={0.15} prefix="$" decimals={2} />
          </div>
          <div className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
            <span>
              <AnimatedNumber value={0.00} prefix="$" decimals={2} showFlash={false} />
            </span>
            <span>(2.28%) 24h</span>
          </div>
        </div>

        {/* Timeframe Selector Pills */}
        <div className="inline-flex items-center bg-gray-50 border border-gray-200/80 rounded-xl p-1 gap-1 text-xs font-semibold text-gray-600">
          {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setActiveTimeframe(tf)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTimeframe === tf
                  ? 'bg-white text-gray-900 shadow-2xs font-bold border border-gray-200/50'
                  : 'hover:text-gray-900'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Green Area Sparkline Graph with X-Axis Dates */}
        <div className="pt-2">
          <div className="w-full h-44 sm:h-52 relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="dashboardGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,40 Q 30,10 60,60 T 120,90 T 180,85 T 240,95 T 300,30 L 300,120 L 0,120 Z"
                fill="url(#dashboardGrad)"
              />
              <path
                d="M 0,40 Q 30,10 60,60 T 120,90 T 180,85 T 240,95 T 300,30"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Dates X-Axis */}
          <div className="flex justify-between text-[11px] font-medium text-gray-400 pt-3 border-t border-gray-100">
            <span>27 Jul</span>
            <span>28 Jul</span>
            <span>28 Jul</span>
          </div>
        </div>
      </div>

      {/* 3. My Holdings Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-2xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">My Holdings</h2>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter 1: Asset Class */}
            <div className="relative">
              <select
                value={selectedAssetClass}
                onChange={(e) => setSelectedAssetClass(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200/80 rounded-xl px-3.5 py-1.5 pr-8 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100/80 transition-colors"
              >
                <option value="All">Asset Class</option>
                <option value="Crypto">Crypto</option>
                <option value="Ondo Stocks">Ondo Stocks</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* Filter 2: Network */}
            <div className="relative">
              <select
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200/80 rounded-xl px-3.5 py-1.5 pr-8 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100/80 transition-colors"
              >
                <option value="All">Network</option>
                <option value="BNB Chain">BNB Chain</option>
                <option value="Ethereum">Ethereum</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Search input */}
        <div className="relative max-w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search asset"
            value={holdingsSearch}
            onChange={(e) => setHoldingsSearch(e.target.value)}
            className="w-full bg-gray-50/80 border border-gray-200/80 rounded-2xl pl-10 pr-4 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {/* USDC & USDT Summary Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* USDC Card */}
          <div className="bg-[#EDF4FF] border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-2xs">
                $
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-600">USDC</div>
                <div className="text-lg font-bold text-gray-900">$0</div>
              </div>
            </div>
          </div>

          {/* USDT Card */}
          <div className="bg-[#EFF5EE] border border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-2xs">
                ₮
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-600">USDT</div>
                <div className="text-lg font-bold text-gray-900">$0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Asset Table matching exact screenshot */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="text-gray-400 font-semibold border-b border-gray-100 pb-2">
                <th className="py-3 font-normal">Token</th>
                <th className="py-3 font-normal">Asset Class</th>
                <th className="py-3 font-normal">Price ($)</th>
                <th className="py-3 font-normal">Balance</th>
                <th className="py-3 font-normal text-right">Value ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {filteredHoldings.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full ${item.iconBg} flex items-center justify-center font-bold text-xs shadow-2xs`}>
                        {item.symbol}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 flex items-center gap-1">
                          <span>{item.name}</span>
                          {item.verified && (
                            <span className="text-blue-500 font-bold text-[10px]" title="Verified">✔</span>
                          )}
                        </div>
                        <div className="text-[10px] text-gray-400">{item.ticker}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full text-[10px] font-bold border border-purple-100">
                      {item.class}
                    </span>
                  </td>
                  <td className="py-3.5 font-semibold text-gray-900">
                    ${item.price > 0 ? item.price.toFixed(2) : '0'}
                  </td>
                  <td className="py-3.5 font-semibold text-gray-900">
                    {item.balance}
                  </td>
                  <td className="py-3.5 font-bold text-gray-900 text-right">
                    ${item.value.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Portfolio Allocation Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-2xs space-y-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Portfolio Allocation</h2>

        {/* Allocation Category Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <button
            type="button"
            onClick={() => setAllocationTab('all')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              allocationTab === 'all'
                ? 'bg-gray-900 text-white shadow-2xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Assets
          </button>
          <button
            type="button"
            onClick={() => setAllocationTab('crypto')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              allocationTab === 'crypto'
                ? 'bg-gray-900 text-white shadow-2xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Crypto
          </button>
          <button
            type="button"
            onClick={() => setAllocationTab('ondo')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              allocationTab === 'ondo'
                ? 'bg-gray-900 text-white shadow-2xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Ondo Stocks
          </button>
        </div>

        {/* Big Donut Ring Chart with Center Box */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto flex items-center justify-center my-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Outer Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#F3F4F6"
              strokeWidth="6"
            />
            {/* Active Purple Ring Segment */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#A855F7"
              strokeWidth="6"
              strokeDasharray="248 251"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          </svg>

          {/* Center Box Overlay */}
          <div className="absolute bg-white/90 backdrop-blur-xs border border-gray-200/80 rounded-2xl p-3 shadow-md text-center min-w-[110px]">
            <div className="text-base font-extrabold text-gray-900">$0.15</div>
            <div className="text-[10px] font-semibold text-gray-500 tracking-tight border-t border-gray-100 pt-1 mt-1">
              ALL | 100.00%
            </div>
          </div>
        </div>

        {/* Allocation Legend Details */}
        <div className="space-y-3 pt-2">
          <div className="text-base font-bold text-gray-900">All Assets</div>
          <div className="text-xs text-gray-500 font-medium">
            Total Value: <strong className="text-gray-900 font-bold">$0.15</strong> • 100.00% of Portfolio
          </div>

          <div className="space-y-2.5 pt-2 text-xs">
            {/* Crypto Legend Row */}
            <div className="flex items-center justify-between p-2.5 bg-gray-50/80 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-md bg-purple-500" />
                <span className="font-bold text-gray-900">Crypto</span>
                <span className="text-[10px] bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded-md font-semibold">
                  +3
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-600">98.70%</span>
                <span className="font-bold text-gray-900">$0.15</span>
              </div>
            </div>

            {/* Ondo Stocks Legend Row */}
            <div className="flex items-center justify-between p-2.5 bg-gray-50/80 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-md bg-emerald-500" />
                <span className="font-bold text-gray-900">Ondo Stocks</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-600">0.00%</span>
                <span className="font-bold text-gray-900">$0</span>
              </div>
            </div>

            {/* Cash Legend Row */}
            <div className="flex items-center justify-between p-2.5 bg-gray-50/80 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-md bg-amber-500" />
                <span className="font-bold text-gray-900">Cash</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-600">0.00%</span>
                <span className="font-bold text-gray-900">$0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Recent Transactions Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-2xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Recent Transactions</h2>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <select className="appearance-none bg-gray-50 border border-gray-200/80 rounded-xl px-3.5 py-1.5 pr-8 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100/80 transition-colors">
                <option value="All">Type</option>
                <option value="Sent">Sent</option>
                <option value="Swapped">Swapped</option>
                <option value="Approved">Approved</option>
                <option value="Bought">Bought</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            <div className="relative">
              <select className="appearance-none bg-gray-50 border border-gray-200/80 rounded-xl px-3.5 py-1.5 pr-8 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100/80 transition-colors">
                <option value="All">Network</option>
                <option value="BNB Chain">BNB Chain</option>
                <option value="Ethereum">Ethereum</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Transaction Search Bar */}
        <div className="relative max-w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search"
            value={txSearch}
            onChange={(e) => setTxSearch(e.target.value)}
            className="w-full bg-gray-50/80 border border-gray-200/80 rounded-2xl pl-10 pr-4 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {/* Transactions Table matching exact screenshot */}
        <div className="overflow-x-auto pt-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="text-gray-400 font-semibold border-b border-gray-100 pb-2">
                <th className="py-3 font-normal">Date and Time</th>
                <th className="py-3 font-normal">Type</th>
                <th className="py-3 font-normal">Token</th>
                <th className="py-3 font-normal">Amount</th>
                <th className="py-3 font-normal text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {filteredTx.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5">
                    <div className="font-bold text-gray-900">{tx.date}</div>
                    <div className="text-[10px] text-gray-400">{tx.time}</div>
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${tx.typeColor}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-[10px]">
                        BNB
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{tx.token}</div>
                        <div className="text-[10px] text-gray-400">{tx.network}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <div className="font-bold text-gray-900">{tx.amount}</div>
                    <div className="text-[10px] text-gray-400">{tx.fiatValue}</div>
                  </td>
                  <td className="py-3.5 text-right">
                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-100">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination arrows */}
        <div className="flex items-center justify-center gap-3 pt-3 border-t border-gray-100">
          <button type="button" className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button type="button" className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6. Investors Also Own Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-2xs space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Investors Also Own</h2>
          <p className="text-xs text-gray-500 font-normal">
            Start building your portfolio with Ondo's latest investment opportunities.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={onNavigateExplore}
            className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100/80 text-gray-900 border border-gray-200/80 text-xs font-bold rounded-2xl transition-colors cursor-pointer"
          >
            Explore 200+ Assets
          </button>
        </div>

        {/* Stock Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {investorsAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => onSelectAsset?.(asset)}
              className="bg-gray-50/70 border border-gray-200/70 rounded-2xl p-4 space-y-3 cursor-pointer hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  {asset.ticker.slice(0, 3)}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {asset.ticker}
                  </div>
                  <div className="text-[10px] text-gray-400">{asset.name}</div>
                </div>
              </div>

              <div>
                <div className="text-xl font-extrabold text-gray-900">
                  <AnimatedNumber value={asset.price} prefix="$" decimals={2} />
                </div>
                <div
                  className={`text-[11px] font-bold flex items-center gap-1 ${
                    asset.isPositive ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  <span>{asset.isPositive ? '▲' : '▼'}</span>
                  <span>${Math.abs(asset.changeAmount).toFixed(2)}</span>
                  <span>({Math.abs(asset.changePercent).toFixed(2)}%) 24H</span>
                </div>
              </div>

              {/* Sparkline Graph */}
              <div className="h-12 w-full pt-1">
                <Sparkline data={asset.sparklineData} isPositive={asset.isPositive} height={48} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
