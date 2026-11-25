import React from 'react';
import { Home, KeyRound, Building2, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { MobileDockTab } from '../MobileBottomDock';

interface BottomBarOptionThreeProps {
  activeTab: MobileDockTab;
  onSelectTab: (tab: MobileDockTab) => void;
}

export const BottomBarOptionThree: React.FC<BottomBarOptionThreeProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const items: {
    id: MobileDockTab;
    label: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'rent', label: 'Rent', icon: KeyRound },
    { id: 'buy', label: 'Buy', icon: Building2 },
    { id: 'manage', label: 'Manage', icon: LayoutGrid },
    { id: 'settings', label: 'Settings', icon: SlidersHorizontal },
  ];

  return (
    <div className="shrink-0 bg-white border-t border-[#453178]/10 pt-2 pb-2 px-4 shadow-[0_-8px_24px_-12px_rgba(69,49,120,0.12)]">
      <nav aria-label="Primary app navigation">
        <div className="grid grid-cols-5 items-center">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                className="min-h-[46px] flex flex-col items-center justify-center gap-1 cursor-pointer group"
              >
                <span
                  className={`w-10 h-8 rounded-xl flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-[#453178] text-white shadow-[0_4px_12px_-3px_rgba(69,49,120,0.45)]'
                      : 'text-[#8274A4] group-hover:text-[#453178] group-active:bg-[#F6F4FA]'
                  }`}
                >
                  <Icon
                    className="w-[18px] h-[18px]"
                    strokeWidth={isActive ? 2.1 : 1.75}
                  />
                </span>
                <span
                  className={`text-[10px] leading-none transition-colors ${
                    isActive ? 'font-bold text-[#453178]' : 'font-medium text-[#6E6B7B]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* iPhone 17 Home Indicator Safe Area */}
      <div className="pt-2 pb-0.5 flex justify-center" aria-hidden="true">
        <div className="w-[134px] h-[5px] rounded-full bg-[#453178]/20" />
      </div>
    </div>
  );
};
