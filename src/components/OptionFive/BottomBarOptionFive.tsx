import React from 'react';
import { Home, KeyRound, Building2, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { MobileDockTab } from '../MobileBottomDock';

interface BottomBarOptionFiveProps {
  activeTab: MobileDockTab;
  onSelectTab: (tab: MobileDockTab) => void;
}

export const BottomBarOptionFive: React.FC<BottomBarOptionFiveProps> = ({
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
    <div className="shrink-0 bg-white/95 backdrop-blur-md border-t border-[#E5E1EE] pt-2 pb-2 px-5 shadow-[0_-8px_24px_-12px_rgba(69,49,120,0.12)]">
      <nav aria-label="Primary app navigation">
        <div className="flex items-center justify-between">
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
                className="min-h-[44px] min-w-[48px] flex items-center justify-center cursor-pointer"
              >
                <span
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-[#453178] text-white shadow-[0_6px_14px_-4px_rgba(69,49,120,0.45)]'
                      : 'text-[#8274A4] active:bg-[#F6F4FA]'
                  }`}
                >
                  <Icon
                    className="w-[19px] h-[19px]"
                    strokeWidth={isActive ? 2.1 : 1.75}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* iPhone 17 Home Indicator Safe Area */}
      <div className="pt-2 pb-0.5 flex justify-center" aria-hidden="true">
        <div className="w-[134px] h-[5px] rounded-full bg-[#453178]/25" />
      </div>
    </div>
  );
};
