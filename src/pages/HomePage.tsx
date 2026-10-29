import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { storeConfig } from '../config/store';
import { products } from '../lib/catalogue';
import { useLanguage } from '../i18n/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { CategoryStrip } from '../components/CategoryStrip';
import { ProductCard } from '../components/ProductCard';
import { WhatsAppButton } from '../components/WhatsAppButton';

export const HomePage: React.FC = () => {
  const { localize, t } = useLanguage();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  useDocumentMeta({
    title: `${localize(storeConfig.storeName)} – ${localize(storeConfig.tagline)}`,
    description: t('heroDescription'),
    path: '/',
  });

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const newArrivalProducts = products.filter((p) => p.newArrival).slice(0, 4);
  const browsePreviewProducts = products.slice(0, 8);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchText.trim();
    if (trimmed) {
      navigate(`/products?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <div className="space-y-10 pb-12 sm:space-y-14 sm:pb-16">
      {/* Top Search & Compact Hero Section */}
      <section className="border-b border-[#E6DCD2] bg-[#F5EFE6] pt-4 pb-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Prominent Mobile-First Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            role="search"
            className="mb-6 flex items-center gap-2"
          >
            <label htmlFor="home-product-search" className="sr-only">
              {t('searchPlaceholder')}
            </label>
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-[#7A0B43]"
                aria-hidden="true"
              />
              <input
                id="home-product-search"
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="min-h-[48px] w-full rounded-xl border border-[#D8C8B8] bg-white py-2.5 pr-4 pl-11 text-base text-[#26181D] placeholder:text-[#7D636C] focus:border-[#7A0B43] focus:outline-2 focus:outline-[#7A0B43]"
              />
            </div>
            <button
              type="submit"
              className="min-h-[48px] rounded-xl bg-[#7A0B43] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5E0833] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43] whitespace-nowrap shrink-0 sm:px-6 sm:text-base"
            >
              {t('searchButton')}
            </button>
          </form>

          {/* Compact Storefront Hero Card */}
          <div className="grid grid-cols-1 items-center gap-6 rounded-2xl border border-[#E5D7C8] bg-[#FDFAF6] p-5 sm:p-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold tracking-wider text-[#7A0B43]">
                {t('heroKicker')}
              </p>
              <h1 className="font-display mt-1.5 text-2xl font-bold leading-tight text-[#26181D] sm:text-4xl [text-wrap:balance]">
                {t('heroTitle')}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#523A42] sm:text-base">
                {t('heroDescription')}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  to="/products"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#7A0B43] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5E0833] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43] whitespace-nowrap shrink-0 sm:text-base"
                >
                  <span>{t('exploreProducts')}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-[#D4B8C4] bg-white px-5 py-2.5 text-sm font-semibold text-[#5E0833] transition-colors hover:bg-[#FDF5F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43] whitespace-nowrap shrink-0 sm:text-base"
                >
                  {t('navContact')}
                </Link>
              </div>
            </div>

            {/* Brand Logo Showcase */}
            <div className="flex justify-center lg:col-span-4">
              <div className="w-36 overflow-hidden rounded-2xl border border-[#EADFD4] bg-[#FDFAF6] p-2 shadow-xs sm:w-48 lg:w-56">
                <img
                  src={storeConfig.logoPath}
                  alt={localize(storeConfig.storeName)}
                  width={240}
                  height={240}
                  fetchPriority="high"
                  className="h-auto w-full rounded-xl object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scrollable Category Shortcuts */}
      <section aria-labelledby="categories-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2
            id="categories-heading"
            className="font-display text-xl font-bold text-[#26181D] sm:text-2xl"
          >
            {t('categoriesTitle')}
          </h2>
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#7A0B43] hover:underline whitespace-nowrap shrink-0 sm:text-sm"
          >
            <span>{t('viewAllProducts')}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
        <CategoryStrip />
      </section>

      {/* Featured Products Section */}
      <section aria-labelledby="featured-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-5 flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
          <div>
            <h2
              id="featured-heading"
              className="font-display text-xl font-bold text-[#26181D] sm:text-2xl"
            >
              {t('featuredTitle')}
            </h2>
            <p className="text-xs text-[#6E525B] sm:text-sm">{t('featuredSubtitle')}</p>
          </div>
          <Link
            to="/products"
            className="inline-flex min-h-[36px] items-center gap-1 text-xs font-semibold text-[#7A0B43] hover:underline whitespace-nowrap shrink-0 sm:text-sm"
          >
            <span>{t('viewAllProducts')}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 2} />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section aria-labelledby="new-arrivals-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-5 flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
          <div>
            <h2
              id="new-arrivals-heading"
              className="font-display text-xl font-bold text-[#26181D] sm:text-2xl"
            >
              {t('newArrivalsTitle')}
            </h2>
            <p className="text-xs text-[#6E525B] sm:text-sm">{t('newArrivalsSubtitle')}</p>
          </div>
          <Link
            to="/products"
            className="inline-flex min-h-[36px] items-center gap-1 text-xs font-semibold text-[#7A0B43] hover:underline whitespace-nowrap shrink-0 sm:text-sm"
          >
            <span>{t('viewAllProducts')}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {newArrivalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Browse All Products Section */}
      <section aria-labelledby="browse-all-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-5 flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
          <div>
            <h2
              id="browse-all-heading"
              className="font-display text-xl font-bold text-[#26181D] sm:text-2xl"
            >
              {t('browseAllTitle')}
            </h2>
            <p className="text-xs text-[#6E525B] sm:text-sm">{t('browseAllSubtitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {browsePreviewProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/products"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-[#7A0B43] bg-white px-6 py-3 text-sm font-bold text-[#7A0B43] transition-colors hover:bg-[#7A0B43] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43] sm:text-base"
          >
            <span>
              {t('viewAllProducts')} ({products.length})
            </span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* WhatsApp Contact Section */}
      <section aria-labelledby="whatsapp-cta-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-[#E4D6C8] bg-[#F5EFE6] p-6 sm:p-8">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2
                id="whatsapp-cta-heading"
                className="font-display text-xl font-bold text-[#26181D] sm:text-2xl [text-wrap:balance]"
              >
                {t('whatsappGeneralCtaTitle')}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#523A42] sm:text-base">
                {t('whatsappGeneralCtaBody')}
              </p>
            </div>
            <div className="lg:col-span-5">
              <WhatsAppButton variant="primary" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
