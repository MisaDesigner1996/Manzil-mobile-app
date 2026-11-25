import React from 'react';
import { AppSettings } from '../SettingsSheet';

export type DesignOption = 'option1' | 'option2' | 'option3' | 'option4' | 'option5';

interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (next: AppSettings) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
}) => {
  return (
    <div className="px-5 pt-2 pb-6 space-y-5">
      <div>
        <h1 className="font-display text-[24px] font-bold tracking-tight text-[#1F1738]">
          Settings
        </h1>
        <p className="text-[13px] text-[#6E6B7B] mt-0.5">
          Manzil portfolio preferences
        </p>
      </div>

      {/* Grouped Section 1: Currency */}
      <div className="bg-white rounded-[24px] p-4 shadow-[0_6px_20px_-6px_rgba(69,49,120,0.08)] border border-[#E5E1EE]">
        <div className="text-[14px] font-semibold text-[#1F1738]">
          Portfolio Currency
        </div>
        <p className="text-[12px] text-[#6E6B7B] mt-0.5">
          Applied to Payments, Expenses, and listing rates
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
                className={`min-h-[44px] rounded-2xl text-[13px] font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#453178] text-white'
                    : 'bg-[#F6F4FA] text-[#453178]'
                }`}
              >
                {code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grouped Section 2: Toggles */}
      <div className="bg-white rounded-[24px] divide-y divide-[#E5E1EE] shadow-[0_6px_20px_-6px_rgba(69,49,120,0.08)] border border-[#E5E1EE] overflow-hidden">
        <div className="p-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-[14px] font-semibold text-[#1F1738]">
              Rent &amp; Expense Alerts
            </div>
            <p className="text-[12px] text-[#6E6B7B] mt-0.5">
              Surface upcoming due payments on Home
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

        <div className="p-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-[14px] font-semibold text-[#1F1738]">
              Compact Dashboard Tiles
            </div>
            <p className="text-[12px] text-[#6E6B7B] mt-0.5">
              Tighter spacing across the grid
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

      {/* App Info Card */}
      <div className="bg-white rounded-[24px] p-4 shadow-[0_6px_20px_-6px_rgba(69,49,120,0.08)] border border-[#E5E1EE] flex items-center justify-between">
        <div>
          <div className="text-[14px] font-semibold text-[#1F1738]">
            Manzil Mobile App
          </div>
          <div className="text-[12px] text-[#6E6B7B] mt-0.5">
            iPhone 17 Optimized Experience
          </div>
        </div>
        <span className="text-[12px] font-semibold text-[#453178]">
          Active
        </span>
      </div>
    </div>
  );
};
