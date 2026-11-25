import React, { useMemo, useState } from 'react';
import {
  Search,
  Play,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Send,
  Wrench,
  FileSignature,
} from 'lucide-react';
import { CategoryId, ManagementCategory } from '../../data/manzilData';
import {
  DAILY_AUTOMATION_TIMELINE,
  formatPortfolioMoney,
  GccCurrency,
  INITIAL_INVOICES,
  INITIAL_LEASES,
  INITIAL_TICKETS,
  InvoiceItem,
  LeaseItem,
  MaintenanceTicket,
} from '../../data/optionFiveData';
import {
  BuildingsIllustration,
  ExpensesIllustration,
  HeroArchitectureVector,
  OwnersIllustration,
  PaymentsIllustration,
  TenantsIllustration,
  VendorsIllustration,
} from '../OptionThree/ManzilIllustrations';

interface HomeOptionFiveProps {
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

const GCC_CURRENCIES: GccCurrency[] = [
  'AED',
  'SAR',
  'OMR',
  'BHD',
  'QAR',
  'KWD',
  'USD',
];

export const HomeOptionFive: React.FC<HomeOptionFiveProps> = ({
  categories,
  onSelectCategory,
  onOpenRent,
  onOpenBuy,
  onOpenTour,
  compactView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<GccCurrency>('AED');
  const [opsTab, setOpsTab] = useState<'invoices' | 'maintenance' | 'leases'>(
    'invoices'
  );
  const [invoices, setInvoices] = useState<InvoiceItem[]>(INITIAL_INVOICES);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(INITIAL_TICKETS);
  const [leases, setLeases] = useState<LeaseItem[]>(INITIAL_LEASES);
  const [remindedIds, setRemindedIds] = useState<string[]>([]);

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q)
    );
  }, [categories, searchQuery]);

  const handleMarkPaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? { ...inv, status: 'Paid', dueLabel: 'Settled just now' }
          : inv
      )
    );
  };

  const handleSendReminder = (id: string) => {
    setRemindedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleCycleTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((tic) => {
        if (tic.id !== id) return tic;
        const nextStatus =
          tic.status === 'Open'
            ? 'Dispatched'
            : tic.status === 'Dispatched'
              ? 'Resolved'
              : 'Resolved';
        return { ...tic, status: nextStatus };
      })
    );
  };

  const handleSendRenewal = (id: string) => {
    setLeases((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status: 'Renewal Sent', termLabel: 'E-Signature Sent' }
          : l
      )
    );
  };

  const paidTotalUsd = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + i.amountUsd, 146200);
  const openTicketsCount = tickets.filter((t) => t.status !== 'Resolved').length;

  return (
    <div className="bg-[#FAF9FC] min-h-full px-5 pt-1 pb-7 space-y-5">
      {/* Search Pill */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#8274A4] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search properties, invoices, leases..."
          className="w-full min-h-[46px] pl-11 pr-4 rounded-2xl bg-white text-[13.5px] text-[#1F1738] placeholder:text-[#8274A4] shadow-[0_6px_20px_-6px_rgba(69,49,120,0.08)] border border-[#E5E1EE] focus:border-[#453178] focus:outline-none"
        />
      </div>

      {/* GCC & Global Multi-Currency Switcher */}
      <div
        role="tablist"
        aria-label="Portfolio display currency"
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
      >
        {GCC_CURRENCIES.map((code) => {
          const active = currency === code;
          return (
            <button
              key={code}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCurrency(code)}
              className={`min-h-[38px] px-3.5 rounded-xl text-[12px] font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                active
                  ? 'bg-[#453178] text-white shadow-[0_4px_12px_-3px_rgba(69,49,120,0.4)]'
                  : 'bg-white text-[#6E6B7B] border border-[#E5E1EE] shadow-[0_2px_8px_rgba(69,49,120,0.04)]'
              }`}
            >
              {code}
            </button>
          );
        })}
      </div>

      {/* Hero Section – Property Management + Live Portfolio Overview */}
      {!searchQuery.trim() && (
        <section aria-labelledby="opt5-hero-heading">
          <div className="bg-white rounded-[26px] p-3 shadow-[0_12px_30px_-10px_rgba(69,49,120,0.1)] border border-[#E5E1EE]">
            <div className="rounded-[20px] overflow-hidden bg-[#F6F4FA]">
              <div className="w-full aspect-[400/168]">
                <HeroArchitectureVector />
              </div>
            </div>

            {/* Rent · Play · Buy Controls */}
            <div className="pt-3 px-1">
              <div className="flex items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={onOpenRent}
                  className="min-h-[44px] flex-1 rounded-2xl bg-[#EFEBF6] text-[#453178] font-display text-[13.5px] font-bold flex items-center justify-center active:scale-[0.98] transition-transform cursor-pointer"
                >
                  Rent
                </button>

                <button
                  type="button"
                  onClick={onOpenTour}
                  aria-label="Play Property Management overview"
                  className="min-h-[46px] min-w-[46px] rounded-full bg-[#8274A4] text-white shadow-[0_6px_16px_-4px_rgba(130,116,164,0.5)] flex items-center justify-center active:scale-95 transition-transform cursor-pointer shrink-0"
                >
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </button>

                <button
                  type="button"
                  onClick={onOpenBuy}
                  className="min-h-[44px] flex-1 rounded-2xl bg-[#453178] text-white font-display text-[13.5px] font-bold flex items-center justify-center active:scale-[0.98] transition-transform cursor-pointer"
                >
                  Buy
                </button>
              </div>

              <h1
                id="opt5-hero-heading"
                className="mt-3 font-display text-[19px] font-bold tracking-tight text-[#1F1738] text-center"
              >
                Property Management
              </h1>

              {/* Live Portfolio Snapshot Strip (Collections, Occupancy, Tickets) */}
              <div className="mt-3 pt-3 border-t border-[#E5E1EE] grid grid-cols-3 divide-x divide-[#E5E1EE] text-center">
                <div className="px-1">
                  <div className="text-[11px] text-[#6E6B7B]">Collected</div>
                  <div className="font-display text-[13.5px] font-bold text-[#453178] tabular-nums mt-0.5 truncate">
                    {formatPortfolioMoney(paidTotalUsd, currency)}
                  </div>
                </div>
                <div className="px-1">
                  <div className="text-[11px] text-[#6E6B7B]">Occupancy</div>
                  <div className="font-display text-[13.5px] font-bold text-[#1F1738] tabular-nums mt-0.5">
                    96% · 142/148
                  </div>
                </div>
                <div className="px-1">
                  <div className="text-[11px] text-[#6E6B7B]">Tickets</div>
                  <div className="font-display text-[13.5px] font-bold text-[#8274A4] tabular-nums mt-0.5">
                    {openTicketsCount} Open
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Existing Manzil Dashboard Navigation Cards (All 6 Exact Categories) */}
      <section aria-label="Property Management Categories">
        <div className="flex items-baseline justify-between mb-2.5">
          <h2 className="font-display text-[16px] font-bold text-[#1F1738]">
            Management Modules
          </h2>
          <span className="text-[11px] font-medium text-[#6E6B7B]">
            Owners · Buildings · Tenants · Vendors
          </span>
        </div>

        <div
          className={`grid grid-cols-2 ${
            compactView ? 'gap-2.5' : 'gap-3.5'
          }`}
        >
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category)}
              className="group text-left bg-white rounded-[22px] p-2.5 shadow-[0_8px_24px_-10px_rgba(69,49,120,0.09)] border border-[#E5E1EE] active:scale-[0.98] transition-transform flex flex-col cursor-pointer"
            >
              <div className="w-full aspect-[140/92] rounded-[16px] bg-[#F6F4FA] flex items-center justify-center p-1.5 overflow-hidden">
                {CATEGORY_ILLUSTRATIONS[category.id]}
              </div>
              <div className="pt-2.5 pb-0.5 px-1 flex items-center justify-between gap-2 w-full">
                <div className="min-w-0">
                  <div className="font-display text-[14.5px] font-bold text-[#1F1738] truncate">
                    {category.label}
                  </div>
                  <div className="text-[11px] text-[#6E6B7B] truncate tabular-nums">
                    {category.countLabel}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8274A4] shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Live Operations Queue (Invoices · Maintenance · Leases) */}
      <section aria-label="Operations Queue">
        <div className="flex items-center gap-5 border-b border-[#E5E1EE] pb-2 mb-3">
          {(
            [
              { id: 'invoices', label: 'Invoices & PDC' },
              { id: 'maintenance', label: 'Maintenance' },
              { id: 'leases', label: 'Leases & E-Sign' },
            ] as const
          ).map((tab) => {
            const active = opsTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setOpsTab(tab.id)}
                className={`min-h-[36px] text-[14px] font-display transition-colors cursor-pointer relative ${
                  active
                    ? 'font-bold text-[#453178]'
                    : 'font-medium text-[#8274A4]'
                }`}
              >
                {tab.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-2 h-[2.5px] rounded-full bg-[#453178]" />
                )}
              </button>
            );
          })}
        </div>

        {opsTab === 'invoices' && (
          <div className="bg-white rounded-[22px] shadow-[0_8px_24px_-10px_rgba(69,49,120,0.09)] border border-[#E5E1EE] divide-y divide-[#E5E1EE] overflow-hidden">
            {invoices.map((inv) => {
              const isReminded = remindedIds.includes(inv.id);
              return (
                <div
                  key={inv.id}
                  className="p-3.5 flex items-center justify-between gap-2.5"
                >
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-semibold text-[#1F1738] truncate">
                      {inv.unit}
                    </div>
                    <div className="text-[11.5px] text-[#6E6B7B] truncate mt-0.5">
                      {inv.tenant} · {inv.dueLabel}
                    </div>
                    <div className="text-[11px] font-medium mt-1 inline-flex items-center gap-1">
                      {inv.status === 'Paid' ? (
                        <span className="text-[#453178] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Paid · {inv.method}
                        </span>
                      ) : inv.status === 'Due Soon' ? (
                        <span className="text-[#8274A4] inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Due Soon · {inv.method}
                        </span>
                      ) : (
                        <span className="text-[#33235C] font-semibold inline-flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Overdue · {inv.method}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                    <div className="font-mono text-[13px] font-semibold text-[#1F1738] tabular-nums">
                      {formatPortfolioMoney(inv.amountUsd, currency)}
                    </div>

                    {inv.status !== 'Paid' && (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleSendReminder(inv.id)}
                          className="min-h-[32px] px-2.5 rounded-lg bg-[#EFEBF6] text-[#453178] text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>{isReminded ? 'Sent' : 'Remind'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMarkPaid(inv.id)}
                          className="min-h-[32px] px-2.5 rounded-lg bg-[#453178] text-white text-[11px] font-semibold cursor-pointer"
                        >
                          Mark Paid
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {opsTab === 'maintenance' && (
          <div className="bg-white rounded-[22px] shadow-[0_8px_24px_-10px_rgba(69,49,120,0.09)] border border-[#E5E1EE] divide-y divide-[#E5E1EE] overflow-hidden">
            {tickets.map((tic) => (
              <div
                key={tic.id}
                className="p-3.5 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-[13.5px] font-semibold text-[#1F1738] truncate">
                    {tic.issue}
                  </div>
                  <div className="text-[11.5px] text-[#6E6B7B] truncate mt-0.5">
                    {tic.unit} · {tic.vendor}
                  </div>
                  <div className="text-[11px] font-medium mt-1 text-[#453178]">
                    {tic.priority} Priority · {tic.status}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCycleTicket(tic.id)}
                  className={`min-h-[36px] px-3 rounded-xl text-[11.5px] font-semibold inline-flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    tic.status === 'Resolved'
                      ? 'bg-[#EFEBF6] text-[#453178]'
                      : 'bg-[#453178] text-white'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>
                    {tic.status === 'Open'
                      ? 'Dispatch'
                      : tic.status === 'Dispatched'
                        ? 'Resolve'
                        : 'Resolved'}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}

        {opsTab === 'leases' && (
          <div className="bg-white rounded-[22px] shadow-[0_8px_24px_-10px_rgba(69,49,120,0.09)] border border-[#E5E1EE] divide-y divide-[#E5E1EE] overflow-hidden">
            {leases.map((lease) => (
              <div
                key={lease.id}
                className="p-3.5 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-[13.5px] font-semibold text-[#1F1738] truncate">
                    {lease.tenant}
                  </div>
                  <div className="text-[11.5px] text-[#6E6B7B] truncate mt-0.5">
                    {lease.unit} · {lease.termLabel}
                  </div>
                  <div className="text-[11px] font-medium mt-1 text-[#453178]">
                    {lease.status} · {lease.eSignVerified ? 'EJARI / E-Signed' : 'Awaiting Signature'}
                  </div>
                </div>

                {lease.status === 'Expiring Soon' ? (
                  <button
                    type="button"
                    onClick={() => handleSendRenewal(lease.id)}
                    className="min-h-[36px] px-3 rounded-xl bg-[#453178] text-white text-[11.5px] font-semibold inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <FileSignature className="w-3.5 h-3.5" />
                    <span>Renew</span>
                  </button>
                ) : (
                  <span className="text-[11.5px] font-semibold text-[#8274A4] shrink-0">
                    {lease.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Automated Daily Property Care & Cash Flow Summary */}
      <section aria-label="Cash Flow and Automated Daily Timeline" className="space-y-3">
        <div className="bg-white rounded-[22px] p-4 shadow-[0_8px_24px_-10px_rgba(69,49,120,0.09)] border border-[#E5E1EE]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-[15px] font-bold text-[#1F1738]">
              Monthly Cash Flow
            </h2>
            <span className="text-[11px] font-semibold text-[#453178] tabular-nums">
              Net {formatPortfolioMoney(129230, currency)}
            </span>
          </div>

          <div className="space-y-2.5 text-[12px]">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#6E6B7B]">Collected Rent</span>
                <span className="font-mono font-semibold text-[#1F1738] tabular-nums">
                  {formatPortfolioMoney(paidTotalUsd, currency)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#EFEBF6] overflow-hidden">
                <div className="h-full w-[91%] rounded-full bg-[#453178]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#6E6B7B]">Operating Expenses</span>
                <span className="font-mono font-semibold text-[#1F1738] tabular-nums">
                  {formatPortfolioMoney(19420, currency)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#EFEBF6] overflow-hidden">
                <div className="h-full w-[18%] rounded-full bg-[#8274A4]" />
              </div>
            </div>
          </div>
        </div>

        {/* Daily Automation Activity */}
        <div className="bg-white rounded-[22px] p-4 shadow-[0_8px_24px_-10px_rgba(69,49,120,0.09)] border border-[#E5E1EE]">
          <h2 className="font-display text-[15px] font-bold text-[#1F1738] mb-3">
            Today’s Automated Operations
          </h2>
          <div className="space-y-3">
            {DAILY_AUTOMATION_TIMELINE.map((item) => (
              <div key={item.time} className="flex items-start gap-3">
                <span className="font-mono text-[11px] font-semibold text-[#453178] tabular-nums pt-0.5 shrink-0">
                  {item.time}
                </span>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-[#1F1738]">
                    {item.title}
                  </div>
                  <div className="text-[11.5px] text-[#6E6B7B]">
                    {item.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
