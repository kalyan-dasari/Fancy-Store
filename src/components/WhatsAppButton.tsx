import React, { useState } from 'react';
import { MessageCircle, Copy, Check, Info } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '../lib/catalogue';

interface WhatsAppButtonProps {
  product?: Product;
  variant?: 'primary' | 'compact' | 'banner';
  showMessagePreview?: boolean;
  className?: string;
}

/**
 * Reusable WhatsApp enquiry component.
 * - Uses the standard `https://wa.me/` click-to-chat URL with properly URL-encoded text.
 * - Never sends a message automatically.
 * - If the shop's WhatsApp number is not yet configured in `src/config/store.ts`,
 *   gracefully disables the external link so no broken URL is generated, and allows
 *   copying the prefilled enquiry message.
 */
export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  product,
  variant = 'primary',
  showMessagePreview = false,
  className = '',
}) => {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const message = buildWhatsAppMessage(product, language);
  const whatsappUrl = buildWhatsAppUrl(message);

  const buttonLabel = product
    ? product.available
      ? t('enquireWhatsAppProduct')
      : t('enquireOutOfStockWhatsApp')
    : t('whatsappGeneralButton');

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older Android browsers
      const textArea = document.createElement('textarea');
      textArea.value = message;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  if (variant === 'compact') {
    if (whatsappUrl) {
      return (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#196B43] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#135535] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#196B43] whitespace-nowrap shrink-0 ${className}`}
        >
          <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{buttonLabel}</span>
        </a>
      );
    }

    return (
      <button
        type="button"
        onClick={handleCopyMessage}
        className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#D8C9BC] bg-[#F7F2EB] px-4 py-2.5 text-sm font-semibold text-[#4A323B] transition-colors hover:bg-[#EFE6DC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43] whitespace-nowrap shrink-0 ${className}`}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 shrink-0 text-[#196B43]" aria-hidden="true" />
            <span>{t('copiedMessageFeedback')}</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 shrink-0 text-[#7A0B43]" aria-hidden="true" />
            <span>{t('copyMessageButton')}</span>
          </>
        )}
      </button>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {whatsappUrl ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#196B43] px-5 py-3 text-base font-semibold text-white shadow-xs transition-colors hover:bg-[#135535] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#196B43]"
        >
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="truncate">{buttonLabel}</span>
        </a>
      ) : (
        <div className="rounded-xl border border-[#E5D7C8] bg-[#FBF7F2] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="flex min-h-[48px] w-full cursor-not-allowed items-center justify-center gap-2.5 rounded-xl bg-[#E6DCD2] px-5 py-3 text-sm font-semibold text-[#665058] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="truncate">{buttonLabel}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#7A0B43] bg-white px-4 py-2.5 text-sm font-semibold text-[#7A0B43] transition-colors hover:bg-[#FDF5F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43] whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 shrink-0 text-[#196B43]" aria-hidden="true" />
                  <span>{t('copiedMessageFeedback')}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t('copyMessageButton')}</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-2.5 flex items-start gap-2 text-xs leading-relaxed text-[#6E525B]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#7A0B43]" aria-hidden="true" />
            <span>{t('whatsappNotConfiguredNote')}</span>
          </p>
        </div>
      )}

      {showMessagePreview && (
        <div className="rounded-xl border border-[#ECE2D8] bg-white p-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-[#6E525B]">
              {t('whatsappMessagePreviewLabel')}
            </span>
            {whatsappUrl && (
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#7A0B43] hover:underline whitespace-nowrap shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t('copiedMessageFeedback')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t('copyMessageButton')}</span>
                  </>
                )}
              </button>
            )}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-[#26181D] select-all">
            “{message}”
          </p>
          <p className="mt-1 text-xs text-[#7D636C]">{t('whatsappPrefillNote')}</p>
        </div>
      )}
    </div>
  );
};
