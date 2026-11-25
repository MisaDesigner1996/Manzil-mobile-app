import React, { useMemo, useState } from 'react';
import { Search, Play, ArrowUpRight } from 'lucide-react';
import { CategoryId, ManagementCategory } from '../../data/manzilData';
import {
  BuildingsIllustration,
  ExpensesIllustration,
  HeroArchitectureVector,
  OwnersIllustration,
  PaymentsIllustration,
  TenantsIllustration,
  VendorsIllustration,
} from '../OptionThree/ManzilIllustrations';

interface HomeOptionFourProps {
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

export const HomeOptionFour: React.FC<HomeOptionFourProps> = ({
  categories,
  onSelectCategory,
  onOpenRent,
  onOpenBuy,
  onOpenTour,
  compactView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | CategoryId>('all');
  const [activeSlide, setActiveSlide] = useState<0 | 1>(0);

  const visibleCategories = useMemo(() => {
    let list = categories;
    if (activeFilter !== 'all') {
      list = list.filter((c) => c.id === activeFilter);
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (c) =>
          c.label.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q)
      );
    }
    return list;
  }, [categories, activeFilter, searchQuery]);

  return (
    <div className="bg-white min-h-full px-4 pt-1 pb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#8274A4] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Owners, Buildings, Tenants..."
          className="w-full min-h-[44px] pl-10 pr-4 rounded-2xl bg-[#FAF9FC] text-[13.5px] text-[#1F1738] placeholder:text-[#8274A4] border border-[#E5E1EE] focus:border-[#453178] focus:bg-white focus:outline-none transition-colors"
        />
      </div>

      {/* Dual-Card Promo Banner Carousel (colored strictly in Manzil Logo purples) */}
      <div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
          {/* Slide 1: Primary Manzil Property Management Architectural Card (#453178 -> #33235C) */}
          <div
            onClick={() => setActiveSlide(0)}
            className="w-[272px] shrink-0 snap-start rounded-[20px] bg-gradient-to-br from-[#453178] to-[#33235C] p-3.5 text-white shadow-[0_10px_24px_-8px_rgba(69,49,120,0.45)] flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[11px] font-medium text-white/80">
                  Manzil Portfolio
                </div>
                <h1 className="font-display text-[17px] font-bold leading-snug mt-0.5">
                  Property Management
                </h1>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenTour();
                }}
                aria-label="Play Property Management overview"
                className="min-h-[40px] min-w-[40px] rounded-full bg-white text-[#453178] shadow-sm flex items-center justify-center active:scale-95 transition-transform cursor-pointer shrink-0"
              >
                <Play className="w-4 h-4 fill-[#453178] ml-0.5" />
              </button>
            </div>

            <div className="mt-2.5 rounded-[14px] overflow-hidden bg-white/95 aspect-[400/152]">
              <HeroArchitectureVector />
            </div>
          </div>

          {/* Slide 2: Peeking Secondary Card (#8274A4 Manzil Logo Muted Purple) */}
          <button
            type="button"
            onClick={() => {
              setActiveSlide(1);
              onOpenBuy();
            }}
            className="w-[154px] shrink-0 snap-start text-left rounded-[20px] bg-gradient-to-br from-[#8274A4] to-[#453178] p-3.5 text-white shadow-[0_10px_24px_-8px_rgba(69,49,120,0.38)] flex flex-col justify-between cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div>
              <div className="text-[11px] font-medium text-white/85">
                Listings
              </div>
              <div className="font-display text-[16px] font-bold leading-snug mt-0.5">
                Rent &amp; Buy Homes
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-white/90">
                Explore now
              </span>
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </span>
            </div>
          </button>
        </div>

        {/* Carousel Indicator Dots in Manzil Logo Purple */}
        <div className="mt-2.5 flex items-center justify-center gap-1.5" aria-hidden="true">
          <span
            className={`h-1.5 rounded-full transition-all ${
              activeSlide === 0 ? 'w-5 bg-[#453178]' : 'w-1.5 bg-[#E5DFF0]'
            }`}
          />
          <span
            className={`h-1.5 rounded-full transition-all ${
              activeSlide === 1 ? 'w-5 bg-[#453178]' : 'w-1.5 bg-[#E5DFF0]'
            }`}
          />
        </div>
      </div>

      {/* Prominent Manzil Logo-Colored Rent & Buy Pill Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={onOpenRent}
          className="min-h-[48px] rounded-full bg-[#453178] text-white font-display text-[14px] font-semibold shadow-[0_8px_20px_-6px_rgba(69,49,120,0.5)] flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#453178]"
        >
          <span>Rent</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onOpenBuy}
          className="min-h-[48px] rounded-full bg-[#8274A4] text-white font-display text-[14px] font-semibold shadow-[0_8px_20px_-6px_rgba(130,116,164,0.45)] flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8274A4]"
        >
          <span>Buy</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Horizontal Filter Bar (All + Category Tabs styled in Manzil Logo Purple) */}
      <div
        role="tablist"
        aria-label="Filter Property Management modules"
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
          className={`min-h-[36px] px-4 rounded-xl text-[12.5px] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[#453178] text-white shadow-sm'
              : 'bg-white text-[#453178] border border-[#E5E1EE]'
          }`}
        >
          All
        </button>

        {categories.map((cat) => {
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() =>
                setActiveFilter((prev) => (prev === cat.id ? 'all' : cat.id))
              }
              className={`min-h-[36px] px-3.5 rounded-xl text-[12.5px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#453178] text-white shadow-sm'
                  : 'bg-white text-[#6E6B7B] border border-[#E5E1EE]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 3-Column Clean Card Grid (2 balanced rows for all 6 Manzil categories) */}
      <section aria-label="Property Management Categories">
        {visibleCategories.length === 0 ? (
          <div className="rounded-2xl border border-[#E5E1EE] bg-[#FAF9FC] p-6 text-center">
            <p className="text-[13.5px] font-semibold text-[#1F1738]">
              No matching categories
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="mt-2.5 min-h-[38px] px-4 rounded-xl bg-[#453178] text-white text-[12px] font-semibold cursor-pointer"
            >
              Show All
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-3 ${
              compactView ? 'gap-2' : 'gap-2.5'
            }`}
          >
            {visibleCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category)}
                className="group text-left bg-white rounded-[18px] p-2 border border-[#E5E1EE] shadow-[0_6px_18px_-8px_rgba(69,49,120,0.12)] active:scale-[0.97] transition-transform flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#453178]"
              >
                <div className="w-full aspect-[4/3] rounded-[12px] bg-[#F6F4FA] flex items-center justify-center p-1 overflow-hidden">
                  {CATEGORY_ILLUSTRATIONS[category.id]}
                </div>

                <div className="pt-2 pb-0.5 px-0.5">
                  <h2 className="font-display text-[12.5px] font-bold text-[#1F1738] truncate">
                    {category.label}
                  </h2>
                  <p className="text-[10px] text-[#8274A4] font-medium truncate mt-0.5 tabular-nums">
                    {category.countLabel}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
