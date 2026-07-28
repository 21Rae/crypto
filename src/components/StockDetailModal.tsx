import React, { useState } from 'react';
import { StockAsset } from '../types';
import { AssetIcon } from './AssetIcon';
import { Sparkline } from './Sparkline';
import { X, CheckCircle2, ArrowUpRight, ArrowDownRight, ShieldCheck, Zap } from 'lucide-react';

interface StockDetailModalProps {
  asset: StockAsset | null;
  onClose: () => void;
  connectedWallet: string | null;
  onOpenWalletModal: () => void;
}

export const StockDetailModal: React.FC<StockDetailModalProps> = ({
  asset,
  onClose,
  connectedWallet,
  onOpenWalletModal,
}) => {
  if (!asset) return null;

  const [activeTimeframe, setActiveTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1D');
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [amountShares, setAmountShares] = useState<string>('1');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const numShares = parseFloat(amountShares) || 0;
  const totalPrice = numShares * asset.price;

  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectedWallet) {
      onOpenWalletModal();
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 shadow-2xl relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AssetIcon type={asset.iconType} bg={asset.iconBg} className="w-10 h-10 rounded-xl" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-gray-900">{asset.ticker}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60">
                  Tokenized Stock
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">{asset.name}</p>
            </div>
          </div>

          <div className="text-right pr-8">
            <div className="text-2xl font-black text-gray-900">${asset.price.toFixed(2)}</div>
            <div
              className={`text-xs font-bold flex items-center justify-end gap-1 ${
                asset.isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {asset.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              ${Math.abs(asset.changeAmount).toFixed(2)} ({Math.abs(asset.changePercent).toFixed(2)}%) 24H
            </div>
          </div>
        </div>

        {/* Modal Body: Grid split (Chart + Trading Form) */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Chart & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timeframe Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setActiveTimeframe(tf)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      activeTimeframe === tf
                        ? 'bg-white text-gray-900 shadow-2xs'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-current" />
                <span>Live 24/7 Liquidity</span>
              </div>
            </div>

            {/* Price Chart */}
            <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 h-52 relative overflow-hidden">
              <Sparkline data={asset.sparklineData} isPositive={asset.isPositive} height={180} />
            </div>

            {/* Key Stock Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="text-[10px] font-bold text-gray-400 uppercase">24h High</div>
                <div className="text-xs font-bold text-gray-900 mt-0.5">
                  ${(asset.high24h || asset.price * 1.03).toFixed(2)}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="text-[10px] font-bold text-gray-400 uppercase">24h Low</div>
                <div className="text-xs font-bold text-gray-900 mt-0.5">
                  ${(asset.low24h || asset.price * 0.97).toFixed(2)}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="text-[10px] font-bold text-gray-400 uppercase">24h Volume</div>
                <div className="text-xs font-bold text-gray-900 mt-0.5">
                  {asset.volume || '$52.4M'}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="text-[10px] font-bold text-gray-400 uppercase">Market Cap</div>
                <div className="text-xs font-bold text-gray-900 mt-0.5">
                  {asset.marketCap || '$120B'}
                </div>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Order Placement */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200/80 flex flex-col justify-between space-y-4">
            <div>
              {/* Order Mode Toggle */}
              <div className="grid grid-cols-2 gap-1 bg-gray-200/70 p-1 rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => setOrderType('buy')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    orderType === 'buy' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Buy Token
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('sell')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    orderType === 'sell' ? 'bg-rose-600 text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sell Token
                </button>
              </div>

              {/* Order Form */}
              <form onSubmit={handleExecuteTrade} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Number of Tokens ({asset.ticker})
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={amountShares}
                    onChange={(e) => setAmountShares(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="bg-white rounded-xl p-3 border border-gray-200 space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500 font-medium">
                    <span>Token Price</span>
                    <span className="font-bold text-gray-900">${asset.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 font-medium">
                    <span>Estimated Fee</span>
                    <span className="font-bold text-emerald-600">0.00% (Free)</span>
                  </div>
                  <div className="border-t border-gray-100 pt-1.5 flex justify-between text-xs font-black text-gray-900">
                    <span>Total Cost</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {isSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center gap-2 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Order Executed Onchain!</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs text-white transition-all shadow-md active:scale-95 ${
                    orderType === 'buy'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  {isSubmitting ? (
                    'Processing Onchain...'
                  ) : connectedWallet ? (
                    `${orderType === 'buy' ? 'Buy' : 'Sell'} ${asset.ticker}`
                  ) : (
                    'Connect Wallet to Trade'
                  )}
                </button>
              </form>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Backed 1:1 by real stock reserves onchain</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
