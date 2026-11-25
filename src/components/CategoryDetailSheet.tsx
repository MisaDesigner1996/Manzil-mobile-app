import React, { useState, useMemo } from 'react';
import { X, Search, Plus, CheckCircle2 } from 'lucide-react';
import { CategoryRecord, ManagementCategory } from '../data/manzilData';
import { ResilientImage } from './ResilientImage';

interface CategoryDetailSheetProps {
  category: ManagementCategory | null;
  customRecords: Record<string, CategoryRecord[]>;
  onAddRecord: (categoryId: string, record: CategoryRecord) => void;
  onClose: () => void;
}

export const CategoryDetailSheet: React.FC<CategoryDetailSheetProps> = ({
  category,
  customRecords,
  onAddRecord,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newMetric, setNewMetric] = useState('');

  const allRecords = useMemo(() => {
    if (!category) return [];
    const added = customRecords[category.id] || [];
    return [...added, ...category.records];
  }, [category, customRecords]);

  const filteredRecords = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allRecords;
    return allRecords.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
    );
  }, [allRecords, query]);

  if (!category) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddRecord(category.id, {
      id: `${category.id}-${Date.now()}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Added just now',
      metric: newMetric.trim() || 'Active',
      status: 'Active',
    });
    setNewTitle('');
    setNewSubtitle('');
    setNewMetric('');
    setIsAdding(false);
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-end justify-center bg-[#1F1738]/45 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-sheet-title"
      onClick={onClose}
    >
      <div
        className="w-full bg-white rounded-t-[28px] shadow-2xl max-h-[88%] flex flex-col overflow-hidden pb-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-[#453178]/20" />
        </div>

        {/* Photographic Header */}
        <div className="relative h-40 shrink-0 overflow-hidden bg-[#1F1738]">
          <ResilientImage
            src={category.image}
            alt={category.imageAlt}
            fallbackLabel={category.label}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1738]/85 via-[#1F1738]/35 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${category.label}`}
            className="absolute top-3 right-3 min-h-[44px] min-w-[44px] rounded-full bg-white/95 backdrop-blur-md text-[#453178] flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3.5 left-5 right-5 text-white">
            <h2
              id="category-sheet-title"
              className="font-display text-2xl font-bold tracking-tight"
            >
              {category.label}
            </h2>
            <p className="text-xs sm:text-sm text-white/85 mt-0.5 tabular-nums">
              {category.summary}
            </p>
          </div>
        </div>

        {/* Search & Add Bar */}
        <div className="px-5 py-3.5 border-b border-[#E5E1EE] flex items-center gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8274A4] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${category.label.toLowerCase()}...`}
              className="w-full min-h-[44px] pl-10 pr-4 rounded-xl bg-[#F6F4FA] text-sm text-[#1F1738] placeholder:text-[#8274A4] border border-transparent focus:border-[#453178] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsAdding((prev) => !prev)}
            className="min-h-[44px] px-4 rounded-xl bg-[#453178] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 hover:bg-[#33235C] transition-colors shrink-0 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{category.ctaLabel}</span>
          </button>
        </div>

        {/* Inline Creation Form */}
        {isAdding && (
          <form
            onSubmit={handleSubmit}
            className="px-5 py-4 bg-[#F6F4FA] border-b border-[#E5E1EE] space-y-2.5"
          >
            <div className="grid grid-cols-1 gap-2.5">
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Name or title"
                className="min-h-[44px] px-3.5 rounded-xl bg-white text-sm text-[#1F1738] border border-[#E5E1EE] focus:border-[#453178] focus:outline-none"
              />
              <input
                type="text"
                value={newMetric}
                onChange={(e) => setNewMetric(e.target.value)}
                placeholder="Amount, units, or rating"
                className="min-h-[44px] px-3.5 rounded-xl bg-white text-sm text-[#1F1738] border border-[#E5E1EE] focus:border-[#453178] focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <input
                type="text"
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                placeholder="Building, unit, or reference note"
                className="flex-1 min-h-[42px] px-3.5 rounded-xl bg-white text-sm text-[#1F1738] border border-[#E5E1EE] focus:border-[#453178] focus:outline-none"
              />
              <button
                type="submit"
                className="min-h-[42px] px-4 rounded-xl bg-[#453178] text-white text-xs font-semibold hover:bg-[#33235C] cursor-pointer shrink-0"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="min-h-[42px] px-3 rounded-xl text-xs font-medium text-[#6E6B7B] hover:text-[#1F1738] cursor-pointer shrink-0"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Records List */}
        <div className="flex-1 overflow-y-auto px-5 py-2 divide-y divide-[#E5E1EE]">
          {filteredRecords.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-[#1F1738]">
                No matching records in {category.label}
              </p>
              <p className="text-xs text-[#6E6B7B] mt-1">
                Try clearing your search or add a new entry above.
              </p>
            </div>
          ) : (
            filteredRecords.map((item) => (
              <div
                key={item.id}
                className="py-3.5 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#1F1738] truncate">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6E6B7B] mt-0.5">
                    <span className="truncate">{item.subtitle}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 font-medium text-[#453178] shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="font-mono text-sm font-semibold text-[#1F1738] tabular-nums shrink-0">
                  {item.metric}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
