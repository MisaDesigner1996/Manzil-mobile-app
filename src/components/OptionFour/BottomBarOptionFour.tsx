import React from 'react';
import { Home, KeyRound, LayoutGrid, Building2, SlidersHorizontal } from 'lucide-react';
import { MobileDockTab } from '../MobileBottomDock';

interface BottomBarOptionFourProps {
  activeTab: MobileDockTab;
  onSelectTab: (tab: MobileDockTab) => void;
}

export const BottomBarOptionFour: React.FC<BottomBarOptionFourProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <div className="shrink-0 bg-white border-t border-[#E5E1EE] pt-1.5 pb-2 px-3 shadow-[0_-8px_24px_-12px_rgba(69,49,120,0.12)]">
      <nav aria-label="Primary app navigation">
        <div className="grid grid-cols-5 items-end">
          {/* Home */}
          <button
            type="button"
            onClick={() => onSelectTab('home')}
            aria-label="Home"
            aria-current={activeTab === 'home' ? 'page' : undefined}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors ${
              activeTab === 'home' ? 'text-[#453178]' : 'text-[#8274A4]'
            }`}
          >
            <Home className="w-[19px] h-[19px]" strokeWidth={activeTab === 'home' ? 2.25 : 1.75} />
            <span className={`text-[10px] leading-none ${activeTab === 'home' ? 'font-bold' : 'font-medium'}`}>
              Home
            </span>
          </button>

          {/* Rent */}
          <button
            type="button"
            onClick={() => onSelectTab('rent')}
            aria-label="Rent"
            aria-current={activeTab === 'rent' ? 'page' : undefined}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors ${
              activeTab === 'rent' ? 'text-[#453178]' : 'text-[#8274A4]'
            }`}
          >
            <KeyRound className="w-[19px] h-[19px]" strokeWidth={activeTab === 'rent' ? 2.25 : 1.75} />
            <span className={`text-[10px] leading-none ${activeTab === 'rent' ? 'font-bold' : 'font-medium'}`}>
              Rent
            </span>
          </button>

          {/* Center Elevated Floating Action Button in Manzil Logo Purple */}
          <div className="flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => onSelectTab('manage')}
              aria-label="Manage"
              aria-current={activeTab === 'manage' ? 'page' : undefined}
              className="-mt-6 w-[52px] h-[52px] rounded-full bg-[#453178] text-white ring-4 ring-white shadow-[0_8px_20px_-4px_rgba(69,49,120,0.55)] flex items-center justify-center active:scale-95 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#453178]"
            >
              <LayoutGrid className="w-5 h-5" strokeWidth={2.1} />
            </button>
          </div>

          {/* Buy */}
          <button
            type="button"
            onClick={() => onSelectTab('buy')}
            aria-label="Buy"
            aria-current={activeTab === 'buy' ? 'page' : undefined}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors ${
              activeTab === 'buy' ? 'text-[#453178]' : 'text-[#8274A4]'
            }`}
          >
            <Building2 className="w-[19px] h-[19px]" strokeWidth={activeTab === 'buy' ? 2.25 : 1.75} />
            <span className={`text-[10px] leading-none ${activeTab === 'buy' ? 'font-bold' : 'font-medium'}`}>
              Buy
            </span>
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => onSelectTab('settings')}
            aria-label="Settings"
            aria-current={activeTab === 'settings' ? 'page' : undefined}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors ${
              activeTab === 'settings' ? 'text-[#453178]' : 'text-[#8274A4]'
            }`}
          >
            <SlidersHorizontal className="w-[19px] h-[19px]" strokeWidth={activeTab === 'settings' ? 2.25 : 1.75} />
            <span className={`text-[10px] leading-none ${activeTab === 'settings' ? 'font-bold' : 'font-medium'}`}>
              Settings
            </span>
          </button>
        </div>
      </nav>

      {/* iPhone 17 Home Indicator Safe Area */}
      <div className="pt-2 pb-0.5 flex justify-center" aria-hidden="true">
        <div className="w-[134px] h-[5px] rounded-full bg-[#453178]/25" />
      </div>
    </div>
  );
};
