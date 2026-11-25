export type GccCurrency = 'AED' | 'SAR' | 'OMR' | 'BHD' | 'QAR' | 'KWD' | 'USD';

export const CURRENCY_META: Record<
  GccCurrency,
  { symbol: string; rateFromUsd: number; decimals: number }
> = {
  USD: { symbol: '$', rateFromUsd: 1, decimals: 0 },
  AED: { symbol: 'AED ', rateFromUsd: 3.67, decimals: 0 },
  SAR: { symbol: 'SAR ', rateFromUsd: 3.75, decimals: 0 },
  OMR: { symbol: 'OMR ', rateFromUsd: 0.385, decimals: 0 },
  BHD: { symbol: 'BHD ', rateFromUsd: 0.377, decimals: 0 },
  QAR: { symbol: 'QAR ', rateFromUsd: 3.64, decimals: 0 },
  KWD: { symbol: 'KWD ', rateFromUsd: 0.307, decimals: 0 },
};

export function formatPortfolioMoney(usdAmount: number, currency: GccCurrency): string {
  const meta = CURRENCY_META[currency];
  const converted = Math.round(usdAmount * meta.rateFromUsd);
  return `${meta.symbol}${converted.toLocaleString()}`;
}

export interface InvoiceItem {
  id: string;
  unit: string;
  tenant: string;
  dueLabel: string;
  amountUsd: number;
  status: 'Paid' | 'Due Soon' | 'Overdue';
  method: string;
}

export interface MaintenanceTicket {
  id: string;
  issue: string;
  unit: string;
  vendor: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Dispatched' | 'Resolved';
}

export interface LeaseItem {
  id: string;
  tenant: string;
  unit: string;
  termLabel: string;
  status: 'Active' | 'Expiring Soon' | 'Renewal Sent';
  eSignVerified: boolean;
}

export const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: 'inv-1',
    unit: 'Meridian · Unit 4B',
    tenant: 'Amina Kareem',
    dueLabel: 'Paid Nov 01',
    amountUsd: 2450,
    status: 'Paid',
    method: 'Auto-Receipt · Bank',
  },
  {
    id: 'inv-2',
    unit: 'Oakwood · Unit 2A',
    tenant: 'Daniel Mercer',
    dueLabel: 'Due in 3 days',
    amountUsd: 1980,
    status: 'Due Soon',
    method: 'PDC · Reminder Ready',
  },
  {
    id: 'inv-3',
    unit: 'Al-Noor · Shop 3',
    tenant: 'Crescent Retail',
    dueLabel: 'Overdue 4 days',
    amountUsd: 3400,
    status: 'Overdue',
    method: 'Auto-Invoice #419',
  },
];

export const INITIAL_TICKETS: MaintenanceTicket[] = [
  {
    id: 'tic-1',
    issue: 'HVAC Chiller Calibration',
    unit: 'Meridian · Unit 3F',
    vendor: 'Apex Climate & HVAC',
    priority: 'High',
    status: 'Open',
  },
  {
    id: 'tic-2',
    issue: 'Courtyard Valve Inspection',
    unit: 'Oakwood · Lobby',
    vendor: 'ClearLine Plumbing Co.',
    priority: 'Medium',
    status: 'Dispatched',
  },
  {
    id: 'tic-3',
    issue: 'Smart Gate Access Sync',
    unit: 'Harbor Heights · Gate B',
    vendor: 'Vanguard Electrical Grid',
    priority: 'Low',
    status: 'Resolved',
  },
];

export const INITIAL_LEASES: LeaseItem[] = [
  {
    id: 'lse-1',
    tenant: 'Sara Haddad',
    unit: 'Harbor Heights · 11C',
    termLabel: 'Ends Aug 2027 · E-Signed',
    status: 'Active',
    eSignVerified: true,
  },
  {
    id: 'lse-2',
    tenant: 'Daniel Mercer',
    unit: 'Oakwood · Unit 2A',
    termLabel: 'Ends in 14 days',
    status: 'Expiring Soon',
    eSignVerified: true,
  },
  {
    id: 'lse-3',
    tenant: 'Rohan & Priya Mehta',
    unit: 'Al-Noor · Unit 6D',
    termLabel: 'Renewal Sent · Pending Sign',
    status: 'Renewal Sent',
    eSignVerified: false,
  },
];

export const DAILY_AUTOMATION_TIMELINE = [
  {
    time: '08:00',
    title: 'Rent reminders dispatched',
    detail: 'Tenants with upcoming PDC & invoices notified',
  },
  {
    time: '10:30',
    title: 'Instant PDF receipt issued',
    detail: 'Meridian 4B payment settled & ledger updated',
  },
  {
    time: '12:15',
    title: 'Vendor ticket routed',
    detail: 'Apex Climate assigned to Meridian 3F HVAC',
  },
  {
    time: '17:30',
    title: 'Owner statement ready',
    detail: 'Monthly collections & expenses summarized',
  },
];
