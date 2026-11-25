import React, { useMemo, useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Play,
  MapPin,
  ChevronRight,
  Tag,
} from 'lucide-react';
import {
  HERO_FEATURED_IMAGES,
  ManagementCategory,
  MarketIntent,
  PROPERTY_LISTINGS,
  PropertyListing,
} from '../../data/manzilData';
import { ResilientImage } from '../ResilientImage';

interface HomeOptionTwoProps {
  activeIntent: MarketIntent;
  onSelectIntent: (intent: MarketIntent) => void;
  categories: ManagementCategory[];
  onSelectCategory: (category: ManagementCategory) => void;
  onOpenListings: (intent: 'rent' | 'buy', listing?: PropertyListing) => void;
  onOpenManageDirectory: () => void;
  onOpenTour: () => void;
  onOpenSettings: () => void;
  compactView: boolean;
}

export const HomeOptionTwo: React.FC<HomeOptionTwoProps> = ({
  activeIntent,
  onSelectIntent,
  categories,
  onSelectCategory,
  onOpenListings,
  onOpenManageDirectory,
  onOpenTour,
  onOpenSettings,
  compactView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (cat) =>
        cat.label.toLowerCase().includes(q) ||
        cat.summary.toLowerCase().includes(q)
    );
  }, [categories, searchQuery]);

  const filteredListings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return PROPERTY_LISTINGS;
    return PROPERTY_LISTINGS.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.intent.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="bg-[#FAF9FC] min-h-full px-5 pt-3.5 pb-6 space-y-5">
      {/* Search Bar with Integrated Filter Control */}
      <div className="flex items-center gap-2 bg-white rounded-2xl border border-[#E5E1EE] p-1.5 shadow-[0_2px_10px_rgba(69,49,120,0.05)]">
        <div className="relative flex-1 flex items-center">
          <Search className="w-4 h-4 text-[#8274A4] ml-2.5 shrink-0 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search properties, owners, tenants..."
            className="w-full min-h-[40px] px-2.5 text-[14px] text-[#1F1738] placeholder:text-[#8274A4] bg-transparent focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Filter and preferences"
          className="min-h-[40px] min-w-[40px] rounded-xl bg-[#EFEBF6] text-[#453178] flex items-center justify-center active:bg-[#E5DFF0] transition-colors cursor-pointer shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" strokeWidth={1.9} />
        </button>
      </div>

      {/* Crisp Rectangular-Rounded Filter Bar */}
      <div
        role="tablist"
        aria-label="Property and module filters"
        className="flex items-center gap-2 overflow-x-auto no-scrollbar"
      >
        {(
          [
            { id: 'all', label: 'All' },
            { id: 'rent', label: 'Rent' },
            { id: 'buy', label: 'Buy' },
          ] as { id: MarketIntent; label: string }[]
        ).map((item) => {
          const active = activeIntent === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelectIntent(item.id)}
              className={`min-h-[38px] px-4 rounded-lg text-[13px] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                active
                  ? 'bg-[#453178] text-white'
                  : 'bg-[#EFEBF6] text-[#453178] active:bg-[#E5DFF0]'
              }`}
            >
              {item.label}
            </button>
          );
        })}

        {categories.slice(0, 3).map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className="min-h-[38px] px-3.5 rounded-lg bg-[#F6F4FA] text-[#6E6B7B] text-[13px] font-medium whitespace-nowrap shrink-0 active:bg-[#EFEBF6] transition-colors cursor-pointer"
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Section 1: Featured Property Hero Card (Clean White Card Anatomy below Photo) */}
      {!searchQuery.trim() && (
        <section aria-labelledby="opt2-featured-heading">
          <div className="flex items-center justify-between mb-2.5">
            <h1
              id="opt2-featured-heading"
              className="font-display text-[17px] font-bold text-[#1F1738] tracking-tight"
            >
              Featured Properties
            </h1>
            <button
              type="button"
              onClick={() =>
                onOpenListings(activeIntent === 'buy' ? 'buy' : 'rent')
              }
              className="min-h-[36px] px-1 text-[13px] font-semibold text-[#453178] cursor-pointer"
            >
              See All
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E1EE] p-3 shadow-[0_4px_16px_rgba(69,49,120,0.06)]">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#EFEBF6]">
              <ResilientImage
                src={heroImage}
                alt={featuredListing.title}
                fallbackLabel={featuredListing.title}
                className="w-full h-full object-cover"
              />

              {/* Top-left Mode Label + Top-right Play Overview Button */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-[#453178] text-white text-[11px] font-semibold shadow-sm">
                  {featuredListing.intent === 'rent' ? 'Rent' : 'Buy'}
                </span>

                <button
                  type="button"
                  onClick={onOpenTour}
                  aria-label="Play Property Management overview"
                  className="min-h-[40px] min-w-[40px] rounded-full bg-white/95 backdrop-blur-md text-[#453178] shadow flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-[#453178] ml-0.5" />
                </button>
              </div>
            </div>

            {/* Clean White Content Block Below Photo */}
            <div className="pt-3 px-0.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="font-display text-[16px] font-bold text-[#1F1738] truncate">
                    {featuredListing.title}
                  </h2>
                  <div className="flex items-center gap-1 text-[12px] text-[#6E6B7B] mt-0.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-[#453178]" />
                    <span className="truncate">{featuredListing.location}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenListings(featuredListing.intent, featuredListing)
                  }
                  className="min-h-[36px] px-3 rounded-lg bg-[#EFEBF6] text-[#453178] text-[12px] font-semibold shrink-0 cursor-pointer"
                >
                  View
                </button>
              </div>

              <div className="mt-2.5 pt-2.5 border-t border-[#E5E1EE] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[13px] tabular-nums">
                  <Tag className="w-3.5 h-3.5 text-[#453178]" />
                  <span className="font-bold text-[#453178]">
                    {featuredListing.priceLabel}
                  </span>
                  <span className="text-[#6E6B7B] text-[12px]">
                    {featuredListing.cadence}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenListings('rent')}
                    className="min-h-[36px] px-3.5 rounded-lg bg-[#EFEBF6] text-[#453178] text-[12px] font-bold cursor-pointer active:opacity-80"
                  >
                    Rent
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenListings('buy')}
                    className="min-h-[36px] px-3.5 rounded-lg bg-[#453178] text-white text-[12px] font-bold cursor-pointer active:opacity-85"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 2: Property Management Dashboard Grid (All 6 Exact Categories) */}
      <section aria-labelledby="opt2-pm-heading">
        <div className="flex items-center justify-between mb-2.5">
          <h2
            id="opt2-pm-heading"
            className="font-display text-[17px] font-bold text-[#1F1738] tracking-tight"
          >
            Property Management
          </h2>
          <button
            type="button"
            onClick={onOpenManageDirectory}
            className="min-h-[36px] px-1 text-[13px] font-semibold text-[#453178] cursor-pointer"
          >
            See All
          </button>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5E1EE] p-6 text-center">
            <p className="text-[14px] font-semibold text-[#1F1738]">
              No matching management modules
            </p>
            <p className="text-[12px] text-[#6E6B7B] mt-1">
              Clear your search to see all 6 Property Management modules.
            </p>
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 ${
              compactView ? 'gap-2.5' : 'gap-3'
            }`}
          >
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category)}
                className="text-left bg-white rounded-2xl border border-[#E5E1EE] p-2.5 shadow-[0_2px_10px_rgba(69,49,120,0.05)] active:scale-[0.985] transition-transform flex flex-col cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#453178]"
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#EFEBF6]">
                  <ResilientImage
                    src={category.image}
                    alt={category.imageAlt}
                    fallbackLabel={category.label}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="pt-2.5 pb-0.5 px-0.5 flex items-center justify-between gap-1.5 w-full">
                  <div className="min-w-0">
                    <div className="font-display text-[14px] font-bold text-[#1F1738] truncate">
                      {category.label}
                    </div>
                    <div className="text-[11px] text-[#6E6B7B] truncate tabular-nums mt-0.5">
                      {category.countLabel}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8274A4] shrink-0" />
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Section 3: Horizontal Peeking Rent & Buy Cards */}
      <section aria-labelledby="opt2-listings-heading">
        <div className="flex items-center justify-between mb-2.5">
          <h2
            id="opt2-listings-heading"
            className="font-display text-[17px] font-bold text-[#1F1738] tracking-tight"
          >
            Rent &amp; Buy Listings
          </h2>
          <button
            type="button"
            onClick={() => onOpenListings('rent')}
            className="min-h-[36px] px-1 text-[13px] font-semibold text-[#453178] cursor-pointer"
          >
            See All
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {filteredListings.map((listing) => (
            <button
              key={listing.id}
              type="button"
              onClick={() => onOpenListings(listing.intent, listing)}
              className="w-[244px] shrink-0 text-left bg-white rounded-2xl border border-[#E5E1EE] p-2.5 shadow-[0_2px_10px_rgba(69,49,120,0.05)] active:scale-[0.985] transition-transform cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#EFEBF6]">
                <ResilientImage
                  src={listing.image}
                  alt={listing.title}
                  fallbackLabel={listing.title}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-2 left-2 px-2.5 py-1 rounded-md text-[11px] font-semibold text-white ${
                    listing.intent === 'rent' ? 'bg-[#8274A4]' : 'bg-[#453178]'
                  }`}
                >
                  {listing.intent === 'rent' ? 'Rent' : 'Buy'}
                </span>
              </div>

              <div className="pt-2.5 px-0.5">
                <div className="font-display text-[14px] font-bold text-[#1F1738] truncate">
                  {listing.title}
                </div>
                <div className="text-[11px] text-[#6E6B7B] truncate mt-0.5">
                  {listing.location}
                </div>
                <div className="mt-2 pt-2 border-t border-[#E5E1EE] flex items-center justify-between text-[12px] tabular-nums">
                  <span className="font-bold text-[#453178]">
                    {listing.priceLabel}{' '}
                    <span className="font-normal text-[#6E6B7B]">
                      {listing.cadence}
                    </span>
                  </span>
                  <span className="text-[#6E6B7B]">{listing.beds} Beds</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
