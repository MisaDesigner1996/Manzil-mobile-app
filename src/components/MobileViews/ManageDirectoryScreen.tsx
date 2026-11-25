import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MANAGEMENT_CATEGORIES, ManagementCategory } from '../../data/manzilData';
import { ResilientImage } from '../ResilientImage';

interface ManageDirectoryScreenProps {
  onSelectCategory: (category: ManagementCategory) => void;
  customRecordCounts: Record<string, number>;
}

export const ManageDirectoryScreen: React.FC<ManageDirectoryScreenProps> = ({
  onSelectCategory,
  customRecordCounts,
}) => {
  return (
    <div className="px-5 pt-2 pb-6 space-y-4">
      <div>
        <h1 className="font-display text-[24px] font-bold tracking-tight text-[#1F1738]">
          Property Management
        </h1>
        <p className="text-[13px] text-[#6E6B7B] mt-0.5">
          Select a module to view records or log an update
        </p>
      </div>

      {/* Native iOS Inset Grouped List with Custom Photography Thumbnails */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_24px_-8px_rgba(69,49,120,0.09)] border border-[#E5E1EE] divide-y divide-[#E5E1EE] overflow-hidden">
        {MANAGEMENT_CATEGORIES.map((category) => {
          const added = customRecordCounts[category.id] || 0;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category)}
              className="w-full p-3.5 flex items-center justify-between gap-3.5 text-left active:bg-[#F6F4FA] transition-colors cursor-pointer min-h-[76px]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-16 h-12 rounded-[12px] overflow-hidden bg-[#EFEBF6] shrink-0">
                  <ResilientImage
                    src={category.image}
                    alt={category.imageAlt}
                    fallbackLabel={category.label}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <div className="font-display text-[15px] font-bold text-[#1F1738] truncate">
                    {category.label}
                  </div>
                  <div className="text-[12px] text-[#6E6B7B] truncate mt-0.5 tabular-nums">
                    {category.summary}
                    {added > 0 ? ` · +${added} new` : ''}
                  </div>
                </div>
              </div>

              <ChevronRight
                className="w-4 h-4 text-[#8274A4] shrink-0"
                strokeWidth={2}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
