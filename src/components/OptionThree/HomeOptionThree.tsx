import React from 'react';
import { Play } from 'lucide-react';
import { CategoryId, ManagementCategory } from '../../data/manzilData';
import {
  BuildingsIllustration,
  ExpensesIllustration,
  HeroArchitectureVector,
  OwnersIllustration,
  PaymentsIllustration,
  TenantsIllustration,
  VendorsIllustration,
} from './ManzilIllustrations';

interface HomeOptionThreeProps {
  categories: ManagementCategory[];
  onSelectCategory: (category: ManagementCategory) => void;
  onOpenRent: () => void;
  onOpenBuy: () => void;
  onOpenTour: () => void;
  compactView: boolean;
}

const CATEGORY_ILLUSTRATIONS: Record<CategoryId, React.ReactNode> = {
  owners: <OwnersIllustration />,
  buildings: <BuildingsIllustration />,
  tenants: <TenantsIllustration />,
  vendors: <VendorsIllustration />,
  payments: <PaymentsIllustration />,
  expenses: <ExpensesIllustration />,
};

export const HomeOptionThree: React.FC<HomeOptionThreeProps> = ({
  categories,
  onSelectCategory,
  onOpenRent,
  onOpenBuy,
  onOpenTour,
  compactView,
}) => {
  return (
    <div className="bg-[#F7F6FA] min-h-full pb-6">
      {/* Hero Section – Property Management (Official Manzil Brand Palette) */}
      <section aria-labelledby="opt3-pm-hero-heading" className="relative">
        <div className="bg-[#453178] rounded-b-[28px] overflow-hidden shadow-[0_16px_34px_-12px_rgba(69,49,120,0.42)]">
          {/* Contemporary Architectural Vector Landscape */}
          <div className="w-full aspect-[400/184] bg-[#FAF9FC]">
            <HeroArchitectureVector />
          </div>

          {/* Rent · Play · Buy Controls & Property Management Heading */}
          <div className="px-5 pt-2.5 pb-7">
            <div className="flex items-center justify-between gap-3.5">
              {/* Secondary Brand Complementary Style */}
              <button
                type="button"
                onClick={onOpenRent}
                className="min-h-[44px] flex-1 max-w-[116px] rounded-xl bg-white text-[#453178] hover:bg-[#EFEBF6] font-display text-[13px] font-bold tracking-wide flex items-center justify-center shadow-sm active:scale-[0.97] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Rent
              </button>

              <button
                type="button"
                onClick={onOpenTour}
                aria-label="Play Property Management overview"
                className="min-h-[48px] min-w-[48px] rounded-full bg-[#8274A4] hover:bg-[#9287AE] text-white ring-4 ring-white/20 shadow-[0_8px_20px_rgba(31,23,56,0.28)] flex items-center justify-center active:scale-95 transition-all cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </button>

              <button
                type="button"
                onClick={onOpenBuy}
                className="min-h-[44px] flex-1 max-w-[116px] rounded-xl bg-[#33235C] hover:bg-[#281B4A] border border-white/25 text-white font-display text-[13px] font-bold tracking-wide flex items-center justify-center active:scale-[0.97] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Buy
              </button>
            </div>

            <h1
              id="opt3-pm-hero-heading"
              className="mt-4 text-center font-display text-[20px] font-semibold tracking-tight text-white"
            >
              Property Management
            </h1>
          </div>
        </div>
      </section>

      {/* Main Dashboard Navigation Cards */}
      <section
        aria-label="Property Management Navigation"
        className="px-5 -mt-4 relative z-10"
      >
        <div
          className={`grid grid-cols-2 ${
            compactView ? 'gap-3' : 'gap-3.5'
          }`}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category)}
              className="group bg-white rounded-[20px] p-3.5 shadow-[0_10px_26px_-10px_rgba(69,49,120,0.10)] border border-[#453178]/[0.08] hover:border-[#453178]/25 active:scale-[0.98] transition-all duration-150 flex flex-col items-center justify-between min-h-[148px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#453178]"
            >
              {/* Custom Editorial Architectural Vector Artwork */}
              <div className="w-full h-[86px] rounded-[14px] bg-[#F6F4FA] flex items-center justify-center p-1.5 overflow-hidden">
                {CATEGORY_ILLUSTRATIONS[category.id]}
              </div>

              {/* Exact Original Card Label */}
              <span className="mt-3 font-display text-[13.5px] font-semibold tracking-[0.04em] text-[#453178] text-center">
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
