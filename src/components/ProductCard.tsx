import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { formatPriceINR, getCategoryById } from '../lib/catalogue';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

/**
 * Reusable mobile-first ProductCard.
 * Displays product image, category + availability metadata (unboxed text with · separator),
 * localized product name, tabular INR price, and clear touch target to view product details.
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { localize, t } = useLanguage();
  const category = getCategoryById(product.categoryId);
  const productName = localize(product.name);
  const categoryName = category ? localize(category.name) : '';
  const imageSrc = product.thumbnail || product.images[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E6DCD2] bg-white transition-transform duration-150 hover:-translate-y-0.5">
      <Link
        to={`/products/${product.slug}`}
        className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43]"
        aria-label={`${productName} - ${formatPriceINR(product.price)}`}
      >
        <ProductImage
          src={imageSrc}
          alt={productName}
          priority={priority}
          fallbackLabel={productName}
        />

        <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
          <div>
            {/* Clean unboxed metadata with typographic separator */}
            <div className="mb-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-[#6E525B]">
              {categoryName && <span className="truncate">{categoryName}</span>}
              {categoryName && <span aria-hidden="true">·</span>}
              <span
                className={
                  product.available
                    ? 'font-medium text-[#186343]'
                    : 'font-medium text-[#8C3B4A]'
                }
              >
                {product.available ? t('inStock') : t('outOfStock')}
              </span>
            </div>

            {/* Product Name */}
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#26181D] sm:text-base">
              {productName}
            </h3>
          </div>

          {/* Price & View Details Affordance */}
          <div className="mt-3 flex items-center justify-between border-t border-[#F2ECE4] pt-2.5">
            <span className="text-base font-bold text-[#7A0B43] tabular-nums sm:text-lg">
              {formatPriceINR(product.price)}
            </span>

            <span className="inline-flex min-h-[32px] items-center gap-1 text-xs font-semibold text-[#5A3E48] group-hover:text-[#7A0B43] whitespace-nowrap shrink-0">
              <span>{t('viewDetails')}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};
