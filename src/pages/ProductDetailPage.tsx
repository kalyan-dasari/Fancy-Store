import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import {
  formatPriceINR,
  getCategoryById,
  getProductBySlug,
  getRelatedProducts,
} from '../lib/catalogue';
import { useLanguage } from '../i18n/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ProductImage } from '../components/ProductImage';
import { ProductCard } from '../components/ProductCard';
import { WhatsAppButton } from '../components/WhatsAppButton';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { localize, t } = useLanguage();

  const product = slug ? getProductBySlug(slug) : undefined;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  const productName = product ? localize(product.name) : t('productNotFoundTitle');
  const productDescription = product
    ? localize(product.description)
    : t('productNotFoundDescription');

  useDocumentMeta({
    title: product
      ? `${productName} (${formatPriceINR(product.price)})`
      : t('productNotFoundTitle'),
    description: productDescription || productName,
    path: slug ? `/products/${slug}` : '/products',
    image: product?.images[0],
  });

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16">
        <div className="rounded-2xl border border-[#E6DCD2] bg-white p-8 sm:p-10">
          <h1 className="font-display text-2xl font-bold text-[#26181D] sm:text-3xl">
            {t('productNotFoundTitle')}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#6E525B] sm:text-base">
            {t('productNotFoundDescription')}
          </p>
          <div className="mt-6">
            <Link
              to="/products"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#7A0B43] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5E0833] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>{t('backToCatalogue')}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const category = getCategoryById(product.categoryId);
  const categoryName = category ? localize(category.name) : '';
  const relatedProducts = getRelatedProducts(product, 4);
  const images = product.images && product.images.length > 0 ? product.images : [''];
  const activeImage = images[selectedImageIndex] || images[0];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-5 pb-24 sm:px-6 sm:py-10">
      {/* Back to Catalogue Link */}
      <div className="mb-5">
        <Link
          to="/products"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-[#5A3E48] transition-colors hover:bg-[#F3ECE4] hover:text-[#7A0B43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43]"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{t('backToCatalogue')}</span>
        </Link>
      </div>

      {/* Main Contiguous Product Detail Module */}
      <div className="grid grid-cols-1 gap-6 rounded-2xl border border-[#E6DCD2] bg-white p-4 sm:p-6 lg:grid-cols-12 lg:gap-10 lg:p-8">
        {/* Left: Product Photograph Gallery */}
        <div className="lg:col-span-6">
          <div className="overflow-hidden rounded-xl border border-[#ECE2D8]">
            <ProductImage
              src={activeImage}
              alt={productName}
              priority
              fallbackLabel={productName}
            />
          </div>

          {/* Thumbnail Selector (if multiple photographs exist) */}
          {images.length > 1 && (
            <div className="mt-3 flex items-center gap-3 overflow-x-auto pb-1">
              {images.map((imgUrl, idx) => {
                const isSelected = idx === selectedImageIndex;
                return (
                  <button
                    key={imgUrl + idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={t('galleryThumbnailAria', {
                      index: idx + 1,
                      name: productName,
                    })}
                    className={`h-18 w-18 shrink-0 overflow-hidden rounded-lg border-2 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0B43] ${
                      isSelected
                        ? 'border-[#7A0B43] ring-2 ring-[#7A0B43]/20'
                        : 'border-[#E6DCD2] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <ProductImage src={imgUrl} alt={`${productName} - ${idx + 1}`} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Product Details & WhatsApp Enquiry Module */}
        <div className="flex flex-col justify-between lg:col-span-6">
          <div>
            {/* Unboxed Metadata: Category · Availability */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E525B] sm:text-sm">
              {category && (
                <Link
                  to={`/products?category=${encodeURIComponent(category.id)}`}
                  className="font-semibold text-[#7A0B43] hover:underline"
                >
                  {categoryName}
                </Link>
              )}
              {category && <span aria-hidden="true">·</span>}
              <span
                className={`inline-flex items-center gap-1 font-semibold ${
                  product.available ? 'text-[#186343]' : 'text-[#8C3B4A]'
                }`}
              >
                {product.available ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                )}
                <span>{product.available ? t('inStock') : t('outOfStock')}</span>
              </span>
            </div>

            {/* Product Name */}
            <h1 className="font-display mt-2 text-2xl font-bold leading-snug text-[#26181D] sm:text-3xl">
              {productName}
            </h1>

            {/* Secondary English title if currently viewing in Telugu (for easy product reference) */}
            {product.name.te && localize(product.name) !== product.name.en && (
              <p className="mt-1 text-xs text-[#6E525B]">{product.name.en}</p>
            )}

            {/* Price in INR */}
            <div className="mt-4 border-y border-[#F2ECE4] py-3.5">
              <span className="block text-xs font-medium text-[#6E525B]">
                {t('priceLabel')}
              </span>
              <span className="mt-0.5 block text-2xl font-bold text-[#7A0B43] tabular-nums sm:text-3xl">
                {formatPriceINR(product.price)}
              </span>
            </div>

            {/* Short Description (only rendered when non-empty) */}
            {productDescription && (
              <div className="mt-4">
                <h2 className="text-xs font-bold tracking-wide text-[#5A424B]">
                  {t('descriptionLabel')}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-[#38242C] sm:text-base">
                  {productDescription}
                </p>
              </div>
            )}
          </div>

          {/* WhatsApp Enquiry CTA + Message Preview */}
          <div className="mt-6 pt-2">
            <WhatsAppButton product={product} variant="primary" showMessagePreview />
          </div>
        </div>
      </div>

      {/* Related Products from Same Category */}
      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-10 sm:mt-14">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2
              id="related-heading"
              className="font-display text-xl font-bold text-[#26181D] sm:text-2xl"
            >
              {t('relatedProductsTitle')}
            </h2>
            {category && (
              <Link
                to={`/products?category=${encodeURIComponent(category.id)}`}
                className="text-xs font-semibold text-[#7A0B43] hover:underline sm:text-sm"
              >
                {t('viewAllProducts')}
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Mobile Bottom Enquiry Bar (Compact <= 56px height to respect 15% viewport cap) */}
      <div className="fixed right-0 bottom-0 left-0 z-20 border-t border-[#E4D6C8] bg-[#FAF7F2]/95 px-4 py-2 backdrop-blur-xs sm:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-[#5A424B]">{productName}</p>
            <p className="text-base font-bold text-[#7A0B43] tabular-nums">
              {formatPriceINR(product.price)}
            </p>
          </div>
          <WhatsAppButton product={product} variant="compact" />
        </div>
      </div>
    </div>
  );
};
