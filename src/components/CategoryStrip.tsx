import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../lib/catalogue';
import { useLanguage } from '../i18n/LanguageContext';
import { ProductImage } from './ProductImage';

interface CategoryStripProps {
  selectedCategoryId?: string;
  onSelectCategory?: (categoryId: string) => void;
}

/**
 * Horizontal scrollable category shortcut bar on mobile, and clean 5-column strip on desktop.
 * Can either link directly to `/products?category=<id>` (on Home) or filter in-place (on Products page).
 */
export const CategoryStrip: React.FC<CategoryStripProps> = ({
  selectedCategoryId,
  onSelectCategory,
}) => {
  const { localize, t } = useLanguage();

  if (onSelectCategory) {
    return (
      <div
        role="tablist"
        aria-label={t('filterCategory')}
        className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <button
          type="button"
          role="tab"
          aria-selected={!selectedCategoryId || selectedCategoryId === 'all'}
          onClick={() => onSelectCategory('all')}
          className={`min-h-[44px] rounded-lg px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43] ${
            !selectedCategoryId || selectedCategoryId === 'all'
              ? 'bg-[#7A0B43] text-white'
              : 'border border-[#E4D8CD] bg-white text-[#3D2830] hover:bg-[#F5EFE8]'
          }`}
        >
          {t('allCategories')}
        </button>

        {categories.map((cat) => {
          const isActive = selectedCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(cat.id)}
              className={`inline-flex min-h-[44px] items-center gap-2.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43] ${
                isActive
                  ? 'bg-[#7A0B43] text-white'
                  : 'border border-[#E4D8CD] bg-white text-[#3D2830] hover:bg-[#F5EFE8]'
              }`}
            >
              <img
                src={cat.image}
                alt=""
                aria-hidden="true"
                width={26}
                height={26}
                loading="lazy"
                className="h-6 w-6 rounded-full object-cover shrink-0 bg-[#F5EFE6]"
              />
              <span>{localize(cat.name)}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 lg:grid-cols-5">
      {categories.map((cat) => {
        const catName = localize(cat.name);
        return (
          <Link
            key={cat.id}
            to={`/products?category=${encodeURIComponent(cat.id)}`}
            className="group flex min-w-[144px] shrink-0 items-center gap-3 rounded-xl border border-[#E6DCD2] bg-white p-2.5 transition-colors hover:border-[#7A0B43] sm:min-w-0 sm:flex-col sm:p-3.5 sm:text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43]"
          >
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-[#EFE6DD] sm:h-20 sm:w-20">
              <ProductImage src={cat.image} alt={catName} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-[#26181D] group-hover:text-[#7A0B43] sm:whitespace-normal">
                {catName}
              </h3>
              <p className="mt-0.5 text-xs text-[#6E525B]">{t('viewCategory')}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
