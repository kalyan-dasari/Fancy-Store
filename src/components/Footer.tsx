import React from 'react';
import { Link } from 'react-router-dom';
import { storeConfig } from '../config/store';
import { categories } from '../lib/catalogue';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { localize, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const hasAddress = Boolean(storeConfig.address.en || storeConfig.address.te);
  const hasPhone = Boolean(storeConfig.phoneNumber);
  const hasHours = Boolean(storeConfig.openingHours.en || storeConfig.openingHours.te);

  return (
    <footer className="border-t border-[#E6DCD2] bg-[#F4EFE8] text-[#3D2830]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Brand & Description */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={storeConfig.logoPath}
                alt={localize(storeConfig.storeName)}
                width={52}
                height={52}
                loading="lazy"
                className="h-13 w-13 rounded-xl border border-[#E6DCD2] object-cover bg-[#FDFAF6]"
              />
              <div>
                <span className="font-display block text-xl font-bold text-[#5E0833]">
                  {localize(storeConfig.storeName)}
                </span>
                <span className="text-xs text-[#6E525B]">
                  {localize(storeConfig.tagline)}
                </span>
              </div>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#5A424B]">
              {t('footerTagline')}
            </p>

            {(hasAddress || hasPhone || hasHours) && (
              <dl className="mt-4 space-y-1.5 text-xs text-[#5A424B]">
                {hasAddress && (
                  <div>
                    <dt className="inline font-semibold">{t('addressLabel')}: </dt>
                    <dd className="inline">{localize(storeConfig.address)}</dd>
                  </div>
                )}
                {hasPhone && (
                  <div>
                    <dt className="inline font-semibold">{t('phoneLabel')}: </dt>
                    <dd className="inline tabular-nums">{storeConfig.phoneNumber}</dd>
                  </div>
                )}
                {hasHours && (
                  <div>
                    <dt className="inline font-semibold">{t('openingHoursLabel')}: </dt>
                    <dd className="inline">{localize(storeConfig.openingHours)}</dd>
                  </div>
                )}
              </dl>
            )}
          </div>

          {/* Column 2: Categories */}
          <div>
            <h2 className="text-sm font-bold tracking-wide text-[#26181D]">
              {t('categoriesHeading')}
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat.id)}`}
                    className="inline-block py-1 text-[#5A424B] hover:text-[#7A0B43] hover:underline"
                  >
                    {localize(cat.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h2 className="text-sm font-bold tracking-wide text-[#26181D]">
              {t('quickLinks')}
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="inline-block py-1 text-[#5A424B] hover:text-[#7A0B43] hover:underline"
                >
                  {t('navHome')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="inline-block py-1 text-[#5A424B] hover:text-[#7A0B43] hover:underline"
                >
                  {t('navProducts')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="inline-block py-1 text-[#5A424B] hover:text-[#7A0B43] hover:underline"
                >
                  {t('navContact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[#E4D8CD] pt-6 text-center text-xs text-[#6E525B]">
          <p>
            © {currentYear} {t('copyrightText')}
          </p>
        </div>
      </div>
    </footer>
  );
};
