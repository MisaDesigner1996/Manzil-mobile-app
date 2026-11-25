import React, { useState } from 'react';
import { X, MapPin, BedDouble, Bath, Maximize2, Check } from 'lucide-react';
import { PROPERTY_LISTINGS, PropertyListing } from '../data/manzilData';
import { ResilientImage } from './ResilientImage';

interface PropertyListingsSheetProps {
  mode: 'rent' | 'buy' | 'tour' | null;
  selectedListing?: PropertyListing | null;
  onClose: () => void;
  onSwitchMode: (mode: 'rent' | 'buy') => void;
}

export const PropertyListingsSheet: React.FC<PropertyListingsSheetProps> = ({
  mode,
  selectedListing,
  onClose,
  onSwitchMode,
}) => {
  const [requestedIds, setRequestedIds] = useState<string[]>([]);

  if (!mode) return null;

  const listings =
    mode === 'tour'
      ? PROPERTY_LISTINGS
      : PROPERTY_LISTINGS.filter((item) => item.intent === mode);

  const orderedListings = selectedListing
    ? [
        selectedListing,
        ...listings.filter((item) => item.id !== selectedListing.id),
      ]
    : listings;

  const toggleRequest = (id: string) => {
    setRequestedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-end justify-center bg-[#1F1738]/45 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="listings-sheet-title"
      onClick={onClose}
    >
      <div
        className="w-full bg-[#F7F6FA] rounded-t-[28px] shadow-2xl max-h-[88%] flex flex-col overflow-hidden pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pt-3 pb-1 flex justify-center bg-white">
          <div className="w-10 h-1.5 rounded-full bg-[#453178]/20" />
        </div>

        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#E5E1EE] flex items-center justify-between gap-3">
          <div>
            <h2
              id="listings-sheet-title"
              className="font-display text-xl font-bold text-[#1F1738]"
            >
              {mode === 'rent'
                ? 'Rent Residences'
                : mode === 'buy'
                  ? 'Buy Properties'
                  : 'Property Management Showcase'}
            </h2>
            <p className="text-xs text-[#6E6B7B] mt-0.5">
              {mode === 'tour'
                ? 'Active residential portfolio across Rent and Buy channels'
                : mode === 'rent'
                  ? 'Verified lease-ready apartments and suites'
                  : 'Curated residential villas and estates for purchase'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close listings"
            className="min-h-[44px] min-w-[44px] rounded-full bg-[#F6F4FA] text-[#453178] flex items-center justify-center hover:bg-[#EFEBF6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        {mode !== 'tour' && (
          <div className="px-5 py-3 bg-white border-b border-[#E5E1EE] flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSwitchMode('rent')}
              className={`min-h-[40px] px-4 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                mode === 'rent'
                  ? 'bg-[#453178] text-white'
                  : 'bg-[#F6F4FA] text-[#6E6B7B] hover:text-[#1F1738]'
              }`}
            >
              Rent
            </button>
            <button
              type="button"
              onClick={() => onSwitchMode('buy')}
              className={`min-h-[40px] px-4 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                mode === 'buy'
                  ? 'bg-[#8274A4] text-white'
                  : 'bg-[#F6F4FA] text-[#6E6B7B] hover:text-[#1F1738]'
              }`}
            >
              Buy
            </button>
          </div>
        )}

        {/* Listings Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {orderedListings.map((listing) => {
            const isRequested = requestedIds.includes(listing.id);
            return (
              <div
                key={listing.id}
                className="bg-white rounded-[22px] p-3.5 shadow-[0_6px_20px_-6px_rgba(69,49,120,0.09)] border border-[#E5E1EE]"
              >
                <div className="relative aspect-[16/9] rounded-[16px] overflow-hidden bg-[#EFEBF6]">
                  <ResilientImage
                    src={listing.image}
                    alt={listing.title}
                    fallbackLabel={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-semibold text-[#453178]">
                    {listing.intent === 'rent' ? 'Rent' : 'Buy'} · {listing.highlight}
                  </span>
                </div>

                <div className="pt-3.5 px-1 flex flex-col gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#6E6B7B]">
                      <MapPin className="w-3.5 h-3.5 text-[#453178]" />
                      <span>{listing.location}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#1F1738] mt-0.5">
                      {listing.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#6E6B7B] mt-1.5 tabular-nums">
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
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#E5E1EE]">
                    <div>
                      <div className="font-display text-lg font-bold text-[#1F1738] tabular-nums">
                        {listing.priceLabel}
                      </div>
                      <div className="text-xs text-[#6E6B7B]">{listing.cadence}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleRequest(listing.id)}
                      className={`min-h-[44px] px-4 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isRequested
                          ? 'bg-[#EFEBF6] text-[#453178]'
                          : 'bg-[#453178] text-white active:bg-[#33235C]'
                      }`}
                    >
                      {isRequested && <Check className="w-3.5 h-3.5" />}
                      <span>{isRequested ? 'Viewing Requested' : 'Schedule Viewing'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
