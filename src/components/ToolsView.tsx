import React, { useState } from 'react';
import { Calculator, ShieldCheck, Zap, RefreshCw, ArrowRight, DollarSign, Percent } from 'lucide-react';

export const ToolsView: React.FC = () => {
  const [depositAmount, setDepositAmount] = useState<number>(10000);
  const [durationMonths, setDurationMonths] = useState<number>(12);
  const apy = 5.2;

  const totalYield = (depositAmount * (apy / 100) * (durationMonths / 12));
  const finalBalance = depositAmount + totalYield;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
          Ondo Institutional Tools & Calculators
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Simulate yield projections, calculate instant mint/redemption fees, and verify reserve attestations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Yield Calculator Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">USDY Yield Simulator</h2>
              <p className="text-xs text-gray-500">
                Calculate expected returns for holding USDY tokenized treasury yield.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Input Deposit Amount */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-600 mb-2">
                <span>Principal Amount (USDC / USD)</span>
                <span className="text-gray-900 font-bold">${depositAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="500000"
                step="1000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            {/* Input Duration */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-600 mb-2">
                <span>Holding Duration</span>
                <span className="text-gray-900 font-bold">{durationMonths} Months</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[3, 6, 12, 24].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setDurationMonths(m)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                      durationMonths === m
                        ? 'bg-black text-white border-black'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {m} Months
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Output Box */}
            <div className="p-6 bg-[#FAFCFD] border border-blue-100 rounded-2xl space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Estimated Yield</div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">
                    +${totalYield.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Projected Portfolio Value</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                    ${finalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <span>Calculated at current USDY Net APY: <strong>5.20%</strong></span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Bank Grade Reserves
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Tools List */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Instant Mint & Redemption</h3>
            <p className="text-xs text-gray-500">
              24/7 instant minting and redemption of tokenized treasuries and stock assets against USDC.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <RefreshCw className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Reserve Attestation Verification</h3>
            <p className="text-xs text-gray-500">
              Real-time daily proof of reserves independently attested by top-tier accounting firms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
