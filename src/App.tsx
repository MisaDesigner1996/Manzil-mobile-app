import { useEffect, useRef, useState } from 'react';
import {
  CategoryRecord,
  MANAGEMENT_CATEGORIES,
  ManagementCategory,
  MarketIntent,
  PropertyListing,
} from './data/manzilData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryCard } from './components/CategoryCard';
import { MenuDrawer } from './components/MenuDrawer';
import { AppSettings } from './components/SettingsSheet';
import { MobileBottomDock, MobileDockTab } from './components/MobileBottomDock';
import { ListingsScreen } from './components/MobileViews/ListingsScreen';
import { ManageDirectoryScreen } from './components/MobileViews/ManageDirectoryScreen';
import { CategoryScreen } from './components/MobileViews/CategoryScreen';
import { DesignOption, SettingsScreen } from './components/MobileViews/SettingsScreen';
import { TourSheet } from './components/TourSheet';
import { HeaderOptionTwo } from './components/OptionTwo/HeaderOptionTwo';
import { HomeOptionTwo } from './components/OptionTwo/HomeOptionTwo';
import { BottomTabBarOptionTwo } from './components/OptionTwo/BottomTabBarOptionTwo';
import { HeaderOptionThree } from './components/OptionThree/HeaderOptionThree';
import { HomeOptionThree } from './components/OptionThree/HomeOptionThree';
import { BottomBarOptionThree } from './components/OptionThree/BottomBarOptionThree';
import { HeaderOptionFour } from './components/OptionFour/HeaderOptionFour';
import { HomeOptionFour } from './components/OptionFour/HomeOptionFour';
import { BottomBarOptionFour } from './components/OptionFour/BottomBarOptionFour';
import { HeaderOptionFive } from './components/OptionFive/HeaderOptionFive';
import { HomeOptionFive } from './components/OptionFive/HomeOptionFive';
import { BottomBarOptionFive } from './components/OptionFive/BottomBarOptionFive';

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [designOption, setDesignOption] = useState<DesignOption>('option5');
  const [activeIntent, setActiveIntent] = useState<MarketIntent>('all');
  const [activeTab, setActiveTab] = useState<MobileDockTab>('home');
  const [activeCategory, setActiveCategory] =
    useState<ManagementCategory | null>(null);
  const [highlightedListingId, setHighlightedListingId] = useState<
    string | null
  >(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [customRecords, setCustomRecords] = useState<
    Record<string, CategoryRecord[]>
  >({});
  const [settings, setSettings] = useState<AppSettings>({
    currency: 'USD',
    paymentReminders: true,
    compactView: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsTourOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddRecord = (categoryId: string, record: CategoryRecord) => {
    setCustomRecords((prev) => ({
      ...prev,
      [categoryId]: [record, ...(prev[categoryId] || [])],
    }));
  };

  const navigateToTab = (tab: MobileDockTab) => {
    setActiveCategory(null);
    setHighlightedListingId(null);
    setActiveTab(tab);
    if (tab === 'home') {
      setActiveIntent('all');
    } else if (tab === 'rent') {
      setActiveIntent('rent');
    } else if (tab === 'buy') {
      setActiveIntent('buy');
    }
    scrollToTop();
  };

  const openCategoryDetail = (category: ManagementCategory) => {
    setActiveTab('manage');
    setActiveCategory(category);
    scrollToTop();
  };

  const openListingsFor = (
    intent: 'rent' | 'buy',
    listing?: PropertyListing
  ) => {
    setActiveCategory(null);
    setActiveIntent(intent);
    setHighlightedListingId(listing ? listing.id : null);
    setActiveTab(intent);
    scrollToTop();
  };

  const formatCategoryForDisplay = (
    cat: ManagementCategory
  ): ManagementCategory => {
    const addedCount = (customRecords[cat.id] || []).length;
    const currencySymbol =
      settings.currency === 'USD' ? '$' : `${settings.currency} `;

    let countLabel = cat.countLabel;
    if (addedCount > 0) {
      countLabel = `${cat.countLabel} · +${addedCount}`;
    } else if (
      (cat.id === 'payments' || cat.id === 'expenses') &&
      settings.currency !== 'USD'
    ) {
      countLabel =
        cat.id === 'payments'
          ? `${currencySymbol}148.6k`
          : `${currencySymbol}19.4k`;
    }

    return {
      ...cat,
      countLabel,
    };
  };

  const formattedCategories = MANAGEMENT_CATEGORIES.map(formatCategoryForDisplay);

  const customRecordCounts = Object.fromEntries(
    Object.entries(customRecords).map(([k, v]) => [k, v.length])
  );

  const optionTabs: { id: DesignOption; label: string }[] = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
    { id: 'option4', label: 'Option 4' },
    { id: 'option5', label: 'Option 5' },
  ];

  return (
    <div className="min-h-dvh w-full bg-[#EFEBF6] flex flex-col items-center justify-center gap-3 py-2 sm:py-3 px-2">
      {/* External Design Option Selection Tabs */}
      <div
        role="tablist"
        aria-label="Design option selector"
        className="w-full max-w-[440px] bg-white/95 backdrop-blur-md p-1 rounded-2xl shadow-[0_6px_20px_-6px_rgba(69,49,120,0.14)] border border-[#E5E1EE] grid grid-cols-5 gap-1 shrink-0"
      >
        {optionTabs.map((opt) => {
          const isActive = designOption === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setDesignOption(opt.id);
                navigateToTab('home');
              }}
              className={`min-h-[40px] px-1 rounded-xl text-[11.5px] sm:text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#453178] ${
                isActive
                  ? 'bg-[#453178] text-white shadow-sm'
                  : 'text-[#6E6B7B] hover:text-[#1F1738] hover:bg-[#F6F4FA]'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* iPhone 17 Portrait App Canvas: Fixed 440px x 956px */}
      <div
        className={`relative w-full max-w-[440px] h-[calc(100dvh-68px)] sm:h-[956px] sm:max-h-[calc(100dvh-80px)] text-[#1F1738] rounded-[36px] sm:rounded-[52px] shadow-[0_30px_90px_-18px_rgba(31,23,56,0.28)] ring-[6px] sm:ring-[9px] ring-[#1F1738] flex flex-col overflow-hidden ${
          designOption === 'option4'
            ? 'bg-white'
            : designOption === 'option5' ||
                designOption === 'option3' ||
                designOption === 'option2'
              ? 'bg-[#FAF9FC]'
              : 'bg-[#F7F6FA]'
        }`}
      >
        {designOption === 'option5' ? (
          <HeaderOptionFive
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenSettings={() => navigateToTab('settings')}
            onScrollHome={() => navigateToTab('home')}
          />
        ) : designOption === 'option4' ? (
          <HeaderOptionFour
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenSettings={() => navigateToTab('settings')}
            onScrollHome={() => navigateToTab('home')}
          />
        ) : designOption === 'option3' ? (
          <HeaderOptionThree
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenSettings={() => navigateToTab('settings')}
            onScrollHome={() => navigateToTab('home')}
          />
        ) : designOption === 'option2' ? (
          <HeaderOptionTwo
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenSettings={() => navigateToTab('settings')}
            onScrollHome={() => navigateToTab('home')}
          />
        ) : (
          <Header
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenSettings={() => navigateToTab('settings')}
            onScrollHome={() => navigateToTab('home')}
          />
        )}

        {/* Native iOS Screen Router Viewport */}
        <main
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar"
        >
          {activeCategory ? (
            <CategoryScreen
              category={activeCategory}
              customRecords={customRecords[activeCategory.id] || []}
              onAddRecord={handleAddRecord}
              onBack={() => {
                setActiveCategory(null);
                scrollToTop();
              }}
            />
          ) : activeTab === 'rent' || activeTab === 'buy' ? (
            <ListingsScreen
              intent={activeTab}
              highlightedListingId={highlightedListingId}
              onSwitchIntent={(nextIntent) => {
                setHighlightedListingId(null);
                setActiveIntent(nextIntent);
                setActiveTab(nextIntent);
              }}
            />
          ) : activeTab === 'manage' ? (
            <ManageDirectoryScreen
              onSelectCategory={openCategoryDetail}
              customRecordCounts={customRecordCounts}
            />
          ) : activeTab === 'settings' ? (
            <SettingsScreen
              settings={settings}
              onUpdateSettings={setSettings}
            />
          ) : designOption === 'option5' ? (
            <HomeOptionFive
              categories={formattedCategories}
              onSelectCategory={openCategoryDetail}
              onOpenRent={() => openListingsFor('rent')}
              onOpenBuy={() => openListingsFor('buy')}
              onOpenTour={() => setIsTourOpen(true)}
              compactView={settings.compactView}
            />
          ) : designOption === 'option4' ? (
            <HomeOptionFour
              categories={formattedCategories}
              onSelectCategory={openCategoryDetail}
              onOpenRent={() => openListingsFor('rent')}
              onOpenBuy={() => openListingsFor('buy')}
              onOpenTour={() => setIsTourOpen(true)}
              compactView={settings.compactView}
            />
          ) : designOption === 'option3' ? (
            <HomeOptionThree
              categories={formattedCategories}
              onSelectCategory={openCategoryDetail}
              onOpenRent={() => openListingsFor('rent')}
              onOpenBuy={() => openListingsFor('buy')}
              onOpenTour={() => setIsTourOpen(true)}
              compactView={settings.compactView}
            />
          ) : designOption === 'option2' ? (
            <HomeOptionTwo
              activeIntent={activeIntent}
              onSelectIntent={setActiveIntent}
              categories={formattedCategories}
              onSelectCategory={openCategoryDetail}
              onOpenListings={openListingsFor}
              onOpenManageDirectory={() => navigateToTab('manage')}
              onOpenTour={() => setIsTourOpen(true)}
              onOpenSettings={() => navigateToTab('settings')}
              compactView={settings.compactView}
            />
          ) : (
            /* Option 1 Home Screen */
            <>
              <HeroSection
                activeIntent={activeIntent}
                onSelectIntent={setActiveIntent}
                onOpenListings={openListingsFor}
                onOpenTour={() => setIsTourOpen(true)}
              />

              <section
                id="property-management"
                aria-labelledby="property-management-heading"
                className="px-5 pt-1 pb-5"
              >
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <div>
                    <h2
                      id="property-management-heading"
                      className="font-display text-[19px] font-bold tracking-tight text-[#1F1738]"
                    >
                      Property Management
                    </h2>
                    <p className="text-[12px] text-[#6E6B7B] mt-0.5">
                      {settings.paymentReminders
                        ? '6 modules · 2 due alerts'
                        : '6 active modules'}
                    </p>
                  </div>

                  <span className="text-[11px] font-semibold text-[#6E6B7B] tabular-nums">
                    {settings.currency}
                  </span>
                </div>

                <div
                  className={`grid grid-cols-2 ${
                    settings.compactView ? 'gap-2.5' : 'gap-3.5'
                  }`}
                >
                  {formattedCategories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      onSelect={openCategoryDetail}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </main>

        {/* Bottom Navigation Bar matching active option */}
        {designOption === 'option5' ? (
          <BottomBarOptionFive
            activeTab={activeTab}
            onSelectTab={navigateToTab}
          />
        ) : designOption === 'option4' ? (
          <BottomBarOptionFour
            activeTab={activeTab}
            onSelectTab={navigateToTab}
          />
        ) : designOption === 'option3' ? (
          <BottomBarOptionThree
            activeTab={activeTab}
            onSelectTab={navigateToTab}
          />
        ) : designOption === 'option2' ? (
          <BottomTabBarOptionTwo
            activeTab={activeTab}
            onSelectTab={navigateToTab}
          />
        ) : (
          <MobileBottomDock
            activeTab={activeTab}
            onSelectTab={navigateToTab}
          />
        )}

        {/* Slide-Over App Navigation Drawer */}
        <MenuDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onSelectHome={() => navigateToTab('home')}
          onSelectCategory={openCategoryDetail}
          onOpenListings={(mode) => openListingsFor(mode)}
          onOpenSettings={() => navigateToTab('settings')}
          designOption={designOption}
          onChangeDesignOption={(opt) => {
            setDesignOption(opt);
            navigateToTab('home');
          }}
        />

        {/* Hero Play Overview Sheet */}
        <TourSheet
          isOpen={isTourOpen}
          onClose={() => setIsTourOpen(false)}
          onSelectRent={() => openListingsFor('rent')}
          onSelectBuy={() => openListingsFor('buy')}
          onSelectManage={() => navigateToTab('manage')}
        />
      </div>
    </div>
  );
}
