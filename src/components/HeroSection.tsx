import React from 'react';
import { Play, ArrowUpRight, MapPin } from 'lucide-react';
import {
  HERO_FEATURED_IMAGES,
  MarketIntent,
  PROPERTY_LISTINGS,
  PropertyListing,
} from '../data/manzilData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  activeIntent: MarketIntent;
  onSelectIntent: (intent: MarketIntent) => void;
  onOpenListings: (intent: 'rent' | 'buy', listing?: PropertyListing) => void;
  onOpenTour: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeIntent,
  onSelectIntent,
  onOpenListings,
  onOpenTour,
}) => {
  const featuredListing =
    activeIntent === 'rent'
      ? PROPERTY_LISTINGS[0]
      : activeIntent === 'buy'
        ? PROPERTY_LISTINGS[1]
        : PROPERTY_LISTINGS[2];

  const heroImage =
    activeIntent === 'rent'
      ? HERO_FEATURED_IMAGES.rent
      : activeIntent === 'buy'
        ? HERO_FEATURED_IMAGES.buy
        : HERO_FEATURED_IMAGES.all;

  const filterChips: {
    id: MarketIntent;
    label: string;
    thumb?: string;
  }[] = [
    { id: 'all', label: 'All' },
    { id: 'rent', label: 'Rent', thumb: HERO_FEATURED_IMAGES.rent },
    { id: 'buy', label: 'Buy', thumb: HERO_FEATURED_IMAGES.buy },
  ];

  return (
    <section
      id="hero-showcase"
      className="px-5 pt-0.5 pb-4 bg-gradient-to-b from-[#EFEBF6] via-[#F6F4FA] to-[#F7F6FA]"
    >
      {/* Compact Native App Selector Row */}
      <div
        role="tablist"
        aria-label="Property intent filter"
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
      >
        {filterChips.map((chip) => {
          const isActive = activeIntent === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectIntent(chip.id)}
              className={`min-h-[42px] inline-flex items-center gap-2 rounded-full text-[13px] font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#453178] ${
                chip.thumb ? 'pl-1.5 pr-4 py-1' : 'px-4.5 py-1.5'
              } ${
                isActive
                  ? 'bg-[#453178] text-white shadow-[0_6px_16px_-4px_rgba(69,49,120,0.38)]'
                  : 'bg-white text-[#1F1738] border border-[#E5E1EE] shadow-[0_2px_8px_rgba(69,49,120,0.05)] active:scale-95'
              }`}
            >
              {chip.thumb && (
                <span className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#E5E1EE]">
                  <ResilientImage
                    src={chip.thumb}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </span>
              )}
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Unified Featured Property Hero Card with Rent & Buy Actions */}
      <div className="mt-3 bg-white rounded-[26px] p-2.5 shadow-[0_10px_28px_-10px_rgba(69,49,120,0.12)] border border-[#E5E1EE]">
        <div className="relative rounded-[20px] overflow-hidden aspect-[16/10]">
          <ResilientImage
            src={heroImage}
            alt={featuredListing.title}
            fallbackLabel={featuredListing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1738]/85 via-[#1F1738]/20 to-transparent pointer-events-none" />

          {/* Top Row: Listing Highlight & Play Tour Trigger */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onOpenListings(featuredListing.intent, featuredListing)}
              className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-semibold text-[#1F1738] shadow-sm active:scale-95 transition-transform cursor-pointer"
            >
              {featuredListing.intent === 'rent' ? 'For Rent' : 'For Sale'} ·{' '}
              {featuredListing.highlight}
            </button>

            <button
              type="button"
              onClick={onOpenTour}
              aria-label="Play Property Management overview"
              className="min-h-[44px] min-w-[44px] rounded-full bg-white/95 backdrop-blur-md text-[#453178] shadow-sm flex items-center justify-center active:scale-95 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Play className="w-4 h-4 fill-[#453178] ml-0.5" />
            </button>
          </div>

          {/* Bottom Property Overlay */}
          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between gap-2 text-white">
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-[11px] text-white/85 font-medium">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{featuredListing.location}</span>
              </div>
              <h1 className="font-display text-[17px] font-bold tracking-tight truncate mt-0.5">
                {featuredListing.title}
              </h1>
            </div>
            <div className="text-right shrink-0">
              <div className="font-display text-[16px] font-bold tabular-nums leading-tight">
                {featuredListing.priceLabel}
              </div>
              <div className="text-[10px] text-white/80">
                {featuredListing.cadence}
              </div>
            </div>
          </div>
        </div>

        {/* Clean Unboxed Specs + Prominent Rent & Buy Touch Actions */}
        <div className="pt-2.5 px-1 flex items-center justify-between gap-2 text-[12px] text-[#6E6B7B] font-medium tabular-nums">
          <span>
            {featuredListing.beds} Beds · {featuredListing.baths} Baths ·{' '}
            {featuredListing.areaSqFt.toLocaleString()} sq ft
          </span>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenListings('rent')}
            className="min-h-[46px] px-4 rounded-[16px] bg-[#EFEBF6] text-[#453178] font-display text-[14px] font-bold flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#453178]"
          >
            <span>Rent</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onOpenListings('buy')}
            className="min-h-[46px] px-4 rounded-[16px] bg-[#453178] text-white font-display text-[14px] font-bold flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#453178]"
          >
            <span>Buy</span>
            <ArrowUpRight className="w-4 h-4 text-[#EFEBF6]" />
          </button>
        </div>
      </div>
    </section>
  );
};
