import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { storeConfig } from '../config/store';
import { useLanguage } from '../i18n/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export const NotFoundPage: React.FC = () => {
  const { localize, t } = useLanguage();

  useDocumentMeta({
    title: `404 – ${t('notFoundTitle')}`,
    description: t('notFoundDescription'),
    path: '/404',
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6 sm:py-20">
      <div className="rounded-2xl border border-[#E6DCD2] bg-white p-8 sm:p-12">
        <img
          src={storeConfig.logoPath}
          alt={localize(storeConfig.storeName)}
          width={72}
          height={72}
          className="mx-auto h-18 w-18 rounded-2xl border border-[#E6DCD2] object-cover bg-[#FDFAF6]"
        />
        <p className="mt-4 text-xs font-bold tracking-widest text-[#7A0B43]">404</p>
        <h1 className="font-display mt-1 text-2xl font-bold text-[#26181D] sm:text-3xl">
          {t('notFoundTitle')}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#6E525B] sm:text-base">
          {t('notFoundDescription')}
        </p>

        <div className="mt-7">
          <Link
            to="/"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#7A0B43] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5E0833] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43]"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>{t('backToHome')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
