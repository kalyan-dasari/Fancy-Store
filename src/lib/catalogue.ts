import categoriesData from '../data/categories.json';
import productsData from '../data/products.json';
import { storeConfig } from '../config/store';
import {
  AvailabilityFilter,
  Category,
  Language,
  Product,
  SortOption,
} from '../types';
import { getLocalizedText } from '../i18n/LanguageContext';

export const categories: Category[] = categoriesData as Category[];
export const products: Product[] = productsData as Product[];

/**
 * Formats a number in Indian Rupees (e.g., ₹199 or ₹1,250).
 */
export function formatPriceINR(amount: number): string {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: storeConfig.currency || 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${storeConfig.currencySymbol}${amount}`;
  }
}

export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find((cat) => cat.id === categoryId);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((item) => item.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((item) => item.categoryId === product.categoryId && item.id !== product.id)
    .slice(0, limit);
}

export interface FilterProductsParams {
  searchQuery: string;
  categoryId: string;
  availability: AvailabilityFilter;
  sortBy: SortOption;
  language: Language;
}

/**
 * Searches across both English and Telugu product names and descriptions
 * so customers can type in either language regardless of active UI toggle.
 */
export function filterAndSortProducts({
  searchQuery,
  categoryId,
  availability,
  sortBy,
  language,
}: FilterProductsParams): Product[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = products.filter((product) => {
    if (categoryId && categoryId !== 'all' && product.categoryId !== categoryId) {
      return false;
    }

    if (availability === 'available' && !product.available) {
      return false;
    }

    if (normalizedQuery) {
      const nameEn = (product.name.en || '').toLowerCase();
      const nameTe = (product.name.te || '').toLowerCase();
      const descEn = (product.description.en || '').toLowerCase();
      const descTe = (product.description.te || '').toLowerCase();
      const cat = getCategoryById(product.categoryId);
      const catEn = (cat?.name.en || '').toLowerCase();
      const catTe = (cat?.name.te || '').toLowerCase();

      const matches =
        nameEn.includes(normalizedQuery) ||
        nameTe.includes(normalizedQuery) ||
        descEn.includes(normalizedQuery) ||
        descTe.includes(normalizedQuery) ||
        catEn.includes(normalizedQuery) ||
        catTe.includes(normalizedQuery);

      if (!matches) return false;
    }

    return true;
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    if (sortBy === 'name-asc') {
      const nameA = getLocalizedText(a.name, language);
      const nameB = getLocalizedText(b.name, language);
      return nameA.localeCompare(nameB, language === 'te' ? 'te' : 'en');
    }
    // Default 'featured': available first, then featured, then newArrival
    if (a.available !== b.available) {
      return a.available ? -1 : 1;
    }
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    if (a.newArrival !== b.newArrival) {
      return a.newArrival ? -1 : 1;
    }
    return 0;
  });
}

/**
 * Normalizes a configured WhatsApp phone number to digits only.
 * Returns empty string if not configured or invalid.
 */
export function getConfiguredWhatsAppNumber(): string {
  const cleaned = (storeConfig.whatsappNumber || '').replace(/[^0-9]/g, '');
  return cleaned.length >= 10 ? cleaned : '';
}

/**
 * Generates the prefilled WhatsApp enquiry message for a specific product or general store enquiry.
 */
export function buildWhatsAppMessage(product?: Product, language: Language = 'en'): string {
  const storeTitle = storeConfig.storeName.en;
  if (product) {
    const productName = product.name.en;
    const formattedPrice = formatPriceINR(product.price);
    if (language === 'te' && product.name.te) {
      return `Hello ${storeTitle}! I am interested in ${productName} (${product.name.te}) priced at ${formattedPrice}. Is this product available?`;
    }
    return `Hello ${storeTitle}! I am interested in ${productName} priced at ${formattedPrice}. Is this product available?`;
  }
  return `Hello ${storeTitle}! I saw your online product catalogue and would like to enquire about available items.`;
}

/**
 * Builds the official WhatsApp click-to-chat URL (`https://wa.me/<number>?text=<encoded>`).
 * Returns null if `whatsappNumber` is not yet configured in `src/config/store.ts`,
 * preventing broken links.
 */
export function buildWhatsAppUrl(message: string): string | null {
  const phone = getConfiguredWhatsAppNumber();
  if (!phone) {
    return null;
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
