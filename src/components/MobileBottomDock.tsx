import React from 'react';
import { Home, KeyRound, Building2, LayoutGrid, SlidersHorizontal } from 'lucide-react';

export type MobileDockTab = 'home' | 'rent' | 'buy' | 'manage' | 'settings';

interface MobileBottomDockProps {
  activeTab: MobileDockTab;
  onSelectTab: (tab: MobileDockTab) => void;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
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
    <div className="shrink-0 bg-gradient-to-t from-[#F7F6FA] via-[#F7F6FA]/95 to-transparent pt-1.5 pb-2 px-4">
      <nav aria-label="Primary app navigation">
        <div className="bg-white/95 backdrop-blur-xl rounded-full px-1.5 py-1.5 shadow-[0_10px_28px_-6px_rgba(69,49,120,0.18)] border border-[#E5E1EE] grid grid-cols-5 items-center">
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
                className={`min-h-[44px] rounded-full flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#453178] text-white shadow-sm'
                    : 'text-[#8274A4] active:text-[#453178]'
                }`}
              >
                <Icon
                  className="w-[18px] h-[18px]"
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <span className="text-[10px] font-semibold tracking-tight leading-none">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* iPhone 17 Home Indicator Safe Area */}
      <div className="pt-2.5 pb-0.5 flex justify-center" aria-hidden="true">
        <div className="w-[134px] h-[5px] rounded-full bg-[#453178]/25" />
      </div>
    </div>
  );
};
