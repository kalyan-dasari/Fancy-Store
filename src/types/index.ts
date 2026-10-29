export type Language = 'en' | 'te';

export interface LocalizedText {
  en: string;
  te?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  categoryId: string;
  price: number;
  images: string[];
  thumbnail?: string;
  available: boolean;
  featured: boolean;
  newArrival: boolean;
}

export interface StoreConfig {
  storeName: LocalizedText;
  tagline: LocalizedText;
  logoPath: string;
  /**
   * 10-digit Indian mobile number with country code (e.g., "919876543210").
   * Leave empty ("") until the shop owner provides the official number.
   */
  whatsappNumber: string;
  /**
   * Display phone number (e.g., "+91 98765 43210").
   * Leave empty ("") until configured.
   */
  phoneNumber: string;
  /**
   * Full shop address in English and Telugu.
   * Leave empty strings until configured.
   */
  address: LocalizedText;
  /**
   * Opening hours in English and Telugu.
   * Leave empty strings until configured.
   */
  openingHours: LocalizedText;
  /**
   * Optional Google Maps share URL or directions link.
   */
  googleMapsUrl: string;
  currency: string;
  currencySymbol: string;
  defaultLanguage: Language;
  siteUrl: string;
  isDemoCatalogue: boolean;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export type AvailabilityFilter = 'all' | 'available';
