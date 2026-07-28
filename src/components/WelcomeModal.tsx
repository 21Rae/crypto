import React from 'react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartOnboarding: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  onStartOnboarding,
}) => {
  if (!isOpen) return null;

  // Generate stylized audio spectrum / equalizer vertical lines
  const lineHeights = [
    18, 32, 24, 45, 60, 28, 42, 38, 52, 78, 30, 68, 90, 48, 82, 35, 55, 40,
    70, 88, 62, 45, 75, 50, 65, 30, 58, 42, 60, 35, 48, 28,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row min-h-[380px] relative">
        {/* Left Visual Banner: Soft Blue Gradient with White Box containing Equalizer lines */}
        <div className="w-full md:w-[42%] bg-gradient-to-br from-[#eaf2ff] via-[#dce8ff] to-[#cfe1ff] p-5 flex items-center justify-center relative min-h-[220px] md:min-h-auto">
          <div className="w-full h-full bg-white/90 backdrop-blur-md rounded-2xl border border-white/60 p-4 flex items-end justify-center gap-[3px] shadow-sm overflow-hidden min-h-[240px]">
            {lineHeights.map((h, i) => (
              <div
                key={i}
                className="w-[3px] bg-[#3b82f6]/80 rounded-full transition-all duration-300"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-[58%] p-8 md:p-10 flex flex-col justify-between bg-gradient-to-br from-white to-[#f8faff]">
          <div>
            <h2 className="text-3xl font-medium text-gray-900 tracking-tight mb-4">
              Welcome to Ondo
            </h2>
            <p className="text-xs text-gray-600 font-normal leading-relaxed">
              Gain global access to tokenized assets at any time. To mint and redeem
              assets, complete the onboarding process, which takes approximately 10
              minutes.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-end gap-5">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-gray-900 hover:text-gray-600 transition-colors cursor-pointer"
            >
              Skip for Now
            </button>
            <button
              type="button"
              onClick={() => {
                onStartOnboarding();
                onClose();
              }}
              className="px-4 py-2.5 bg-[#18181B] hover:bg-black text-white text-xs font-medium rounded-lg transition-all shadow-xs cursor-pointer"
            >
              Start Onboarding
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
