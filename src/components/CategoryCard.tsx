import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ManagementCategory } from '../data/manzilData';
import { ResilientImage } from './ResilientImage';

interface CategoryCardProps {
  category: ManagementCategory;
  onSelect: (category: ManagementCategory) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(category)}
      className="group text-left w-full bg-white rounded-[22px] p-2.5 shadow-[0_6px_20px_-8px_rgba(69,49,120,0.10)] border border-[#E5E1EE] active:scale-[0.98] transition-transform duration-150 flex flex-col cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#453178]"
    >
      {/* Bespoke Photographic Asset (4:3) */}
      <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-[#EFEBF6]">
        <ResilientImage
          src={category.image}
          alt={category.imageAlt}
          fallbackLabel={category.label}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Category Label & Clean Unboxed Count */}
      <div className="pt-2.5 pb-1 px-1 flex items-center justify-between gap-2 w-full">
        <div className="min-w-0">
          <h3 className="font-display text-[15px] font-bold text-[#1F1738] tracking-tight truncate">
            {category.label}
          </h3>
          <p className="text-[11px] text-[#6E6B7B] truncate mt-0.5 tabular-nums">
            {category.countLabel}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="w-7 h-7 rounded-full bg-[#F6F4FA] text-[#453178] group-active:bg-[#453178] group-active:text-white flex items-center justify-center shrink-0 transition-colors"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={2} />
        </span>
      </div>
    </button>
  );
};
