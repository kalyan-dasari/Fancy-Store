import { StoreConfig } from '../types';

/**
 * Central configuration for MAHA Fancy Store.
 *
 * HOW TO CONFIGURE BEFORE GOING LIVE:
 * 1. Set `whatsappNumber` to the shop's WhatsApp number with country code (digits only, e.g. "919876543210").
 * 2. Set `phoneNumber` to the formatted phone number (e.g. "+91 98765 43210").
 * 3. Fill in `address.en` and `address.te` with the real shop address.
 * 4. Fill in `openingHours.en` and `openingHours.te` with the shop timings.
 * 5. Optionally set `googleMapsUrl` to the shop's Google Maps location link.
 * 6. Set `isDemoCatalogue` to false once real product data is added to `src/data/products.json`.
 */
export const storeConfig: StoreConfig = {
  storeName: {
    en: 'MAHA Fancy Store',
    te: 'మహా ఫ్యాన్సీ స్టోర్',
  },
  tagline: {
    en: 'Bangles, Earrings, Necklaces, Hair Accessories & Fancy Gifts',
    te: 'గాజులు, చెవి దిద్దులు, హారాలు, హెయిర్ యాక్సెసరీస్ మరియు ఫ్యాన్సీ గిఫ్ట్ వస్తువులు',
  },
  logoPath: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_3.18.49_PM_5c555ed3.jpeg',

  // Leave blank ("") until the real shop contact number and address are provided.
  // Do not invent fake contact details.
  whatsappNumber: '',
  phoneNumber: '',
  address: {
    en: '',
    te: '',
  },
  openingHours: {
    en: '',
    te: '',
  },
  googleMapsUrl: '',

  currency: 'INR',
  currencySymbol: '₹',
  defaultLanguage: 'en',
  siteUrl: 'https://maha-fancy-store.vercel.app',
  isDemoCatalogue: true,
};
