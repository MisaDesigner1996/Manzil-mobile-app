export type CategoryId =
  | 'owners'
  | 'buildings'
  | 'tenants'
  | 'vendors'
  | 'payments'
  | 'expenses';

export type MarketIntent = 'all' | 'rent' | 'buy';

export interface PropertyListing {
  id: string;
  intent: 'rent' | 'buy';
  title: string;
  location: string;
  priceLabel: string;
  cadence: string;
  beds: number;
  baths: number;
  areaSqFt: number;
  image: string;
  highlight: string;
}

export interface CategoryRecord {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  status: 'Active' | 'Paid' | 'Scheduled' | 'Due Soon' | 'Completed' | 'Verified';
}

export interface ManagementCategory {
  id: CategoryId;
  label: string;
  summary: string;
  countLabel: string;
  image: string;
  imageAlt: string;
  accentColor: 'teal' | 'purple' | 'navy';
  records: CategoryRecord[];
  ctaLabel: string;
}

export const MANZIL_LOGO_URL = '/assets/aistudio/manzil_logo_transparent_9f6b6dbe.png';

export const HERO_FEATURED_IMAGES = {
  all: '/src/assets/images/hero_property_residence_1795517784131.jpg',
  rent: '/src/assets/images/property_rent_suite_1795517786003.jpg',
  buy: '/src/assets/images/property_buy_villa_1795517786313.jpg',
};

export const PROPERTY_LISTINGS: PropertyListing[] = [
  {
    id: 'prop-1',
    intent: 'rent',
    title: 'The Meridian Sky Residence',
    location: 'Downtown District',
    priceLabel: '$3,850',
    cadence: '/month',
    beds: 3,
    baths: 2.5,
    areaSqFt: 1940,
    image: '/src/assets/images/property_rent_suite_1795517786003.jpg',
    highlight: 'Available Now',
  },
  {
    id: 'prop-2',
    intent: 'buy',
    title: 'Cedarwood Architectural Villa',
    location: 'Westridge Estates',
    priceLabel: '$1,280,000',
    cadence: 'Freehold',
    beds: 4,
    baths: 3.5,
    areaSqFt: 3420,
    image: '/src/assets/images/property_buy_villa_1795517786313.jpg',
    highlight: 'New Listing',
  },
  {
    id: 'prop-3',
    intent: 'buy',
    title: 'Marina Horizon Estate',
    location: 'Harbor View Terrace',
    priceLabel: '$2,150,000',
    cadence: 'Turnkey',
    beds: 5,
    baths: 4.5,
    areaSqFt: 4280,
    image: '/src/assets/images/hero_property_residence_1795517784131.jpg',
    highlight: 'Featured',
  },
];

export const MANAGEMENT_CATEGORIES: ManagementCategory[] = [
  {
    id: 'owners',
    label: 'Owners',
    summary: '18 portfolio owners · 98% payout settled',
    countLabel: '18 Owners',
    image: '/src/assets/images/category_owners_1795517783823.jpg',
    imageAlt: 'Property owner holding brass keys over architectural blueprints',
    accentColor: 'navy',
    ctaLabel: 'Add Owner',
    records: [
      {
        id: 'own-1',
        title: 'Tariq Al-Mansoor',
        subtitle: '4 Buildings · 36 Units',
        metric: '$48,200/mo',
        status: 'Verified',
      },
      {
        id: 'own-2',
        title: 'Nadia & Associates',
        subtitle: '2 Buildings · 22 Units',
        metric: '$29,450/mo',
        status: 'Active',
      },
      {
        id: 'own-3',
        title: 'Farhan Siddiqui',
        subtitle: '3 Villas · Residential',
        metric: '$18,900/mo',
        status: 'Verified',
      },
      {
        id: 'own-4',
        title: 'Crescent Capital Holdings',
        subtitle: '3 Buildings · 44 Units',
        metric: '$62,100/mo',
        status: 'Active',
      },
    ],
  },
  {
    id: 'buildings',
    label: 'Buildings',
    summary: '12 properties · 148 residential units',
    countLabel: '12 Buildings',
    image: '/src/assets/images/category_buildings_1795517784758.jpg',
    imageAlt: 'Modern multi-story residential apartment buildings with glass balconies',
    accentColor: 'teal',
    ctaLabel: 'Add Building',
    records: [
      {
        id: 'bld-1',
        title: 'The Meridian Courtyard',
        subtitle: '36 Units · 97% Occupied',
        metric: '35/36',
        status: 'Active',
      },
      {
        id: 'bld-2',
        title: 'Al-Noor Residences',
        subtitle: '24 Units · 100% Occupied',
        metric: '24/24',
        status: 'Active',
      },
      {
        id: 'bld-3',
        title: 'Oakwood Terrace',
        subtitle: '18 Units · 94% Occupied',
        metric: '17/18',
        status: 'Active',
      },
      {
        id: 'bld-4',
        title: 'Harbor Heights Tower',
        subtitle: '42 Units · 95% Occupied',
        metric: '40/42',
        status: 'Verified',
      },
    ],
  },
  {
    id: 'tenants',
    label: 'Tenants',
    summary: '142 active leases · 3 renewals due',
    countLabel: '142 Tenants',
    image: '/src/assets/images/category_tenants_1795517785115.jpg',
    imageAlt: 'Sunlit modern apartment living room interior with linen sofa and indoor plants',
    accentColor: 'teal',
    ctaLabel: 'Add Tenant',
    records: [
      {
        id: 'ten-1',
        title: 'Amina & Yusuf Kareem',
        subtitle: 'Meridian · Unit 4B',
        metric: '$2,450/mo',
        status: 'Active',
      },
      {
        id: 'ten-2',
        title: 'Daniel Mercer',
        subtitle: 'Oakwood · Unit 2A',
        metric: '$1,980/mo',
        status: 'Due Soon',
      },
      {
        id: 'ten-3',
        title: 'Sara Haddad',
        subtitle: 'Harbor Heights · Unit 11C',
        metric: '$3,100/mo',
        status: 'Active',
      },
      {
        id: 'ten-4',
        title: 'Rohan & Priya Mehta',
        subtitle: 'Al-Noor · Unit 6D',
        metric: '$2,650/mo',
        status: 'Verified',
      },
    ],
  },
  {
    id: 'vendors',
    label: 'Vendors',
    summary: '24 certified partners · 4 open requests',
    countLabel: '24 Vendors',
    image: '/src/assets/images/category_vendors_1795517784772.jpg',
    imageAlt: 'Facility maintenance specialist inspecting modern residential control panel with tablet',
    accentColor: 'purple',
    ctaLabel: 'Assign Vendor',
    records: [
      {
        id: 'ven-1',
        title: 'Apex Climate & HVAC',
        subtitle: 'Mechanical · Meridian 3F',
        metric: '4.9 ★',
        status: 'Scheduled',
      },
      {
        id: 'ven-2',
        title: 'ClearLine Plumbing Co.',
        subtitle: 'Hydro & Piping · Oakwood',
        metric: '4.8 ★',
        status: 'Completed',
      },
      {
        id: 'ven-3',
        title: 'Vanguard Electrical Grid',
        subtitle: 'Smart Metering · Harbor',
        metric: '4.9 ★',
        status: 'Verified',
      },
      {
        id: 'ven-4',
        title: 'GreenScape Grounds',
        subtitle: 'Landscaping · Weekly',
        metric: '4.7 ★',
        status: 'Active',
      },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    summary: '$148,650 collected · 96% on time',
    countLabel: 'Monthly Rent',
    image: '/src/assets/images/category_payments_1795517785666.jpg',
    imageAlt: 'Modern smartphone displaying property financial report next to navy leather portfolio',
    accentColor: 'purple',
    ctaLabel: 'Record Payment',
    records: [
      {
        id: 'pay-1',
        title: 'Meridian Unit 4B Rent',
        subtitle: 'Amina Kareem · Nov 01',
        metric: '+$2,450.00',
        status: 'Paid',
      },
      {
        id: 'pay-2',
        title: 'Harbor Heights Unit 11C',
        subtitle: 'Sara Haddad · Nov 02',
        metric: '+$3,100.00',
        status: 'Paid',
      },
      {
        id: 'pay-3',
        title: 'Oakwood Unit 2A Rent',
        subtitle: 'Daniel Mercer · Due Nov 25',
        metric: '$1,980.00',
        status: 'Due Soon',
      },
      {
        id: 'pay-4',
        title: 'Al-Noor Unit 6D Rent',
        subtitle: 'Rohan Mehta · Nov 01',
        metric: '+$2,650.00',
        status: 'Paid',
      },
    ],
  },
  {
    id: 'expenses',
    label: 'Expenses',
    summary: '$19,420 month-to-date · Within budget',
    countLabel: 'Ledger',
    image: '/src/assets/images/category_expenses_1795517786094.jpg',
    imageAlt: 'Architectural budget ledger papers, metal calculator, and deep teal dossier on marble desk',
    accentColor: 'navy',
    ctaLabel: 'Log Expense',
    records: [
      {
        id: 'exp-1',
        title: 'HVAC Seasonal Service',
        subtitle: 'The Meridian · Invoice #408',
        metric: '-$1,840.00',
        status: 'Paid',
      },
      {
        id: 'exp-2',
        title: 'Courtyard Lighting Upgrade',
        subtitle: 'Al-Noor · Invoice #412',
        metric: '-$3,250.00',
        status: 'Completed',
      },
      {
        id: 'exp-3',
        title: 'Municipal Water & Waste',
        subtitle: 'Portfolio Utility · Nov',
        metric: '-$4,620.00',
        status: 'Scheduled',
      },
      {
        id: 'exp-4',
        title: 'Building Insurance Q4',
        subtitle: 'Oakwood Terrace · Policy',
        metric: '-$2,950.00',
        status: 'Paid',
      },
    ],
  },
];
