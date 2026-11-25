import React, { useMemo, useState } from 'react';
import { ChevronLeft, Search, Plus, CheckCircle2 } from 'lucide-react';
import { CategoryRecord, ManagementCategory } from '../../data/manzilData';
import { ResilientImage } from '../ResilientImage';

interface CategoryScreenProps {
  category: ManagementCategory;
  customRecords: CategoryRecord[];
  onAddRecord: (categoryId: string, record: CategoryRecord) => void;
  onBack: () => void;
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({
  category,
  customRecords,
  onAddRecord,
  onBack,
}) => {
  const [query, setQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newMetric, setNewMetric] = useState('');

  const allRecords = useMemo(
    () => [...customRecords, ...category.records],
    [customRecords, category.records]
  );

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddRecord(category.id, {
      id: `${category.id}-${Date.now()}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Added today',
      metric: newMetric.trim() || 'Active',
      status: 'Active',
    });
    setNewTitle('');
    setNewSubtitle('');
    setNewMetric('');
    setIsAdding(false);
  };

  return (
    <div className="px-5 pt-1 pb-6 space-y-4">
      {/* Native iOS Back Navigation Bar */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] pr-3 -ml-1.5 inline-flex items-center gap-1 text-[14px] font-semibold text-[#453178] active:opacity-70 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={() => setIsAdding((prev) => !prev)}
          className="min-h-[40px] px-3.5 rounded-full bg-[#453178] text-white text-[12px] font-semibold inline-flex items-center gap-1.5 active:bg-[#33235C] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{category.ctaLabel}</span>
        </button>
      </div>

      {/* Photographic Module Header Card */}
      <div className="relative h-40 rounded-[24px] overflow-hidden bg-[#1F1738] shadow-[0_8px_24px_-8px_rgba(69,49,120,0.2)]">
        <ResilientImage
          src={category.image}
          alt={category.imageAlt}
          fallbackLabel={category.label}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1738]/85 via-[#1F1738]/30 to-transparent" />
        <div className="absolute bottom-3.5 left-4 right-4 text-white">
          <h1 className="font-display text-[22px] font-bold tracking-tight">
            {category.label}
          </h1>
          <p className="text-[12px] text-white/85 mt-0.5 tabular-nums">
            {category.summary}
          </p>
        </div>
      </div>

      {/* Inline Add Form */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[22px] p-4 shadow-[0_6px_20px_-6px_rgba(69,49,120,0.1)] border border-[#E5E1EE] space-y-2.5"
        >
          <div className="text-[13px] font-bold text-[#1F1738]">
            {category.ctaLabel}
          </div>
          <input
            type="text"
            required
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Name or title"
            className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#F6F4FA] text-[14px] text-[#1F1738] focus:bg-white focus:outline-2 focus:outline-[#453178]"
          />
          <input
            type="text"
            value={newSubtitle}
            onChange={(e) => setNewSubtitle(e.target.value)}
            placeholder="Building, unit, or reference note"
            className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#F6F4FA] text-[14px] text-[#1F1738] focus:bg-white focus:outline-2 focus:outline-[#453178]"
          />
          <input
            type="text"
            value={newMetric}
            onChange={(e) => setNewMetric(e.target.value)}
            placeholder="Amount, units, or rating"
            className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#F6F4FA] text-[14px] text-[#1F1738] focus:bg-white focus:outline-2 focus:outline-[#453178]"
          />
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="min-h-[40px] px-3.5 rounded-xl text-[13px] font-medium text-[#6E6B7B] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[40px] px-5 rounded-xl bg-[#453178] text-white text-[13px] font-semibold cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#8274A4] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${category.label.toLowerCase()}...`}
          className="w-full min-h-[44px] pl-10 pr-4 rounded-2xl bg-white text-[14px] text-[#1F1738] placeholder:text-[#8274A4] border border-[#E5E1EE] focus:border-[#453178] focus:outline-none"
        />
      </div>

      {/* Native iOS Inset Grouped Records */}
      <div className="bg-white rounded-[24px] shadow-[0_6px_20px_-6px_rgba(69,49,120,0.08)] border border-[#E5E1EE] divide-y divide-[#E5E1EE] overflow-hidden">
        {filteredRecords.length === 0 ? (
          <div className="py-10 px-4 text-center">
            <p className="text-[14px] font-semibold text-[#1F1738]">
              No matching records
            </p>
            <p className="text-[12px] text-[#6E6B7B] mt-1">
              Clear search or tap {category.ctaLabel} above.
            </p>
          </div>
        ) : (
          filteredRecords.map((item) => (
            <div
              key={item.id}
              className="px-4 py-3.5 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="text-[14px] font-semibold text-[#1F1738] truncate">
                  {item.title}
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-[#6E6B7B] mt-0.5">
                  <span className="truncate">{item.subtitle}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 font-medium text-[#453178] shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="font-mono text-[13px] font-semibold text-[#1F1738] tabular-nums shrink-0">
                {item.metric}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
