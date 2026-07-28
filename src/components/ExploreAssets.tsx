import React, { useState, useMemo } from 'react';
import { StockAsset, CategoryFilter, SortOption } from '../types';
import { StockCard } from './StockCard';
import { AssetIcon } from './AssetIcon';
import { Sparkline } from './Sparkline';
import { Search, LayoutGrid, List, ChevronDown } from 'lucide-react';

interface ExploreAssetsProps {
  assets: StockAsset[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onAssetClick: (asset: StockAsset) => void;
}

const CATEGORIES: CategoryFilter[] = [
  'All assets',
  '24/7 Available',
  'ETF',
  'Technology',
  'Consumer',
  'Financials',
  'Large Cap',
  'Growth',
  'Value',
];

const SORT_OPTIONS: SortOption[] = [
  'Most Popular',
  'Top Gainers',
  'Top Losers',
  'Price: High to Low',
  'Price: Low to High',
];

export const ExploreAssets: React.FC<ExploreAssetsProps> = ({
  assets,
  searchQuery,
  onSearchChange,
  onAssetClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All assets');
  const [selectedSort, setSelectedSort] = useState<SortOption>('Most Popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  // Filtering and sorting logic
  const filteredAssets = useMemo(() => {
    let list = [...assets];

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) => a.ticker.toLowerCase().includes(q) || a.name.toLowerCase().includes(q)
      );
    }

    // Filter by category chip
    if (selectedCategory !== 'All assets') {
      list = list.filter((a) => a.categories.includes(selectedCategory));
    }

    // Sort
    if (selectedSort === 'Most Popular') {
      list.sort((a, b) => a.popularityRank - b.popularityRank);
    } else if (selectedSort === 'Top Gainers') {
      list.sort((a, b) => b.changePercent - a.changePercent);
    } else if (selectedSort === 'Top Losers') {
      list.sort((a, b) => a.changePercent - b.changePercent);
    } else if (selectedSort === 'Price: High to Low') {
      list.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'Price: Low to High') {
      list.sort((a, b) => a.price - b.price);
    }

    return list;
  }, [assets, searchQuery, selectedCategory, selectedSort]);

  return (
    <div className="my-8 space-y-5">
      {/* 1. Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Explore Assets
          </h2>
          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full align-top">
            21
          </span>
        </div>

        {/* Market Status Indicator */}
        <div className="inline-flex items-center gap-1.5 bg-emerald-50/80 border border-emerald-200/60 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Market Open <span className="text-emerald-600/80 font-normal">(Regular)</span></span>
        </div>
      </div>

      {/* 2. Controls & Filter Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left Side: Search & Filter Pills */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 overflow-x-auto pb-1 scrollbar-none">
          {/* Search Box */}
          <div className="relative min-w-[220px] max-w-xs shrink-0">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search asset name or ticker"
              className="w-full bg-gray-100/90 text-gray-900 placeholder-gray-400 text-xs font-medium pl-8 pr-3 py-1.5 rounded-lg border border-transparent focus:outline-none focus:bg-white focus:border-gray-300 transition-all"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                    isActive
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-gray-100/80 hover:bg-gray-200/70 text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: View Mode & Sort Dropdown */}
        <div className="flex items-center gap-2 justify-end shrink-0">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200/60">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-gray-100/80 hover:bg-gray-200/60 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors border border-gray-200/60"
            >
              <span>{selectedSort}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20 text-xs font-medium">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedSort(opt);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 hover:bg-gray-50 transition-colors ${
                      selectedSort === opt ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-gray-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Assets Display */}
      {filteredAssets.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 my-8">
          <p className="text-gray-500 font-medium text-sm">No assets found matching your criteria.</p>
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              setSelectedCategory('All assets');
            }}
            className="mt-3 text-xs font-bold text-blue-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredAssets.map((asset) => (
            <StockCard
              key={asset.id}
              asset={asset}
              onClick={() => onAssetClick(asset)}
            />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden divide-y divide-gray-100">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => onAssetClick(asset)}
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3 w-1/3 min-w-[180px]">
                <AssetIcon type={asset.iconType} bg={asset.iconBg} className="w-8 h-8 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {asset.ticker}
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium truncate">
                    {asset.name}
                  </div>
                </div>
              </div>

              {/* Sparkline mini */}
              <div className="hidden md:block w-32 h-10">
                <Sparkline data={asset.sparklineData} isPositive={asset.isPositive} height={40} />
              </div>

              {/* Price & Change */}
              <div className="text-right">
                <div className="text-sm font-black text-gray-900">
                  ${asset.price.toFixed(2)}
                </div>
                <div
                  className={`text-[11px] font-bold ${
                    asset.isPositive ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {asset.isPositive ? '▲' : '▼'} ${Math.abs(asset.changeAmount).toFixed(2)} ({Math.abs(asset.changePercent).toFixed(2)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Bottom Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium">
        <div>1-48 of 442</div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1 hover:text-gray-900 transition-colors disabled:opacity-40"
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {[1, 2, 3, 4, 5].map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setCurrentPage(pageNum)}
              className={`w-6 h-6 rounded-md flex items-center justify-center font-semibold text-xs transition-colors ${
                currentPage === pageNum
                  ? 'bg-[#18181B] text-white shadow-2xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <span className="px-1 text-gray-400">...</span>

          <button
            type="button"
            onClick={() => setCurrentPage(10)}
            className={`w-6 h-6 rounded-md flex items-center justify-center font-semibold text-xs transition-colors ${
              currentPage === 10
                ? 'bg-[#18181B] text-white shadow-2xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            10
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(10, p + 1))}
            className="p-1 hover:text-gray-900 transition-colors disabled:opacity-40"
            disabled={currentPage === 10}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
