# MAHA Fancy Store — Product Catalogue Website

A fast, mobile-first, bilingual (English & Telugu) static product catalogue website built for **MAHA Fancy Store**. Designed specifically for customers browsing on Android smartphones via WhatsApp links, allowing them to explore products, check prices in Indian Rupees (`₹`), and send prefilled WhatsApp enquiries directly to the shop owner.

---

## 1. Architecture & Technical Stack

- **Framework**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS (`@tailwindcss/vite`)
- **Routing**: React Router (`react-router-dom`)
- **Icons**: Lucide React (`lucide-react`)
- **Typography**: `Cormorant Garamond` (Display), `Plus Jakarta Sans` (Body), and `Noto Sans Telugu` (Telugu script support)
- **Zero Backend / Zero Database**: All product and category data lives in local JSON files (`src/data/products.json` and `src/data/categories.json`). No authentication, shopping cart, payment gateway, or external API calls are required at runtime.

---

## 2. Project Structure

```text
public/
  assets/
    aistudio/
      WhatsApp_Image_2026-10-29_at_3.18.49_PM_5c555ed3.jpeg  # Official MAHA Fancy Store logo
  images/
    categories/
    earrings/
    bangles/
    hair-accessories/
    necklaces/
    other/
  robots.txt
  sitemap.xml
src/
  components/
    CategoryStrip.tsx    # Mobile horizontal category scroller & filter tabs
    Footer.tsx           # Store footer with quick links & configured shop info
    Header.tsx           # Compact header with brand logo, nav links & EN/తెలుగు toggle
    ProductCard.tsx      # Reusable product card with 1:1 image ratio & INR pricing
    ProductImage.tsx     # Lazy-loaded image wrapper with graceful fallback UI
    WhatsAppButton.tsx   # Click-to-chat WhatsApp enquiry button & message preview
  config/
    store.ts             # Central store configuration (WhatsApp number, address, hours)
  data/
    categories.json      # Configurable product categories (EN & Telugu)
    products.json        # Demonstration product catalogue (16 sample items)
  hooks/
    useDocumentMeta.ts   # Dynamic page title, description, canonical & Open Graph updater
  i18n/
    LanguageContext.tsx  # Client-side language state with English fallback
    translations.ts      # Complete English & Telugu UI dictionary
  lib/
    catalogue.ts         # Search, filter, sort, INR currency formatting & WhatsApp URL helpers
  pages/
    HomePage.tsx         # / (Search, Hero, Categories, Featured, New Arrivals, WhatsApp CTA)
    ProductsPage.tsx     # /products (Search, Category/Stock Filters, Sort, Pagination)
    ProductDetailPage.tsx# /products/:slug (Gallery, Details, WhatsApp Enquiry, Related Items)
    ContactPage.tsx      # /contact (WhatsApp Enquiry, Shop Details, Google Maps link)
    NotFoundPage.tsx     # Branded 404 page
  types/
    index.ts             # TypeScript interfaces for Product, Category, StoreConfig
  App.tsx
  main.tsx
vercel.json              # SPA route rewrite rules for Vercel static hosting
```

---

## 3. Local Setup, Development & Build Commands

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **Package Manager**: npm (bundled with Node.js)

### Install Dependencies
```bash
npm install
```

> **Dependency Compatibility Note**: This project uses Vite 8 with Tailwind CSS v4. Ensure `esbuild` is maintained at `^0.28.0` in `devDependencies` to satisfy Vite 8's peer dependency requirement.

### Start Local Development Server
```bash
npm run dev
```
The development server will start at:
- **Local URL**: `http://localhost:3000/`
- **Network URL**: `http://<your-lan-ip>:3000/` (for instant testing on connected mobile phones over the same Wi-Fi)

### Type-Check & Lint
```bash
npm run lint
```
Runs `tsc --noEmit` to validate all TypeScript code, interfaces, and JSX components without generating output files.

### Build for Production
```bash
npm run build
```
Compiles and bundles the application with Vite into the production-ready static assets in the `dist/` directory.

### Preview Production Build Locally
```bash
npm run preview
```
Serves the generated `dist/` folder locally to verify production behaviour before deploying.

### Regenerate Demo Product Images (Optional)
```bash
npm run generate:images
```
Executes `scripts/generate-local-images.mjs` to regenerate all demonstration SVG product illustrations across earrings, bangles, necklaces, hair accessories, and categories.

---

## 4. Configuring Shop Details (`src/config/store.ts`)

Before sharing the website with customers, open `src/config/store.ts` and fill in the real shop details:

```ts
export const storeConfig: StoreConfig = {
  // ...
  whatsappNumber: '919876543210', // 10-digit Indian mobile number prefixed with 91 (digits only)
  phoneNumber: '+91 98765 43210', // Formatted phone number for calling
  address: {
    en: 'Main Bazaar Road, Near Bus Stand, Your Town, Andhra Pradesh / Telangana',
    te: 'మెయిన్ బజార్ రోడ్, బస్టాండ్ దగ్గర, మీ ఊరు',
  },
  openingHours: {
    en: 'Monday – Sunday: 9:30 AM – 8:30 PM',
    te: 'సోమవారం – ఆదివారం: ఉదయం 9:30 – రాత్రి 8:30 వరకు',
  },
  googleMapsUrl: 'https://maps.google.com/?q=...',
  // ...
};
```

> **Safe Unconfigured Behaviour**: While `whatsappNumber` is empty (`""`), the site will never generate a broken `wa.me` link. Instead, it disables direct navigation and provides a **Copy Message Text** button so the prefilled enquiry can still be copied and tested.

---

## 5. Adding or Editing Products (`src/data/products.json`)

> **Important Note on Sample Data**: The 16 products currently in `src/data/products.json` are **demonstration products** across Earrings, Bangles, Necklaces, Hair Accessories, and Gifts. Replace them with real shop inventory before launch.

Each product in `src/data/products.json` follows this schema:

```json
{
  "id": "earrings-001",
  "slug": "pearl-drop-jhumka-earrings",
  "name": {
    "en": "Pearl Drop Gold-Toned Jhumka Earrings",
    "te": "ముత్యాల బంగారు రంగు బుట్ట కమ్మలు"
  },
  "description": {
    "en": "Traditional dome-shaped gold-toned jhumkas finished with delicate cluster pearl drops.",
    "te": "సంప్రదాయ డిజైన్‌లో ముత్యాల కుచ్చులతో రూపొందించిన బంగారు రంగు బుట్ట కమ్మలు."
  },
  "categoryId": "earrings",
  "price": 199,
  "images": [
    "/images/earrings/pearl-drop-01.webp",
    "/images/earrings/pearl-drop-02.webp"
  ],
  "thumbnail": "/images/earrings/pearl-drop-01-thumb.webp",
  "available": true,
  "featured": true,
  "newArrival": false
}
```

- **Telugu Translation Fallback**: If you leave `"te": ""` empty on any product name or description, the website automatically falls back to the English text (`"en"`) so customers never see blank labels.
- **Categories**: Edit `src/data/categories.json` to add, rename, or reorder product categories. Make sure each product's `categoryId` matches a valid `id` in `src/data/categories.json`.

---

## 6. Image Optimisation & Batch Compression Guide

Because many customers browse on budget Android phones over mobile data:

1. **Organise images by category folder** inside `public/images/<category>/`.
2. **Use lowercase, hyphenated filenames** (e.g., `bridal-velvet-01.webp`).
3. **Square 1:1 aspect ratio recommended**: Crop product photos to `1:1` (`800×800 px` for detail gallery images, `400×400 px` for card thumbnails).
4. **Batch convert smartphone photos to WebP**:
   - Using `cwebp` CLI:
     ```bash
     for file in *.jpg; do
       cwebp -q 78 -resize 800 800 "$file" -o "${file%.jpg}.webp"
     done
     ```
   - Or use [Squoosh.app](https://squoosh.app/) in the browser to resize to `800×800` WebP at ~75–80% quality (keeping each image under `60–90 KB`).
5. **When Inventory Grows Very Large (500+ High-Res Photos)**:
   - Keeping a few dozen compressed WebP images inside `public/images/` is ideal for zero-cost static hosting.
   - If the catalogue grows to hundreds or thousands of multi-angle high-resolution photos, store the image files on an external object storage / CDN service (such as Cloudflare R2, Cloudinary, or AWS S3 + CloudFront) and reference their HTTPS URLs in `src/data/products.json` so your Git repository and Vercel build remain fast.

---

## 7. Deploying to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project in [Vercel](https://vercel.com/new).
3. Vercel automatically detects **Vite**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. The included `vercel.json` configures SPA rewrites so direct visits and WhatsApp shares to `/products/:slug`, `/products`, and `/contact` resolve cleanly to `index.html`.
5. Update `siteUrl` in `src/config/store.ts` and the URLs in `public/sitemap.xml` and `public/robots.txt` to match your production domain.

---

## 8. SEO & Social Sharing Note (Static SPA Limitation)

- `index.html` includes store-level Open Graph (`og:title`, `og:description`, `og:image`) and Twitter Card tags featuring the official **MAHA Fancy Store** logo, so sharing any link on WhatsApp always displays a branded store preview card.
- `useDocumentMeta` updates `<title>`, `<meta name="description">`, `<link rel="canonical">`, and Open Graph tags dynamically in the browser as users navigate to individual products.
- **Limitation of Pure Client-Side SPAs**: Social crawlers (such as WhatsApp link preview bots) that do not execute JavaScript will see the default store metadata from `index.html` rather than per-product images when a `/products/:slug` link is pasted. If per-product WhatsApp preview thumbnails are needed in the future, the routes in `src/data/products.json` can be statically prerendered at build time into per-route `dist/products/<slug>/index.html` files without changing the component architecture.
