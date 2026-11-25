import React, { useMemo, useState } from 'react';
import { Search, MapPin, BedDouble, Bath, Maximize2, Check } from 'lucide-react';
import { PROPERTY_LISTINGS, PropertyListing } from '../../data/manzilData';
import { ResilientImage } from '../ResilientImage';

interface ListingsScreenProps {
  intent: 'rent' | 'buy';
  onSwitchIntent: (intent: 'rent' | 'buy') => void;
  highlightedListingId?: string | null;
}

export const ListingsScreen: React.FC<ListingsScreenProps> = ({
  intent,
  onSwitchIntent,
  highlightedListingId,
}) => {
  const [query, setQuery] = useState('');
  const [requestedIds, setRequestedIds] = useState<string[]>([]);

  const listings = useMemo(() => {
    const byIntent = PROPERTY_LISTINGS.filter((item) => item.intent === intent);
    const q = query.trim().toLowerCase();
    const filtered = q
      ? byIntent.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.location.toLowerCase().includes(q)
        )
      : byIntent;

    if (!highlightedListingId) return filtered;
    const target = filtered.find((i) => i.id === highlightedListingId);
    if (!target) return filtered;
    return [target, ...filtered.filter((i) => i.id !== highlightedListingId)];
  }, [intent, query, highlightedListingId]);

  const toggleRequest = (id: string) => {
    setRequestedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="px-5 pt-2 pb-6 space-y-4">
      {/* Native iOS Segmented Control for Rent / Buy */}
      <div className="bg-[#EFEBF6] p-1 rounded-2xl grid grid-cols-2 gap-1">
        <button
          type="button"
          onClick={() => onSwitchIntent('rent')}
          className={`min-h-[40px] rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
            intent === 'rent'
              ? 'bg-white text-[#453178] shadow-sm'
              : 'text-[#6E6B7B]'
          }`}
        >
          Rent
        </button>
        <button
          type="button"
          onClick={() => onSwitchIntent('buy')}
          className={`min-h-[40px] rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
            intent === 'buy'
              ? 'bg-white text-[#453178] shadow-sm'
              : 'text-[#6E6B7B]'
          }`}
        >
          Buy
        </button>
      </div>

      {/* iOS Search Field */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#8274A4] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            intent === 'rent'
              ? 'Search apartments & suites to rent...'
              : 'Search villas & estates to buy...'
          }
          className="w-full min-h-[44px] pl-10 pr-4 rounded-2xl bg-white text-[14px] text-[#1F1738] placeholder:text-[#8274A4] border border-[#E5E1EE] shadow-[0_2px_10px_rgba(69,49,120,0.05)] focus:border-[#453178] focus:outline-none"
        />
      </div>

      {/* Section Title */}
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-[18px] font-bold text-[#1F1738]">
          {intent === 'rent' ? 'Available for Rent' : 'Available to Buy'}
        </h2>
        <span className="text-[12px] text-[#6E6B7B] tabular-nums">
          {listings.length} {listings.length === 1 ? 'listing' : 'listings'}
        </span>
      </div>

      {/* Property Cards */}
      {listings.length === 0 ? (
        <div className="bg-white rounded-[24px] p-8 text-center border border-[#E5E1EE]">
          <p className="text-[14px] font-semibold text-[#1F1738]">
            No matching residences found
          </p>
          <p className="text-[12px] text-[#6E6B7B] mt-1">
            Try clearing the search query or switching between Rent and Buy.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing: PropertyListing) => {
            const isRequested = requestedIds.includes(listing.id);
            return (
              <article
                key={listing.id}
                className="bg-white rounded-[24px] p-3 shadow-[0_8px_24px_-8px_rgba(69,49,120,0.1)] border border-[#E5E1EE]"
              >
                <div className="relative aspect-[16/10] rounded-[18px] overflow-hidden bg-[#EFEBF6]">
                  <ResilientImage
                    src={listing.image}
                    alt={listing.title}
                    fallbackLabel={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-semibold text-[#453178]">
                    {listing.intent === 'rent' ? 'Rent' : 'Buy'} · {listing.highlight}
                  </span>
                </div>

                <div className="pt-3 px-1">
                  <div className="flex items-center gap-1 text-[12px] text-[#6E6B7B]">
                    <MapPin className="w-3.5 h-3.5 text-[#453178]" />
                    <span>{listing.location}</span>
                  </div>
                  <h3 className="font-display text-[17px] font-bold text-[#1F1738] mt-0.5">
                    {listing.title}
                  </h3>

                  <div className="flex items-center gap-2.5 text-[12px] text-[#6E6B7B] mt-2 tabular-nums">
                    <span className="inline-flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5" />
                      {listing.beds} Beds
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5" />
                      {listing.baths} Baths
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" />
                      {listing.areaSqFt.toLocaleString()} sq ft
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#E5E1EE] flex items-center justify-between gap-2">
                    <div>
                      <div className="font-display text-[17px] font-bold text-[#1F1738] tabular-nums">
                        {listing.priceLabel}
                      </div>
                      <div className="text-[11px] text-[#6E6B7B]">
                        {listing.cadence}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleRequest(listing.id)}
                      className={`min-h-[44px] px-4 rounded-2xl text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isRequested
                          ? 'bg-[#EFEBF6] text-[#453178]'
                          : 'bg-[#453178] text-white active:bg-[#33235C]'
                      }`}
                    >
                      {isRequested && <Check className="w-4 h-4" />}
                      <span>{isRequested ? 'Requested' : 'Book Tour'}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
