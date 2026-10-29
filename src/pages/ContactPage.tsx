import React from 'react';
import { Phone, MapPin, Clock, ExternalLink, Info } from 'lucide-react';
import { storeConfig } from '../config/store';
import { useLanguage } from '../i18n/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { WhatsAppButton } from '../components/WhatsAppButton';

export const ContactPage: React.FC = () => {
  const { localize, t } = useLanguage();

  useDocumentMeta({
    title: t('contactPageTitle'),
    description: t('contactPageSubtitle'),
    path: '/contact',
  });

  const hasPhone = Boolean(storeConfig.phoneNumber.trim());
  const hasAddress = Boolean(storeConfig.address.en.trim() || storeConfig.address.te?.trim());
  const hasOpeningHours = Boolean(
    storeConfig.openingHours.en.trim() || storeConfig.openingHours.te?.trim()
  );
  const hasMapsUrl = Boolean(storeConfig.googleMapsUrl.trim());
  const isDev = import.meta.env.DEV;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header Banner */}
      <div className="rounded-2xl border border-[#E6DCD2] bg-white p-6 sm:p-8">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <img
            src={storeConfig.logoPath}
            alt={localize(storeConfig.storeName)}
            width={88}
            height={88}
            className="h-20 w-20 rounded-2xl border border-[#E6DCD2] object-cover shrink-0 bg-[#FDFAF6]"
          />
          <div>
            <h1 className="font-display text-2xl font-bold text-[#26181D] sm:text-3xl">
              {t('contactPageTitle')}
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-[#523A42] sm:text-base">
              {t('contactPageSubtitle')}
            </p>
          </div>
        </div>

        {/* WhatsApp Contact Card */}
        <div className="mt-6 rounded-xl border border-[#E5D7C8] bg-[#F5EFE6] p-5 sm:p-6">
          <h2 className="font-display text-xl font-bold text-[#26181D]">
            {t('contactWhatsAppCardTitle')}
          </h2>
          <p className="mt-1 text-sm text-[#5A424B]">{t('contactWhatsAppCardDesc')}</p>
          <div className="mt-4">
            <WhatsAppButton variant="primary" showMessagePreview />
          </div>
        </div>

        {/* Shop Details Section */}
        <div className="mt-8">
          <h2 className="font-display text-xl font-bold text-[#26181D]">
            {t('contactDetailsHeading')}
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Phone Number */}
            <div className="rounded-xl border border-[#ECE2D8] bg-[#FDFAF6] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#7A0B43]">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t('phoneLabel')}</span>
              </div>
              {hasPhone ? (
                <a
                  href={`tel:${storeConfig.phoneNumber.replace(/\s+/g, '')}`}
                  className="mt-2 block text-base font-semibold text-[#26181D] tabular-nums hover:text-[#7A0B43] hover:underline"
                >
                  {storeConfig.phoneNumber}
                </a>
              ) : (
                <p className="mt-2 text-xs leading-relaxed text-[#6E525B]">
                  {t('notConfiguredYet')}
                </p>
              )}
            </div>

            {/* Shop Address */}
            <div className="rounded-xl border border-[#ECE2D8] bg-[#FDFAF6] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#7A0B43]">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t('addressLabel')}</span>
              </div>
              {hasAddress ? (
                <p className="mt-2 text-sm leading-relaxed text-[#26181D]">
                  {localize(storeConfig.address)}
                </p>
              ) : (
                <p className="mt-2 text-xs leading-relaxed text-[#6E525B]">
                  {t('notConfiguredYet')}
                </p>
              )}

              {hasMapsUrl && (
                <a
                  href={storeConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold text-[#7A0B43] hover:underline"
                >
                  <span>{t('directionsButton')}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>

            {/* Opening Hours */}
            <div className="rounded-xl border border-[#ECE2D8] bg-[#FDFAF6] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#7A0B43]">
                <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t('openingHoursLabel')}</span>
              </div>
              {hasOpeningHours ? (
                <p className="mt-2 text-sm leading-relaxed text-[#26181D]">
                  {localize(storeConfig.openingHours)}
                </p>
              ) : (
                <p className="mt-2 text-xs leading-relaxed text-[#6E525B]">
                  {t('notConfiguredYet')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Development Configuration Note (Only shown when shop details are still blank in dev) */}
        {isDev && (!hasPhone || !hasAddress || !storeConfig.whatsappNumber) && (
          <div className="mt-8 rounded-xl border border-[#E4D4C6] bg-[#FAF5EE] p-4 text-xs text-[#5A424B]">
            <div className="flex items-start gap-2.5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#7A0B43]" aria-hidden="true" />
              <div>
                <p className="font-bold text-[#26181D]">{t('ownerConfigGuideTitle')}</p>
                <p className="mt-1 leading-relaxed">{t('ownerConfigGuideBody')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
