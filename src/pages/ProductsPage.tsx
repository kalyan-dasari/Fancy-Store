import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, RotateCcw } from 'lucide-react';
import { AvailabilityFilter, SortOption } from '../types';
import {
  filterAndSortProducts,
  getCategoryById,
  products as allProducts,
} from '../lib/catalogue';
import { useLanguage } from '../i18n/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { CategoryStrip } from '../components/CategoryStrip';
import { ProductCard } from '../components/ProductCard';

const PAGE_SIZE = 12;

export const ProductsPage: React.FC = () => {
  const { language, localize, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [availability, setAvailability] = useState<AvailabilityFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Sync local state if URL search params change (e.g., clicking a footer category link)
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const activeCategoryObj =
    selectedCategory !== 'all' ? getCategoryById(selectedCategory) : undefined;

  useDocumentMeta({
    title: activeCategoryObj
      ? `${localize(activeCategoryObj.name)} – ${t('catalogueHeading')}`
      : t('catalogueHeading'),
    description: activeCategoryObj
      ? localize(activeCategoryObj.description)
      : t('catalogueSubheading'),
    path: '/products',
  });

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts({
        searchQuery,
        categoryId: selectedCategory,
        availability,
        sortBy,
        language,
      }),
    [searchQuery, selectedCategory, availability, sortBy, language]
  );

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const updateUrlParams = (nextCategory: string, nextQuery: string) => {
    const params: Record<string, string> = {};
    if (nextCategory && nextCategory !== 'all') {
      params.category = nextCategory;
    }
    if (nextQuery.trim()) {
      params.q = nextQuery.trim();
    }
    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setVisibleCount(PAGE_SIZE);
    updateUrlParams(categoryId, searchQuery);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(PAGE_SIZE);
    updateUrlParams(selectedCategory, value);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setAvailability('all');
    setSortBy('featured');
    setVisibleCount(PAGE_SIZE);
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    availability !== 'all' ||
    sortBy !== 'featured';

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-[#26181D] sm:text-3xl">
          {activeCategoryObj ? localize(activeCategoryObj.name) : t('catalogueHeading')}
        </h1>
        <p className="mt-1 text-sm text-[#6E525B]">
          {activeCategoryObj
            ? localize(activeCategoryObj.description)
            : t('catalogueSubheading')}
        </p>
      </div>

      {/* Search & Controls Panel */}
      <div className="mb-6 space-y-4 rounded-2xl border border-[#E6DCD2] bg-[#F5EFE6] p-4 sm:p-5">
        {/* Search Input */}
        <div className="relative">
          <label htmlFor="catalogue-search" className="sr-only">
            {t('searchPlaceholder')}
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-[#7A0B43]"
            aria-hidden="true"
          />
          <input
            id="catalogue-search"
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="min-h-[48px] w-full rounded-xl border border-[#D8C8B8] bg-white py-2.5 pr-11 pl-11 text-base text-[#26181D] placeholder:text-[#7D636C] focus:border-[#7A0B43] focus:outline-2 focus:outline-[#7A0B43]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              aria-label={t('clearSearch')}
              className="absolute top-1/2 right-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#6E525B] hover:bg-[#F3ECE4] hover:text-[#26181D]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div>
          <CategoryStrip
            selectedCategoryId={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>

        {/* Availability Filter & Sort Row */}
        <div className="flex flex-col gap-3 border-t border-[#E5D9CD] pt-3.5 sm:flex-row sm:items-center sm:justify-between">
          {/* Availability Segmented Control */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#5A424B]">
              {t('filterAvailability')}:
            </span>
            <div className="inline-flex rounded-lg border border-[#DCD0C4] bg-white p-1">
              <button
                type="button"
                onClick={() => setAvailability('all')}
                className={`min-h-[36px] rounded-md px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  availability === 'all'
                    ? 'bg-[#7A0B43] text-white'
                    : 'text-[#4A323B] hover:bg-[#F5EFE8]'
                }`}
              >
                {t('availabilityAll')}
              </button>
              <button
                type="button"
                onClick={() => setAvailability('available')}
                className={`min-h-[36px] rounded-md px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  availability === 'available'
                    ? 'bg-[#7A0B43] text-white'
                    : 'text-[#4A323B] hover:bg-[#F5EFE8]'
                }`}
              >
                {t('availabilityInStockOnly')}
              </button>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="catalogue-sort"
              className="text-xs font-semibold text-[#5A424B] whitespace-nowrap shrink-0"
            >
              {t('sortBy')}:
            </label>
            <select
              id="catalogue-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="min-h-[44px] flex-1 rounded-xl border border-[#D8C8B8] bg-white px-3.5 py-2 text-sm font-medium text-[#26181D] focus:border-[#7A0B43] focus:outline-2 focus:outline-[#7A0B43] sm:flex-initial"
            >
              <option value="featured">{t('sortFeatured')}</option>
              <option value="price-asc">{t('sortPriceLowHigh')}</option>
              <option value="price-desc">{t('sortPriceHighLow')}</option>
              <option value="name-asc">{t('sortNameAZ')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Count & Reset Action */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-[#5A424B] tabular-nums" aria-live="polite">
          {t('showingCount', {
            shown: visibleProducts.length,
            total: filteredProducts.length,
          })}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#D8C8B8] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#7A0B43] transition-colors hover:bg-[#FDF5F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43] whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t('clearAllFilters')}</span>
          </button>
        )}
      </div>

      {/* Product Grid or Helpful Empty State */}
      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} priority={idx < 4} />
            ))}
          </div>

          {/* Load More Control for Large Catalogues */}
          {visibleCount < filteredProducts.length && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="min-h-[48px] rounded-xl border-2 border-[#7A0B43] bg-white px-6 py-3 text-sm font-bold text-[#7A0B43] transition-colors hover:bg-[#7A0B43] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43]"
              >
                {t('loadMoreProducts')} ({filteredProducts.length - visibleCount})
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-[#E6DCD2] bg-white px-6 py-12 text-center">
          <h2 className="font-display text-xl font-bold text-[#26181D] sm:text-2xl">
            {t('emptySearchTitle')}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#6E525B]">
            {t('emptySearchDescription')}
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#7A0B43] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5E0833] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43]"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>
                {t('clearAllFilters')} ({allProducts.length})
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
