import React from 'react';
import { StockAsset } from '../types';
import { AssetIcon } from './AssetIcon';
import { Sparkline } from './Sparkline';
import { AnimatedNumber } from './AnimatedNumber';

interface StockCardProps {
  asset: StockAsset;
  onClick?: () => void;
}

export const StockCard: React.FC<StockCardProps> = ({ asset, onClick }) => {
  const isPositive = asset.isPositive;

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border p-4 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group relative overflow-hidden ${
        isPositive
          ? 'bg-gradient-to-b from-white via-white to-emerald-50/50 border-gray-200/90 hover:border-emerald-300'
          : 'bg-gradient-to-b from-white via-white to-rose-50/60 border-gray-200/90 hover:border-rose-300'
      }`}
    >
      {/* Top Header Row */}
      <div className="flex items-start gap-2.5 mb-3">
        <AssetIcon
          type={asset.iconType}
          bg={asset.iconBg}
          className="w-8 h-8 rounded-md shrink-0 mt-0.5"
        />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate tracking-tight">
            {asset.ticker}
          </div>
          <div className="text-[11px] text-gray-500 font-medium truncate">
            {asset.name}
          </div>
        </div>
      </div>

      {/* Middle Price & Change Row */}
      <div className="mb-2">
        <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          <AnimatedNumber value={asset.price} prefix="$" decimals={2} />
        </div>
        <div
          className={`text-[11px] font-bold mt-0.5 flex items-center gap-1 ${
            isPositive ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          <span>{isPositive ? '▲' : '▼'}</span>
          <AnimatedNumber value={Math.abs(asset.changeAmount)} prefix="$" decimals={2} showFlash={false} />
          <span>
            (<AnimatedNumber value={Math.abs(asset.changePercent)} suffix="%" decimals={2} showFlash={false} />) 24H
          </span>
        </div>
      </div>

      {/* Sparkline Chart Container */}
      <div className="w-full h-24 mt-2 -mx-1 -mb-2">
        <Sparkline data={asset.sparklineData} isPositive={isPositive} height={95} />
      </div>
    </div>
  );
};
