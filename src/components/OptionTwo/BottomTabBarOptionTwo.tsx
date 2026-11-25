import React from 'react';
import { Home, KeyRound, Building2, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { MobileDockTab } from '../MobileBottomDock';

interface BottomTabBarOptionTwoProps {
  activeTab: MobileDockTab;
  onSelectTab: (tab: MobileDockTab) => void;
}

export const BottomTabBarOptionTwo: React.FC<BottomTabBarOptionTwoProps> = ({
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
    <div className="shrink-0 bg-white/95 backdrop-blur-md border-t border-[#E5E1EE] pt-1.5 pb-2 px-3">
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
                className={`min-h-[46px] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
                  isActive ? 'text-[#453178]' : 'text-[#8274A4]'
                }`}
              >
                <Icon
                  className="w-[20px] h-[20px]"
                  strokeWidth={isActive ? 2.25 : 1.75}
                />
                <span
                  className={`text-[10px] leading-none ${
                    isActive ? 'font-bold' : 'font-medium'
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
      <div className="pt-2.5 pb-0.5 flex justify-center" aria-hidden="true">
        <div className="w-[134px] h-[5px] rounded-full bg-[#453178]/25" />
      </div>
    </div>
  );
};
