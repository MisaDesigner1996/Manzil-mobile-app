import React from 'react';
import { X } from 'lucide-react';

export interface AppSettings {
  currency: 'USD' | 'AED' | 'SAR';
  paymentReminders: boolean;
  compactView: boolean;
}

interface SettingsSheetProps {
  isOpen: boolean;
  settings: AppSettings;
  onUpdateSettings: (next: AppSettings) => void;
  onClose: () => void;
}

export const SettingsSheet: React.FC<SettingsSheetProps> = ({
  isOpen,
  settings,
  onUpdateSettings,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex items-end justify-center bg-[#1F1738]/45 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-sheet-title"
      onClick={onClose}
    >
      <div
        className="w-full bg-white rounded-t-[28px] shadow-2xl overflow-hidden pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-[#453178]/20" />
        </div>

        <div className="px-5 py-4 border-b border-[#E5E1EE] flex items-center justify-between">
          <h2
            id="settings-sheet-title"
            className="font-display text-lg font-bold text-[#1F1738]"
          >
            Settings
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="min-h-[44px] min-w-[44px] rounded-full bg-[#F6F4FA] text-[#453178] flex items-center justify-center hover:bg-[#EFEBF6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Currency Preference */}
          <div>
            <div className="text-sm font-semibold text-[#1F1738]">
              Portfolio Currency
            </div>
            <p className="text-xs text-[#6E6B7B] mt-0.5">
              Display preference for Payments, Expenses, and listings
            </p>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {(['USD', 'AED', 'SAR'] as const).map((code) => {
                const active = settings.currency === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() =>
                      onUpdateSettings({ ...settings, currency: code })
                    }
                    className={`min-h-[44px] rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#453178] text-white'
                        : 'bg-[#F6F4FA] text-[#453178] hover:bg-[#EFEBF6]'
                    }`}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Reminders Toggle */}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#E5E1EE]">
            <div>
              <div className="text-sm font-semibold text-[#1F1738]">
                Rent &amp; Expense Alerts
              </div>
              <p className="text-xs text-[#6E6B7B] mt-0.5">
                Highlight upcoming tenant rent and vendor invoices
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.paymentReminders}
              onClick={() =>
                onUpdateSettings({
                  ...settings,
                  paymentReminders: !settings.paymentReminders,
                })
              }
              className={`w-12 h-7 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                settings.paymentReminders ? 'bg-[#453178]' : 'bg-[#DCD5EB]'
              }`}
            >
              <span
                className={`block w-6 h-6 rounded-full bg-white shadow transition-transform ${
                  settings.paymentReminders ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Compact Grid Density Toggle */}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#E5E1EE]">
            <div>
              <div className="text-sm font-semibold text-[#1F1738]">
                Compact Dashboard Cards
              </div>
              <p className="text-xs text-[#6E6B7B] mt-0.5">
                Tighter vertical rhythm across mobile dashboard tiles
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.compactView}
              onClick={() =>
                onUpdateSettings({
                  ...settings,
                  compactView: !settings.compactView,
                })
              }
              className={`w-12 h-7 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                settings.compactView ? 'bg-[#453178]' : 'bg-[#DCD5EB]'
              }`}
            >
              <span
                className={`block w-6 h-6 rounded-full bg-white shadow transition-transform ${
                  settings.compactView ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="p-5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[48px] rounded-2xl bg-[#453178] text-white text-sm font-semibold hover:bg-[#33235C] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
