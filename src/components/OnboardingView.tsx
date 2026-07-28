import React, { useState } from 'react';
import { User, Layers, LayoutGrid, ShieldCheck, X, ChevronDown, ChevronRight, ChevronLeft, RotateCcw, Check, Globe, Cpu } from 'lucide-react';

interface OnboardingViewProps {
  userEmail: string;
  onExit: () => void;
  onComplete: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  userEmail,
  onExit,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(2);

  // Extract default names from email if possible
  const emailNamePart = userEmail ? userEmail.split('@')[0] : '';
  const nameParts = emailNamePart.split(/[._-]/);
  const defaultFirstName = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : 'Emmanuel';
  const defaultLastName = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : 'Solomon';

  // Form State
  const [investorType, setInvestorType] = useState<'individual' | 'business'>('individual');
  const [firstName, setFirstName] = useState(defaultFirstName);
  const [lastName, setLastName] = useState(defaultLastName);
  const [country, setCountry] = useState('');
  const [investorProfileOption, setInvestorProfileOption] = useState<string>('');
  const [ondoStocksSelected, setOndoStocksSelected] = useState<boolean>(false);
  const [ousgSelected, setOusgSelected] = useState<boolean>(false);

  // Equalizer vertical line heights for bottom-left graphic
  const lineHeights = [
    20, 35, 28, 50, 65, 30, 45, 40, 58, 85, 32, 70, 95, 52, 88, 38, 60, 42,
    75, 90, 68, 48, 80, 55, 70, 32, 62, 45, 65, 38, 52, 30, 40, 60, 25, 48
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setInvestorProfileOption('');
    setCountry('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col min-h-screen font-sans overflow-y-auto">
      {/* Top Bar Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <span className="font-sans text-xl font-light tracking-tight leading-none">@</span>
          <span className="font-sans text-lg font-semibold tracking-tight text-gray-900">
            Ondo Finance Onboarding
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-gray-800">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 hover:text-black hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <span>Reset</span>
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-1.5 hover:text-black hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <span>Exit</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 md:p-8 gap-8 items-start">
        {/* Left Sidebar Steps Card */}
        <div className="w-full md:w-80 bg-[#e0edff] rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[580px] relative overflow-hidden flex-shrink-0 border border-blue-100 shadow-2xs">
          <div>
            {/* Step 1: Basic Information */}
            <div
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-3.5 mb-6 cursor-pointer group"
            >
              {currentStep > 1 ? (
                <div className="w-7 h-7 rounded-full bg-[#1e40af] text-white flex items-center justify-center">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
              ) : (
                <div className={`p-2 rounded-lg ${currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-blue-100/60 text-gray-600'}`}>
                  <User className="w-4 h-4" />
                </div>
              )}
              <span className={`text-sm ${currentStep === 1 ? 'text-gray-900 font-bold' : currentStep > 1 ? 'text-gray-900 font-semibold' : 'text-gray-500 font-medium'}`}>
                Basic Information
              </span>
            </div>

            {/* Step 2: Investor Profile */}
            <div
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-3.5 mb-6 cursor-pointer group"
            >
              {currentStep > 2 ? (
                <div className="w-7 h-7 rounded-full bg-[#1e40af] text-white flex items-center justify-center">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
              ) : (
                <div className={`p-2 rounded-lg ${currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-blue-100/40 text-gray-500'}`}>
                  <Layers className="w-4 h-4" />
                </div>
              )}
              <span className={`text-sm ${currentStep === 2 ? 'text-gray-900 font-bold' : currentStep > 2 ? 'text-gray-900 font-semibold' : 'text-gray-500 font-medium'}`}>
                Investor Profile
              </span>
            </div>

            {/* Step 3: Qualified Products */}
            <div
              onClick={() => setCurrentStep(3)}
              className="flex items-center gap-3.5 mb-6 cursor-pointer group"
            >
              {currentStep > 3 ? (
                <div className="w-7 h-7 rounded-full bg-[#1e40af] text-white flex items-center justify-center">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
              ) : (
                <div className={`p-2 rounded-lg ${currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-blue-100/40 text-gray-400'}`}>
                  <LayoutGrid className="w-4 h-4" />
                </div>
              )}
              <span className={`text-sm ${currentStep === 3 ? 'text-gray-900 font-bold' : 'text-gray-400 font-medium'}`}>
                Qualified Products
              </span>
            </div>

            {/* Step 4: Identity Verification */}
            <div
              onClick={() => setCurrentStep(4)}
              className="flex items-center gap-3.5 mb-8 cursor-pointer group"
            >
              <div className={`p-2 rounded-lg ${currentStep === 4 ? 'bg-blue-600 text-white' : 'bg-blue-100/40 text-gray-400'}`}>
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className={`text-sm ${currentStep === 4 ? 'text-gray-900 font-bold' : 'text-gray-400 font-medium'}`}>
                Identity Verification
              </span>
            </div>

            <p className="text-[11px] text-gray-500 font-normal">
              For questions, email{' '}
              <a href="mailto:support@ondo.finance" className="underline hover:text-gray-800">
                support@ondo.finance
              </a>
            </p>
          </div>

          {/* Bottom Equalizer Graphic */}
          <div className="absolute bottom-0 left-0 right-0 h-44 px-4 flex items-end justify-center gap-[3.5px] pointer-events-none opacity-80">
            {lineHeights.map((h, i) => (
              <div
                key={i}
                className="w-[2.5px] bg-[#3b82f6]/70 rounded-full"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Right Form Card */}
        <div className="flex-1 w-full max-w-xl mx-auto my-auto py-2">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-2xs">
            {currentStep === 1 && (
              <div>
                <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight mb-2">
                  Basic Information
                </h1>
                <p className="text-xs text-gray-500 font-normal leading-relaxed mb-6">
                  By law, we need to collect specific information to provide our products and services.
                </p>

                <div className="space-y-5">
                  {/* Investor Type Radio Group */}
                  <div>
                    <label className="block text-xs font-normal text-gray-500 mb-2">
                      Investor Type
                    </label>
                    <div className="bg-[#F2F2F2] rounded-2xl p-2 space-y-1.5 border border-transparent">
                      <label
                        className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-colors ${
                          investorType === 'individual' ? 'bg-[#EAEAEA] font-semibold text-gray-900' : 'text-gray-700 hover:bg-[#E5E5E5]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="investorType"
                          checked={investorType === 'individual'}
                          onChange={() => setInvestorType('individual')}
                          className="w-4 h-4 text-black focus:ring-0 cursor-pointer accent-black"
                        />
                        <span className="text-sm font-medium">I am an individual investor</span>
                      </label>

                      <label
                        className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-colors ${
                          investorType === 'business' ? 'bg-[#EAEAEA] font-semibold text-gray-900' : 'text-gray-700 hover:bg-[#E5E5E5]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="investorType"
                          checked={investorType === 'business'}
                          onChange={() => setInvestorType('business')}
                          className="w-4 h-4 text-black focus:ring-0 cursor-pointer accent-black"
                        />
                        <span className="text-sm font-medium">I represent a business</span>
                      </label>
                    </div>
                  </div>

                  {/* Legal First Name */}
                  <div>
                    <label className="block text-xs font-normal text-gray-500 mb-1">
                      Legal First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#F2F2F2] border border-transparent rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:border-gray-300"
                    />
                  </div>

                  {/* Legal Last Name */}
                  <div>
                    <label className="block text-xs font-normal text-gray-500 mb-1">
                      Legal Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-[#F2F2F2] border border-transparent rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:border-gray-300"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-normal text-gray-500 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      readOnly
                      value={userEmail || 'emmanuelsolomon325@gmail.com'}
                      className="w-full bg-[#F2F2F2] border border-transparent rounded-xl px-4 py-3 text-sm font-medium text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  {/* Location of Residence */}
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <label className="block text-xs font-normal text-gray-500">
                        Location of Residence
                      </label>
                      <span className="w-3.5 h-3.5 rounded-full bg-gray-200 text-gray-500 text-[9px] font-bold flex items-center justify-center cursor-help">
                        ?
                      </span>
                    </div>

                    <div className="relative">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-[#F2F2F2] border border-transparent rounded-xl px-4 py-3 text-sm font-medium text-gray-700 appearance-none focus:outline-none focus:bg-white focus:border-gray-300 cursor-pointer"
                      >
                        <option value="">Select a country</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="DE">Germany</option>
                        <option value="CH">Switzerland</option>
                        <option value="SG">Singapore</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="OTHER">Other Country</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Continue Action */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-3.5 bg-[#1C1C1E] hover:bg-black text-white text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight mb-2">
                  Investor Profile
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mb-6">
                  We'll ask a few quick questions to ensure you qualify under local regulations.
                </p>

                <div className="space-y-4">
                  <label className="block text-xs font-normal text-gray-500">
                    Select one that fits you.
                  </label>

                  <div className="bg-[#F2F2F2] rounded-2xl p-2.5 space-y-2 border border-transparent">
                    {/* Option 1 */}
                    <label
                      className={`flex items-start gap-3.5 p-3.5 rounded-xl cursor-pointer transition-colors ${
                        investorProfileOption === 'networth'
                          ? 'bg-[#EAEAEA] text-gray-900 font-semibold'
                          : 'text-gray-800 hover:bg-[#E5E5E5]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="investorProfileOption"
                        value="networth"
                        checked={investorProfileOption === 'networth'}
                        onChange={(e) => setInvestorProfileOption(e.target.value)}
                        className="w-4 h-4 mt-0.5 text-black focus:ring-0 cursor-pointer accent-black flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm font-medium leading-snug">
                        My net worth exceeds USD $1,000,000 (excluding my primary residence)
                      </span>
                    </label>

                    {/* Option 2 */}
                    <label
                      className={`flex items-start gap-3.5 p-3.5 rounded-xl cursor-pointer transition-colors ${
                        investorProfileOption === 'income'
                          ? 'bg-[#EAEAEA] text-gray-900 font-semibold'
                          : 'text-gray-800 hover:bg-[#E5E5E5]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="investorProfileOption"
                        value="income"
                        checked={investorProfileOption === 'income'}
                        onChange={(e) => setInvestorProfileOption(e.target.value)}
                        className="w-4 h-4 mt-0.5 text-black focus:ring-0 cursor-pointer accent-black flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">
                        My income exceeds USD $200,000 individually (or USD $300,000 jointly) for the past two years, and I expect the same this year.
                      </span>
                    </label>

                    {/* Option 3 */}
                    <label
                      className={`flex items-start gap-3.5 p-3.5 rounded-xl cursor-pointer transition-colors ${
                        investorProfileOption === 'license'
                          ? 'bg-[#EAEAEA] text-gray-900 font-semibold'
                          : 'text-gray-800 hover:bg-[#E5E5E5]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="investorProfileOption"
                        value="license"
                        checked={investorProfileOption === 'license'}
                        onChange={(e) => setInvestorProfileOption(e.target.value)}
                        className="w-4 h-4 mt-0.5 text-black focus:ring-0 cursor-pointer accent-black flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm font-medium leading-snug">
                        I hold a qualifying financial license (Series 7, 65, or 82).
                      </span>
                    </label>

                    {/* Option 4 */}
                    <label
                      className={`flex items-start gap-3.5 p-3.5 rounded-xl cursor-pointer transition-colors ${
                        investorProfileOption === 'none'
                          ? 'bg-[#EAEAEA] text-gray-900 font-semibold'
                          : 'text-gray-800 hover:bg-[#E5E5E5]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="investorProfileOption"
                        value="none"
                        checked={investorProfileOption === 'none'}
                        onChange={(e) => setInvestorProfileOption(e.target.value)}
                        className="w-4 h-4 mt-0.5 text-black focus:ring-0 cursor-pointer accent-black flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm font-medium leading-snug">
                        I do not meet these criteria.
                      </span>
                    </label>
                  </div>

                  <div className="pt-6 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="p-3.5 bg-[#EAEAEA] text-gray-800 hover:bg-gray-300 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
                      aria-label="Back"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!investorProfileOption}
                      className={`flex-1 py-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1 ${
                        investorProfileOption
                          ? 'bg-[#1C1C1E] hover:bg-black text-white cursor-pointer shadow-xs'
                          : 'bg-[#2A2A2D] text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight mb-2">
                  Qualified Products
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mb-6">
                  Based on your information, here are the products you qualify for.
                </p>

                <div className="space-y-4">
                  {/* Product 1: Ondo Stocks */}
                  <div
                    onClick={() => setOndoStocksSelected(!ondoStocksSelected)}
                    className="bg-[#EEEEEE] hover:bg-[#E8E8E8] transition-colors rounded-2xl p-5 cursor-pointer relative"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#393939] text-white flex items-center justify-center shadow-xs">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${
                          ondoStocksSelected
                            ? 'bg-black border-black text-white'
                            : 'bg-white border-gray-400'
                        }`}
                      >
                        {ondoStocksSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5">
                      Ondo Stocks
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed mb-3.5">
                      Bring traditional public securities like stocks and ETFs onchain, with tokens that are freely transferable and usable in DeFi.
                    </p>

                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-800">
                      <span className="w-4 h-4 rounded-full bg-[#1b2b48] text-white flex items-center justify-center text-[9px] font-light">
                        @
                      </span>
                      <span>Ondo Stocks users will automatically qualify for USDY.</span>
                    </div>
                  </div>

                  {/* Product 2: OUSG */}
                  <div
                    onClick={() => setOusgSelected(!ousgSelected)}
                    className="bg-[#EEF3EC] hover:bg-[#E7EFE5] transition-colors rounded-2xl p-5 cursor-pointer relative"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#465345] text-white flex items-center justify-center shadow-xs">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${
                          ousgSelected
                            ? 'bg-black border-black text-white'
                            : 'bg-white border-gray-400'
                        }`}
                      >
                        {ousgSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        OUSG
                      </h3>
                      <span className="bg-[#D3E5D3] text-[#1E521E] text-[10px] font-semibold px-2 py-0.5 rounded-md">
                        Accredited Investor Only
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      Built for institutional investors, OUSG offers exposure to short-term US Treasuries with 24/7 instant mints and redemptions.
                    </p>
                  </div>

                  {/* Navigation Action Buttons */}
                  <div className="pt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="p-3.5 bg-[#EAEAEA] text-gray-800 hover:bg-gray-300 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
                      aria-label="Back"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 py-3.5 bg-[#1C1C1E] hover:bg-black text-white text-sm font-medium rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight mb-2">
                  Identity Verification
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mb-6">
                  Our KYC, powered by Persona, protects you from fraud and identity theft while ensuring regulatory compliance. Please prepare the following items before starting KYC.
                </p>

                {/* Persona Prep Box */}
                <div className="border border-gray-200 rounded-2xl p-6 bg-white space-y-5 mb-6">
                  {/* Persona Logo Badge */}
                  <div className="flex justify-center mb-2">
                    <div className="w-11 h-11 bg-[#7C65F8] text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-xs">
                      *
                    </div>
                  </div>

                  {/* Checklist items */}
                  <div className="space-y-4">
                    {/* Item 1 */}
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded border border-gray-400 bg-white mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">
                          Photo ID
                        </div>
                        <div className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                          ID card, passport, driver license supported.
                        </div>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded border border-gray-400 bg-white mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">
                          Proof of Address
                        </div>
                        <div className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                          Documents that can prove the address, such as utility bills, etc.
                        </div>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded border border-gray-400 bg-white mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">
                          Facial Recognition
                        </div>
                        <div className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                          Confirm that the portrait matches the picture on the identification document.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer note */}
                  <p className="text-[11px] sm:text-xs text-gray-500 pt-2 leading-relaxed border-t border-gray-100">
                    Ondo uses Persona, a secure, leading identity verification solution, to help us verify your identity. The process will take around 5 minutes.
                  </p>
                </div>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="p-3.5 bg-[#EAEAEA] text-gray-800 hover:bg-gray-300 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
                    aria-label="Back"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={onComplete}
                    className="flex-1 py-3.5 bg-[#1C1C1E] hover:bg-black text-white text-sm font-medium rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1"
                  >
                    <span>Start KYC</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

