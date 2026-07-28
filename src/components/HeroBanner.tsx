import React from 'react';

interface HeroBannerProps {
  onTradeNowClick?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onTradeNowClick }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#033A2E] text-white p-6 md:p-8 lg:p-10 shadow-sm border border-[#065F46]">
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-80">
        <svg
          viewBox="0 0 1000 300"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[180%] w-auto text-emerald-500/20 stroke-current"
          fill="none"
          strokeWidth="1.5"
        >
          {/* Radial vectors matching the target image */}
          <line x1="600" y1="150" x2="950" y2="40" stroke="#10B981" strokeWidth="2" strokeOpacity="0.6" />
          <line x1="600" y1="150" x2="950" y2="150" stroke="#34D399" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="600" y1="150" x2="850" y2="280" stroke="#059669" strokeWidth="2" strokeOpacity="0.5" />
          <circle cx="600" cy="150" r="12" fill="#34D399" fillOpacity="0.9" />
          <circle cx="600" cy="150" r="6" fill="#FFFFFF" />
          <circle cx="600" cy="150" r="28" stroke="#34D399" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Content */}
        <div className="max-w-xl space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-[28px] font-extrabold tracking-tight text-white leading-tight">
            Buy and Sell Tokenized Stocks 24/7
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 font-medium leading-relaxed max-w-lg">
            Always-on minting and burning means you can trade with deep liquidity anytime.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onTradeNowClick}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-[#064E3B] hover:bg-[#043E2F] border border-emerald-400/50 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              Trade Now
            </button>
          </div>
        </div>

        {/* Right Graphic Banner Text */}
        <div className="flex items-center gap-3 self-end md:self-center pr-2 md:pr-8">
          <div className="text-right">
            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Onchain{' '}
            </span>
            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#34D399]">
              24:7:365
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
