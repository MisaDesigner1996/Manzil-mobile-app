import React from 'react';
import { X, ChevronRight, SlidersHorizontal, Home, KeyRound, Building2 } from 'lucide-react';
import {
  MANZIL_LOGO_URL,
  MANAGEMENT_CATEGORIES,
  ManagementCategory,
} from '../data/manzilData';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHome: () => void;
  onSelectCategory: (cat: ManagementCategory) => void;
  onOpenListings: (mode: 'rent' | 'buy') => void;
  onOpenSettings: () => void;
  designOption: 'option1' | 'option2' | 'option3' | 'option4' | 'option5';
  onChangeDesignOption: (option: 'option1' | 'option2' | 'option3' | 'option4' | 'option5') => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectHome,
  onSelectCategory,
  onOpenListings,
  onOpenSettings,
  designOption,
  onChangeDesignOption,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex bg-[#1F1738]/45 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Manzil Navigation Menu"
      onClick={onClose}
    >
      <aside
        className="w-[84%] max-w-[330px] bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto pt-6 pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Drawer Header with Original Manzil Logo */}
          <div className="px-5 py-4 border-b border-[#E5E1EE] flex items-center justify-between">
            <img
              src={MANZIL_LOGO_URL}
              alt="Manzil"
              className="h-9 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="min-h-[44px] min-w-[44px] rounded-full bg-[#F6F4FA] text-[#453178] flex items-center justify-center hover:bg-[#EFEBF6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Actions */}
          <div className="p-4 space-y-1.5 border-b border-[#E5E1EE]">
            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectHome();
              }}
              className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#EFEBF6] text-[#453178] font-semibold text-sm flex items-center gap-3 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard Home</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenListings('rent');
              }}
              className="w-full min-h-[46px] px-3.5 rounded-xl text-[#1F1738] hover:bg-[#F6F4FA] font-medium text-sm flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <KeyRound className="w-4 h-4 text-[#453178]" />
                <span>Rent</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#8274A4]" />
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenListings('buy');
              }}
              className="w-full min-h-[46px] px-3.5 rounded-xl text-[#1F1738] hover:bg-[#F6F4FA] font-medium text-sm flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-[#8274A4]" />
                <span>Buy</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#8274A4]" />
            </button>
          </div>

          {/* Property Management Categories */}
          <div className="p-4 border-b border-[#E5E1EE]">
            <div className="px-3.5 pb-2 text-xs font-semibold text-[#6E6B7B]">
              Property Management
            </div>
            <div className="space-y-1">
              {MANAGEMENT_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectCategory(category);
                  }}
                  className="w-full min-h-[44px] px-3.5 rounded-xl text-[#1F1738] hover:bg-[#F6F4FA] font-medium text-sm flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{category.label}</span>
                  <span className="text-xs text-[#6E6B7B] tabular-nums">
                    {category.countLabel}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Design Style Switcher */}
          <div className="p-4">
            <div className="px-1 pb-2 text-xs font-semibold text-[#6E6B7B]">
              UI Design Option
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(
                [
                  { id: 'option1', label: 'Option 1' },
                  { id: 'option2', label: 'Option 2' },
                  { id: 'option3', label: 'Option 3' },
                  { id: 'option4', label: 'Option 4' },
                  { id: 'option5', label: 'Option 5' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onChangeDesignOption(opt.id);
                    onClose();
                  }}
                  className={`min-h-[40px] rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    designOption === opt.id
                      ? 'bg-[#453178] text-white'
                      : 'bg-[#F6F4FA] text-[#453178]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Settings Trigger */}
        <div className="p-4 border-t border-[#E5E1EE]">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#F6F4FA] hover:bg-[#EFEBF6] text-[#1F1738] font-medium text-sm flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4 h-4 text-[#453178]" />
              <span>Settings</span>
            </span>
            <ChevronRight className="w-4 h-4 text-[#8274A4]" />
          </button>
        </div>
      </aside>
    </div>
  );
};
