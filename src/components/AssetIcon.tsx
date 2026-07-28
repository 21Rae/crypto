import React from 'react';

interface AssetIconProps {
  type: string;
  bg?: string;
  className?: string;
  letter?: string;
}

export const AssetIcon: React.FC<AssetIconProps> = ({ type, bg = 'bg-blue-600', className = 'w-7 h-7', letter }) => {
  // Customized icon representation matching the screenshot
  const normalized = type.toLowerCase();

  if (normalized === 'intel') {
    return (
      <div className={`${className} ${bg} rounded-md flex items-center justify-center text-white font-black text-xs shadow-xs tracking-tighter`}>
        intel
      </div>
    );
  }

  if (normalized === 'direxion') {
    return (
      <div className={`${className} bg-indigo-900 rounded-md flex items-center justify-center text-white font-black text-xs shadow-xs`}>
        <span className="text-[11px] font-bold text-violet-300">X</span>
      </div>
    );
  }

  if (normalized === 'nvidia') {
    return (
      <div className={`${className} bg-lime-500 rounded-md flex items-center justify-center text-black font-extrabold text-[10px] shadow-xs`}>
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
        </svg>
      </div>
    );
  }

  if (normalized === 'nokia') {
    return (
      <div className={`${className} bg-blue-600 rounded-md flex items-center justify-center text-white font-black text-[10px]`}>
        <span className="font-sans font-black tracking-widest text-[9px]">NOK</span>
      </div>
    );
  }

  if (normalized === 'roundhill') {
    return (
      <div className={`${className} bg-purple-900 rounded-md flex items-center justify-center text-white font-bold text-xs`}>
        <span className="text-violet-200 text-[10px] font-black">R</span>
      </div>
    );
  }

  if (normalized === 'spacex') {
    return (
      <div className={`${className} bg-black rounded-md flex items-center justify-center text-white font-bold text-xs`}>
        <span className="font-mono text-xs font-black">X</span>
      </div>
    );
  }

  if (normalized === 'proshares') {
    return (
      <div className={`${className} bg-purple-800 rounded-md flex items-center justify-center text-white font-bold text-xs`}>
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      </div>
    );
  }

  if (normalized === 'plug') {
    return (
      <div className={`${className} bg-sky-500 rounded-md flex items-center justify-center text-white font-bold text-xs`}>
        <span className="text-[10px] font-black">P</span>
      </div>
    );
  }

  if (normalized === 'sofi') {
    return (
      <div className={`${className} bg-teal-500 rounded-md flex items-center justify-center text-white font-bold text-xs`}>
        <span className="text-[9px] font-black">SoFi</span>
      </div>
    );
  }

  if (normalized === 'american') {
    return (
      <div className={`${className} bg-zinc-900 rounded-md flex items-center justify-center text-white font-bold text-xs`}>
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-sky-400">
          <path d="M2.5 19h19L12 4z" />
        </svg>
      </div>
    );
  }

  if (normalized === 'ishares' || normalized === '---') {
    return (
      <div className={`${className} bg-emerald-800 rounded-md flex items-center justify-center text-white font-bold text-xs`}>
        <span className="text-[10px] tracking-tighter font-extrabold text-emerald-200">---</span>
      </div>
    );
  }

  if (normalized === 'apple') {
    return (
      <div className={`${className} bg-black rounded-md flex items-center justify-center text-white font-bold text-xs`}>
        <span className="text-xs font-sans"></span>
      </div>
    );
  }

  if (normalized === 'tesla') {
    return (
      <div className={`${className} bg-red-600 rounded-md flex items-center justify-center text-white font-black text-xs`}>
        <span className="font-serif font-black text-[11px]">T</span>
      </div>
    );
  }

  if (normalized === 'netflix') {
    return (
      <div className={`${className} bg-black rounded-md flex items-center justify-center text-red-600 font-black text-xs`}>
        <span className="font-extrabold text-xs">N</span>
      </div>
    );
  }

  if (normalized === 'pfizer') {
    return (
      <div className={`${className} bg-blue-600 rounded-md flex items-center justify-center text-white font-black text-xs`}>
        <span className="font-bold text-[10px] tracking-tight">Pfe</span>
      </div>
    );
  }

  if (normalized === 'amd') {
    return (
      <div className={`${className} bg-red-600 rounded-md flex items-center justify-center text-white font-black text-xs`}>
        <span className="font-sans font-black text-[9px] tracking-tighter">AMD</span>
      </div>
    );
  }

  if (normalized === 'cocacola' || normalized === 'ko') {
    return (
      <div className={`${className} bg-red-600 rounded-md flex items-center justify-center text-white font-black text-xs`}>
        <span className="font-serif font-black text-[9px] italic">Coca</span>
      </div>
    );
  }

  if (normalized === 'palantir') {
    return (
      <div className={`${className} bg-black rounded-md flex items-center justify-center text-white font-bold text-xs`}>
        <span className="font-mono text-xs font-black">P</span>
      </div>
    );
  }

  if (normalized === 'micron') {
    return (
      <div className={`${className} bg-zinc-900 rounded-md flex items-center justify-center text-white font-black text-xs`}>
        <span className="text-[10px] font-extrabold">M</span>
      </div>
    );
  }

  if (normalized === 'att') {
    return (
      <div className={`${className} bg-sky-500 rounded-md flex items-center justify-center text-white font-black text-xs`}>
        <span className="text-[10px] font-black">AT&T</span>
      </div>
    );
  }

  if (normalized === 'ford') {
    return (
      <div className={`${className} bg-blue-900 rounded-md flex items-center justify-center text-white font-bold text-xs`}>
        <span className="font-serif italic text-[10px] font-black">Ford</span>
      </div>
    );
  }

  if (normalized === 'amazon') {
    return (
      <div className={`${className} bg-amber-500 rounded-md flex items-center justify-center text-black font-black text-xs`}>
        <span className="font-sans font-black text-xs">a</span>
      </div>
    );
  }

  if (normalized === 'snap') {
    return (
      <div className={`${className} bg-yellow-400 rounded-md flex items-center justify-center text-black font-black text-xs`}>
        <span className="text-[11px] font-black">👻</span>
      </div>
    );
  }

  if (normalized === 'servicenow') {
    return (
      <div className={`${className} bg-[#18181B] rounded-md flex items-center justify-center text-emerald-400 font-bold text-xs`}>
        <span className="font-mono text-xs font-black">S</span>
      </div>
    );
  }

  if (normalized === 'spy' || normalized === 'spdr') {
    return (
      <div className={`${className} bg-purple-900 rounded-md flex items-center justify-center text-white font-bold text-xs`}>
        <span className="text-[9px] font-black tracking-tighter">SPDR</span>
      </div>
    );
  }

  if (normalized === 'mara') {
    return (
      <div className={`${className} bg-zinc-900 rounded-md flex items-center justify-center text-white font-bold text-xs`}>
        <span className="text-[10px] font-black">M</span>
      </div>
    );
  }

  if (normalized === 'eth' || normalized === 'ethereum') {
    return (
      <div className={`${className} bg-[#18181B] rounded-md flex items-center justify-center text-white font-bold text-xs`}>
        <span className="text-xs font-black text-purple-400">Ξ</span>
      </div>
    );
  }

  if (normalized === 'grab') {
    return (
      <div className={`${className} bg-emerald-600 rounded-md flex items-center justify-center text-white font-bold text-xs`}>
        <span className="text-[9px] font-extrabold tracking-tight">Grab</span>
      </div>
    );
  }

  // Generic circular / square letter icon fallback
  return (
    <div className={`${className} ${bg} rounded-md flex items-center justify-center text-white font-bold text-xs shadow-xs`}>
      {letter || type.charAt(0).toUpperCase()}
    </div>
  );
};
