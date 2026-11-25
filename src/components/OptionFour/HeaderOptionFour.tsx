import React from 'react';
import { Menu, SlidersHorizontal } from 'lucide-react';
import { MANZIL_LOGO_URL } from '../../data/manzilData';

interface HeaderOptionFourProps {
  onOpenMenu: () => void;
  onOpenSettings: () => void;
  onScrollHome: () => void;
}

export const HeaderOptionFour: React.FC<HeaderOptionFourProps> = ({
  onOpenMenu,
  onOpenSettings,
  onScrollHome,
}) => {
  return (
    <div className="shrink-0 bg-white">
      {/* iPhone 17 Status Bar Safe Area (44px) */}
      <div
        aria-hidden="true"
        className="h-11 px-6 flex items-center justify-between text-[#1F1738] select-none"
      >
        <span className="font-display text-[13px] font-semibold tracking-tight tabular-nums">
          9:41
        </span>

        <div className="w-[104px] h-[28px] rounded-full bg-[#1F1738]" />

        <div className="flex items-center gap-1.5">
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none" className="text-[#1F1738]">
            <rect x="0" y="7" width="2.8" height="4" rx="0.8" fill="currentColor" />
            <rect x="4.2" y="5" width="2.8" height="6" rx="0.8" fill="currentColor" />
            <rect x="8.4" y="2.5" width="2.8" height="8.5" rx="0.8" fill="currentColor" />
            <rect x="12.6" y="0" width="2.8" height="11" rx="0.8" fill="currentColor" />
          </svg>
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none" className="text-[#1F1738]">
            <path
              d="M7 8.8C7.6 8.8 8.1 9.3 8.1 9.9C8.1 10.5 7.6 11 7 11C6.4 11 5.9 10.5 5.9 9.9C5.9 9.3 6.4 8.8 7 8.8ZM3.6 6.4C5.5 4.7 8.5 4.7 10.4 6.4L9.4 7.5C8 6.3 6 6.3 4.6 7.5L3.6 6.4ZM1.3 4C4.5 1.1 9.5 1.1 12.7 4L11.6 5.1C9 2.7 5 2.7 2.4 5.1L1.3 4Z"
              fill="currentColor"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <div className="w-[22px] h-[11px] rounded-[3.5px] border border-[#1F1738]/45 p-[1.5px] flex items-center">
              <div className="w-full h-full rounded-[1.5px] bg-[#1F1738]" />
            </div>
            <div className="w-[1.5px] h-[4px] rounded-r-full bg-[#1F1738]/45" />
          </div>
        </div>
      </div>

      {/* Header with Manzil Logo & Manzil Logo-Colored Control Buttons */}
      <header className="px-4 pt-1 pb-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="min-h-[42px] min-w-[42px] rounded-full bg-[#EFEBF6] text-[#453178] flex items-center justify-center active:scale-95 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#453178]"
        >
          <Menu className="w-5 h-5" strokeWidth={2} />
        </button>

        <button
          type="button"
          onClick={onScrollHome}
          aria-label="Manzil Home"
          className="min-h-[42px] px-2 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#453178] rounded-xl"
        >
          <img
            src={MANZIL_LOGO_URL}
            alt="Manzil"
            className="h-9 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </button>

        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Open settings"
          className="min-h-[42px] min-w-[42px] rounded-full bg-[#EFEBF6] text-[#453178] flex items-center justify-center active:scale-95 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#453178]"
        >
          <SlidersHorizontal className="w-5 h-5" strokeWidth={2} />
        </button>
      </header>
    </div>
  );
};
