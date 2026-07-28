import React from 'react';
import { TOP_GAINERS, TRENDING_ASSETS, NEWLY_ADDED } from '../data/stocks';
import { AssetIcon } from './AssetIcon';

interface TopListsProps {
  onSelectTicker?: (ticker: string) => void;
}

export const TopLists: React.FC<TopListsProps> = ({ onSelectTicker }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      {/* 1. Top Gainers */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-bold text-gray-900">Top Gainers</h2>
          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
            24H
          </span>
        </div>

        <div className="space-y-3">
          {TOP_GAINERS.map((item) => (
            <div
              key={item.ticker}
              onClick={() => onSelectTicker?.(item.ticker)}
              className="flex items-center justify-between py-1.5 hover:bg-gray-50/80 px-2 rounded-lg cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <AssetIcon type={item.iconLetter} bg={item.iconBg} letter={item.iconLetter} className="w-7 h-7 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {item.ticker}
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium truncate">
                    {item.name}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </div>
                <div className="text-[11px] font-bold text-emerald-600 flex items-center justify-end gap-0.5">
                  <span className="text-[9px]">▲</span> {item.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Trending */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-bold text-gray-900">Trending</h2>
          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
            24H
          </span>
        </div>

        <div className="space-y-3">
          {TRENDING_ASSETS.map((item) => (
            <div
              key={item.ticker}
              onClick={() => onSelectTicker?.(item.ticker)}
              className="flex items-center justify-between py-1.5 hover:bg-gray-50/80 px-2 rounded-lg cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <AssetIcon type={item.iconLetter} bg={item.iconBg} letter={item.iconLetter} className="w-7 h-7 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {item.ticker}
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium truncate">
                    {item.name}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </div>
                <div className="text-[10px] font-medium text-gray-400">
                  {item.volume}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Newly Added */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-bold text-gray-900">Newly Added</h2>
        </div>

        <div className="space-y-3">
          {NEWLY_ADDED.map((item) => (
            <div
              key={item.ticker}
              onClick={() => onSelectTicker?.(item.ticker)}
              className="flex items-center justify-between py-1.5 hover:bg-gray-50/80 px-2 rounded-lg cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <AssetIcon type="ishares" bg={item.iconBg} letter="---" className="w-7 h-7 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {item.ticker}
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium truncate max-w-[140px] lg:max-w-[170px]">
                    {item.name}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </div>
                <div className="text-[10px] font-medium text-gray-400">
                  {item.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
