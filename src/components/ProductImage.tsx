import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ProductImageProps {
  src?: string;
  alt: string;
  priority?: boolean;
  className?: string;
  fallbackLabel?: string;
}

/**
 * Reserves 1:1 square image space to prevent layout shifts (CLS),
 * uses native lazy loading for below-the-fold images, and provides
 * a designed local fallback card if an image is missing or fails to load.
 */
export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  priority = false,
  className = '',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  const showFallback = !src || hasError;

  return (
    <div
      className={`relative aspect-square w-full overflow-hidden bg-[#F5EFE6] ${className}`}
    >
      {!showFallback ? (
        <img
          src={src}
          alt={alt}
          width={600}
          height={600}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center bg-[#F4EAE1] p-4 text-center"
        >
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF7F2] text-[#7A0B43]">
            <Sparkles className="h-6 w-6" aria-hidden="true" />
          </div>
          <span className="line-clamp-2 text-xs font-medium text-[#5A424B]">
            {fallbackLabel || alt}
          </span>
          <span className="mt-1 text-[11px] text-[#846872]">MAHA Fancy Store</span>
        </div>
      )}
    </div>
  );
};
