import React from 'react';
import { X, ArrowUpRight, Building2, KeyRound, ShieldCheck } from 'lucide-react';
import { HERO_FEATURED_IMAGES } from '../data/manzilData';
import { ResilientImage } from './ResilientImage';

interface TourSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRent: () => void;
  onSelectBuy: () => void;
  onSelectManage: () => void;
}

export const TourSheet: React.FC<TourSheetProps> = ({
  isOpen,
  onClose,
  onSelectRent,
  onSelectBuy,
  onSelectManage,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex items-end justify-center bg-[#1F1738]/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-sheet-title"
      onClick={onClose}
    >
      <div
        className="w-full bg-white rounded-t-[28px] shadow-2xl overflow-hidden pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-[#453178]/20" />
        </div>

        <div className="px-5 py-3 flex items-center justify-between border-b border-[#E5E1EE]">
          <h2
            id="tour-sheet-title"
            className="font-display text-[17px] font-bold text-[#1F1738]"
          >
            Manzil Portfolio Overview
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close overview"
            className="min-h-[44px] min-w-[44px] rounded-full bg-[#F6F4FA] text-[#453178] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="relative aspect-[16/9] rounded-[20px] overflow-hidden bg-[#1F1738]">
            <ResilientImage
              src={HERO_FEATURED_IMAGES.all}
              alt="Manzil featured residential portfolio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1738]/85 via-[#1F1738]/20 to-transparent" />
            <div className="absolute bottom-3.5 left-4 right-4 text-white">
              <div className="text-[11px] font-semibold text-white/80">
                Manzil Property Management
              </div>
              <div className="font-display text-[17px] font-bold leading-snug mt-0.5">
                Unified Rent, Buy &amp; Operations on iOS
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectRent();
              }}
              className="w-full min-h-[54px] px-4 rounded-2xl bg-[#F6F4FA] flex items-center justify-between text-left active:bg-[#EFEBF6] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <KeyRound className="w-4 h-4 text-[#453178]" />
                <div>
                  <div className="text-[14px] font-semibold text-[#1F1738]">
                    Rent Residences
                  </div>
                  <div className="text-[11px] text-[#6E6B7B]">
                    Browse lease-ready apartments &amp; suites
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#453178]" />
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectBuy();
              }}
              className="w-full min-h-[54px] px-4 rounded-2xl bg-[#F6F4FA] flex items-center justify-between text-left active:bg-[#EFEBF6] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-[#8274A4]" />
                <div>
                  <div className="text-[14px] font-semibold text-[#1F1738]">
                    Buy Properties
                  </div>
                  <div className="text-[11px] text-[#6E6B7B]">
                    Explore architectural villas &amp; estates
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#8274A4]" />
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectManage();
              }}
              className="w-full min-h-[54px] px-4 rounded-2xl bg-[#453178] text-white flex items-center justify-between text-left active:bg-[#33235C] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-white" />
                <div>
                  <div className="text-[14px] font-semibold">
                    Open Property Management
                  </div>
                  <div className="text-[11px] text-white/80">
                    Owners, Buildings, Tenants, Vendors, Payments, Expenses
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
