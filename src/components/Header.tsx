import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { storeConfig } from '../config/store';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * Mobile-first Header adhering to the 3-zone Top Bar Contract:
 * Zone 1: Brand mark (MAHA Fancy Store logo + wordmark)
 * Zone 2: Concise single-line navigation links
 * Zone 3: Language toggle button (EN / తెలుగు) with >= 44x44px touch target
 */
export const Header: React.FC = () => {
  const { language, toggleLanguage, t, localize } = useLanguage();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex min-h-[44px] items-center px-1 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 border-b-2 ${
      isActive
        ? 'border-[#7A0B43] text-[#7A0B43]'
        : 'border-transparent text-[#4A323B] hover:text-[#7A0B43]'
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-[#E6DCD2] bg-[#FAF7F2]/95 backdrop-blur-xs">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-[#7A0B43] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t('skipToContent')}
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:gap-8 sm:px-6">
        {/* Zone 1: Brand Wordmark + Uploaded Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43]"
        >
          <img
            src={storeConfig.logoPath}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg border border-[#E6DCD2] object-cover shrink-0 bg-[#FDFAF6]"
          />
          <span className="font-display text-lg font-bold tracking-tight text-[#5E0833] sm:text-xl">
            {localize(storeConfig.storeName)}
          </span>
        </Link>

        {/* Zone 2: Navigation Links (Desktop inline) */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-6 text-sm font-medium"
        >
          <NavLink to="/" end className={navLinkClass}>
            {t('navHome')}
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            {t('navProducts')}
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            {t('navContact')}
          </NavLink>
        </nav>

        {/* Zone 3: Language Switcher (EN / తెలుగు) */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t('languageToggleAria')}
            className="inline-flex min-h-[44px] min-w-[88px] items-center justify-center gap-1.5 rounded-lg border border-[#D4B8C4] bg-white px-3 py-2 text-xs font-bold text-[#7A0B43] transition-colors hover:bg-[#FDF5F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43] whitespace-nowrap shrink-0 sm:text-sm"
          >
            <span className={language === 'en' ? 'underline decoration-2 underline-offset-4' : 'opacity-65'}>
              EN
            </span>
            <span aria-hidden="true" className="text-[#C7B2BA]">
              /
            </span>
            <span className={language === 'te' ? 'underline decoration-2 underline-offset-4' : 'opacity-65'}>
              తెలుగు
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Navigation Strip (Visible on <768px for 1-tap page switching without hamburger menus) */}
      <nav
        aria-label="Mobile"
        className="flex md:hidden items-center justify-around border-t border-[#ECE3DA] bg-white px-2"
      >
        <NavLink to="/" end className={navLinkClass}>
          {t('navHome')}
        </NavLink>
        <NavLink to="/products" className={navLinkClass}>
          {t('navProducts')}
        </NavLink>
        <NavLink to="/contact" className={navLinkClass}>
          {t('navContact')}
        </NavLink>
      </nav>
    </header>
  );
};
