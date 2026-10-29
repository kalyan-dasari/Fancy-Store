import fs from 'node:fs';
import path from 'node:path';

const baseDir = path.resolve('public/images');
const folders = [
  'categories',
  'earrings',
  'bangles',
  'hair-accessories',
  'necklaces',
  'other',
];

for (const folder of folders) {
  fs.mkdirSync(path.join(baseDir, folder), { recursive: true });
}

// Studio-quality SVG renderer for Indian Fancy Store items
function wrapStudioSvg({ bgFrom, bgTo, accent, gold, titleEn, subtitleEn, badge, illustration }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800" role="img" aria-label="${titleEn}">
  <defs>
    <radialGradient id="studioBg" cx="50%" cy="42%" r="65%">
      <stop offset="0%" stop-color="${bgFrom}" />
      <stop offset="100%" stop-color="${bgTo}" />
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7E09E" />
      <stop offset="45%" stop-color="${gold || '#D4AF37'}" />
      <stop offset="100%" stop-color="#9A711C" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accent}" />
      <stop offset="100%" stop-color="#4A0728" />
    </linearGradient>
    <radialGradient id="pearlGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="65%" stop-color="#F5EFE6" />
      <stop offset="100%" stop-color="#D7C8B6" />
    </radialGradient>
    <filter id="softShadow" x="-15%" y="-15%" width="130%" height="135%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#2D151E" flood-opacity="0.16" />
    </filter>
    <filter id="gemGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.18" />
    </filter>
  </defs>

  <!-- Studio Backdrop -->
  <rect width="800" height="800" fill="url(#studioBg)" />

  <!-- Subtle Arch Pedestal Frame -->
  <path d="M 140 720 L 140 310 A 260 260 0 0 1 660 310 L 660 720 Z" fill="#FFFFFF" fill-opacity="0.52" stroke="url(#goldGrad)" stroke-width="2" stroke-opacity="0.45" />
  <ellipse cx="400" cy="650" rx="220" ry="34" fill="#2D151E" fill-opacity="0.06" />

  <!-- Corner Ornamental Filigree -->
  <g stroke="url(#goldGrad)" stroke-width="1.5" fill="none" opacity="0.45">
    <path d="M 44 96 L 44 44 L 96 44" />
    <path d="M 756 96 L 756 44 L 704 44" />
    <path d="M 44 704 L 44 756 L 96 756" />
    <path d="M 756 704 L 756 756 L 704 756" />
  </g>

  <!-- Main Product Artwork -->
  <g filter="url(#softShadow)">
    ${illustration}
  </g>

  <!-- Bottom Subtle Studio Plinth Label -->
  <g transform="translate(400, 738)" text-anchor="middle">
    <text y="0" font-family="Georgia, serif" font-size="19" fill="#6E525B" letter-spacing="2.5">${subtitleEn.toUpperCase()}</text>
  </g>
  ${
    badge
      ? `<g transform="translate(650, 76)">
          <rect x="-95" y="-22" width="190" height="38" rx="19" fill="#FFFFFF" fill-opacity="0.88" stroke="url(#goldGrad)" stroke-width="1.5" />
          <text x="0" y="3" text-anchor="middle" font-family="sans-serif" font-weight="600" font-size="14" fill="#7A0B43" letter-spacing="1">${badge}</text>
        </g>`
      : ''
  }
</svg>`;
}

// Product illustration templates
const jhumkaArt = (gemColor = '#9E124F', angle = 0) => `
  <g transform="translate(400, 360) rotate(${angle})">
    <!-- Left Jhumka -->
    <g transform="translate(-115, -10)">
      <!-- Top Floral Stud -->
      <circle cx="0" cy="-135" r="34" fill="url(#goldGrad)" />
      <circle cx="0" cy="-135" r="18" fill="${gemColor}" />
      <circle cx="0" cy="-169" r="6" fill="url(#pearlGrad)" />
      <circle cx="-24" cy="-159" r="6" fill="url(#pearlGrad)" />
      <circle cx="24" cy="-159" r="6" fill="url(#pearlGrad)" />
      <circle cx="-33" cy="-135" r="6" fill="url(#pearlGrad)" />
      <circle cx="33" cy="-135" r="6" fill="url(#pearlGrad)" />
      <!-- Stem -->
      <rect x="-6" y="-101" width="12" height="32" rx="4" fill="url(#goldGrad)" />
      <!-- Dome Bell -->
      <path d="M -78 30 C -78 -55, 78 -55, 78 30 Z" fill="url(#goldGrad)" />
      <path d="M -64 12 C -64 -38, 64 -38, 64 12" fill="none" stroke="${gemColor}" stroke-width="8" stroke-dasharray="10 8" />
      <rect x="-80" y="24" width="160" height="14" rx="7" fill="url(#goldGrad)" />
      <!-- Hanging Pearl Drops -->
      ${[-68, -46, -24, 0, 24, 46, 68]
        .map(
          (x) => `
        <line x1="${x}" y1="38" x2="${x}" y2="68" stroke="url(#goldGrad)" stroke-width="3" />
        <circle cx="${x}" cy="76" r="11" fill="url(#pearlGrad)" filter="url(#gemGlow)" />
      `
        )
        .join('')}
    </g>

    <!-- Right Jhumka -->
    <g transform="translate(115, 15)">
      <circle cx="0" cy="-135" r="34" fill="url(#goldGrad)" />
      <circle cx="0" cy="-135" r="18" fill="${gemColor}" />
      <circle cx="0" cy="-169" r="6" fill="url(#pearlGrad)" />
      <circle cx="-24" cy="-159" r="6" fill="url(#pearlGrad)" />
      <circle cx="24" cy="-159" r="6" fill="url(#pearlGrad)" />
      <circle cx="-33" cy="-135" r="6" fill="url(#pearlGrad)" />
      <circle cx="33" cy="-135" r="6" fill="url(#pearlGrad)" />
      <rect x="-6" y="-101" width="12" height="32" rx="4" fill="url(#goldGrad)" />
      <path d="M -78 30 C -78 -55, 78 -55, 78 30 Z" fill="url(#goldGrad)" />
      <path d="M -64 12 C -64 -38, 64 -38, 64 12" fill="none" stroke="${gemColor}" stroke-width="8" stroke-dasharray="10 8" />
      <rect x="-80" y="24" width="160" height="14" rx="7" fill="url(#goldGrad)" />
      ${[-68, -46, -24, 0, 24, 46, 68]
        .map(
          (x) => `
        <line x1="${x}" y1="38" x2="${x}" y2="68" stroke="url(#goldGrad)" stroke-width="3" />
        <circle cx="${x}" cy="76" r="11" fill="url(#pearlGrad)" filter="url(#gemGlow)" />
      `
        )
        .join('')}
    </g>
  </g>
`;

const chandbaliArt = (tone = '#B8C0C8', accentColor = '#1E5B70', scale = 1) => `
  <g transform="translate(400, 365) scale(${scale})">
    ${[-120, 120]
      .map(
        (xOffset, idx) => `
      <g transform="translate(${xOffset}, ${idx === 0 ? -12 : 12})">
        <circle cx="0" cy="-130" r="24" fill="${tone}" stroke="#59626A" stroke-width="3" />
        <circle cx="0" cy="-130" r="10" fill="${accentColor}" />
        <!-- Crescent Moon Body -->
        <path d="M 0 -95 C -95 -95, -100 65, 0 65 C 100 65, 95 -95, 0 -95 Z" fill="${tone}" stroke="#59626A" stroke-width="3" />
        <path d="M 0 -65 C -52 -65, -52 15, 0 15 C 52 15, 52 -65, 0 -65 Z" fill="#FAF7F2" stroke="#59626A" stroke-width="2" />
        <!-- Mirror / Ghungroo details -->
        ${[-65, -40, 0, 40, 65]
          .map(
            (gx, i) => `
          <circle cx="${gx}" cy="${68 + (i === 2 ? 12 : 4)}" r="9" fill="${tone}" stroke="#495159" stroke-width="2" />
        `
          )
          .join('')}
      </g>
    `
      )
      .join('')}
  </g>
`;

const studArt = (gem = '#A6113E', rot = 0) => `
  <g transform="translate(400, 360) rotate(${rot})">
    ${[-115, 115]
      .map(
        (ox) => `
      <g transform="translate(${ox}, 0)">
        <circle cx="0" cy="0" r="78" fill="url(#goldGrad)" />
        ${Array.from({ length: 12 })
          .map((_, i) => {
            const rad = (i * 30 * Math.PI) / 180;
            const px = Math.cos(rad) * 64;
            const py = Math.sin(rad) * 64;
            return `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="11" fill="url(#pearlGrad)" />`;
          })
          .join('')}
        <circle cx="0" cy="0" r="44" fill="${gem}" stroke="#F7E09E" stroke-width="4" />
        <ellipse cx="-14" cy="-14" rx="12" ry="7" transform="rotate(-30 -14 -14)" fill="#FFFFFF" fill-opacity="0.45" />
      </g>
    `
      )
      .join('')}
  </g>
`;

const bangleStackArt = (primaryColor = '#8E0B52', secondaryColor = '#146B48', tilt = 0) => `
  <g transform="translate(400, 370) rotate(${tilt})">
    <!-- Back Bangle Circle -->
    <circle cx="-48" cy="-22" r="145" fill="none" stroke="url(#goldGrad)" stroke-width="26" />
    <circle cx="-48" cy="-22" r="145" fill="none" stroke="${secondaryColor}" stroke-width="16" stroke-dasharray="28 14" />
    <!-- Front Main Bridal Bangle Stack -->
    <circle cx="48" cy="24" r="148" fill="none" stroke="url(#goldGrad)" stroke-width="34" />
    <circle cx="48" cy="24" r="148" fill="none" stroke="${primaryColor}" stroke-width="22" />
    <circle cx="48" cy="24" r="148" fill="none" stroke="#FFF6D6" stroke-width="6" stroke-dasharray="4 18" />
    <!-- Kundan stones around front bangle -->
    ${Array.from({ length: 16 })
      .map((_, i) => {
        const a = (i * 22.5 * Math.PI) / 180;
        const x = 48 + Math.cos(a) * 148;
        const y = 24 + Math.sin(a) * 148;
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.5" fill="url(#pearlGrad)" />`;
      })
      .join('')}
  </g>
`;

const necklaceArt = (gemColor = '#8E0B52', style = 'choker') => `
  <g transform="translate(400, 345)">
    <!-- Velvet Neck Bust Silhouette -->
    <path d="M -150 -160 Q 0 -115 150 -160 Q 210 20 185 215 Q 0 265 -185 215 Q -210 20 -150 -160 Z" fill="#470A29" fill-opacity="0.92" />
    <!-- Golden Necklace Curve -->
    <path d="M -135 -85 Q 0 ${style === 'haram' ? '185' : '65'} 135 -85" fill="none" stroke="url(#goldGrad)" stroke-width="${style === 'haram' ? '26' : '34'}" stroke-linecap="round" />
    <path d="M -125 -85 Q 0 ${style === 'haram' ? '140' : '30'} 125 -85" fill="none" stroke="url(#pearlGrad)" stroke-width="8" stroke-dasharray="6 12" stroke-linecap="round" />
    <!-- Center Pendant -->
    <g transform="translate(0, ${style === 'haram' ? '85' : '15'})">
      <circle cx="0" cy="0" r="42" fill="url(#goldGrad)" />
      <circle cx="0" cy="0" r="25" fill="${gemColor}" />
      <circle cx="0" cy="0" r="9" fill="url(#pearlGrad)" />
      ${[-32, -16, 0, 16, 32]
        .map(
          (dx) => `
        <circle cx="${dx}" cy="52" r="8" fill="url(#pearlGrad)" />
      `
        )
        .join('')}
    </g>
  </g>
`;

const hairAccessoryArt = (color = '#9E124F', variant = 'clip') => `
  <g transform="translate(400, 365)">
    ${
      variant === 'scrunchie'
        ? `
      <!-- Silk Scrunchies Trio -->
      <g transform="translate(-85, -35)">
        <circle cx="0" cy="0" r="95" fill="${color}" />
        <circle cx="0" cy="0" r="36" fill="#FAF7F2" />
        <path d="M -70 -20 Q -40 -60 0 -75 M 30 -65 Q 70 -30 75 15 M -65 40 Q -20 80 35 65" stroke="#FFFFFF" stroke-width="4" stroke-opacity="0.35" fill="none" stroke-linecap="round" />
      </g>
      <g transform="translate(80, 45)">
        <circle cx="0" cy="0" r="95" fill="#D49B35" />
        <circle cx="0" cy="0" r="36" fill="#FAF7F2" />
        <path d="M -70 -20 Q -40 -60 0 -75 M 30 -65 Q 70 -30 75 15" stroke="#FFFFFF" stroke-width="4" stroke-opacity="0.4" fill="none" stroke-linecap="round" />
      </g>
    `
        : `
      <!-- Ornate Gold & Pearl Hair Barrette / Juda Pin -->
      <rect x="-185" y="-28" width="370" height="56" rx="28" fill="url(#goldGrad)" />
      ${[-130, -65, 0, 65, 130]
        .map(
          (x) => `
        <g transform="translate(${x}, 0)">
          <circle cx="0" cy="0" r="26" fill="url(#pearlGrad)" />
          <circle cx="0" cy="0" r="12" fill="${color}" />
          <circle cx="0" cy="48" r="10" fill="url(#pearlGrad)" />
          <line x1="0" y1="26" x2="0" y2="38" stroke="url(#goldGrad)" stroke-width="3" />
        </g>
      `
        )
        .join('')}
    `
    }
  </g>
`;

const giftBoxArt = (primary = '#8E0B52', variant = 'box') => `
  <g transform="translate(400, 375)">
    ${
      variant === 'brooch'
        ? `
      <!-- Crystal Saree Pin / Brooch -->
      <ellipse cx="0" cy="0" rx="165" ry="78" fill="url(#goldGrad)" />
      <ellipse cx="0" cy="0" rx="135" ry="52" fill="${primary}" />
      ${[-95, -48, 0, 48, 95]
        .map(
          (x) => `
        <circle cx="${x}" cy="0" r="16" fill="url(#pearlGrad)" />
      `
        )
        .join('')}
      <line x1="-200" y1="0" x2="200" y2="0" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round" />
    `
        : `
      <!-- Traditional Meenakari Kumkum & Gift Box -->
      <path d="M -140 20 L 140 20 L 120 120 L -120 120 Z" fill="url(#goldGrad)" />
      <path d="M -150 20 C -150 -110, 150 -110, 150 20 Z" fill="${primary}" stroke="url(#goldGrad)" stroke-width="10" />
      <circle cx="0" cy="-82" r="22" fill="url(#goldGrad)" />
      <!-- Peacock / Lotus Motif -->
      <circle cx="0" cy="-22" r="34" fill="url(#goldGrad)" />
      <circle cx="0" cy="-22" r="18" fill="#146B48" />
      <circle cx="-75" cy="-15" r="20" fill="url(#pearlGrad)" />
      <circle cx="75" cy="-15" r="20" fill="url(#pearlGrad)" />
    `
    }
  </g>
`;

const filesToCreate = [
  // Categories
  {
    file: 'categories/earrings.svg',
    titleEn: 'Earrings & Jhumkas',
    subtitleEn: 'Earrings Collection',
    bgFrom: '#FFF8F4',
    bgTo: '#F4E3DC',
    accent: '#8E0B52',
    illustration: jhumkaArt('#8E0B52', 0),
  },
  {
    file: 'categories/bangles.svg',
    titleEn: 'Bangles & Kadas',
    subtitleEn: 'Bangles Collection',
    bgFrom: '#FFF9F0',
    bgTo: '#F3E5CE',
    accent: '#9E124F',
    illustration: bangleStackArt('#8E0B52', '#146B48', 0),
  },
  {
    file: 'categories/necklaces.svg',
    titleEn: 'Necklaces & Harams',
    subtitleEn: 'Necklace Collection',
    bgFrom: '#FDF7F9',
    bgTo: '#EFE0E6',
    accent: '#7A0B43',
    illustration: necklaceArt('#8E0B52', 'choker'),
  },
  {
    file: 'categories/hair-accessories.svg',
    titleEn: 'Hair Accessories',
    subtitleEn: 'Clips & Scrunchies',
    bgFrom: '#FBF8F3',
    bgTo: '#EFE4D4',
    accent: '#8E0B52',
    illustration: hairAccessoryArt('#8E0B52', 'clip'),
  },
  {
    file: 'categories/other.svg',
    titleEn: 'Gifts & Fancy Items',
    subtitleEn: 'Gifts & Saree Pins',
    bgFrom: '#FFF7F5',
    bgTo: '#F3DFD9',
    accent: '#8E0B52',
    illustration: giftBoxArt('#8E0B52', 'box'),
  },

  // Earrings products
  {
    file: 'earrings/pearl-drop-01.svg',
    titleEn: 'Pearl Drop Jhumka Earrings',
    subtitleEn: 'Gold Plated · Pearl Drops',
    badge: 'BESTSELLER',
    bgFrom: '#FFF9F5',
    bgTo: '#F3E3DC',
    accent: '#8E0B52',
    illustration: jhumkaArt('#8E0B52', 0),
  },
  {
    file: 'earrings/pearl-drop-02.svg',
    titleEn: 'Pearl Drop Jhumka Earrings - Side View',
    subtitleEn: 'Handcrafted Pearl Finish',
    badge: 'CLOSER VIEW',
    bgFrom: '#FFF9F5',
    bgTo: '#EFE0D8',
    accent: '#8E0B52',
    illustration: jhumkaArt('#6E083F', -6),
  },
  {
    file: 'earrings/lakshmi-temple-01.svg',
    titleEn: 'Lakshmi Temple Gold Jhumkas',
    subtitleEn: 'Traditional Temple Design',
    badge: 'FESTIVE WEAR',
    bgFrom: '#FFFBF2',
    bgTo: '#F2E4C8',
    accent: '#A6113E',
    illustration: jhumkaArt('#146B48', 0),
  },
  {
    file: 'earrings/lakshmi-temple-02.svg',
    titleEn: 'Lakshmi Temple Gold Jhumkas - Detail',
    subtitleEn: 'Antique Matte Gold Polish',
    badge: 'ANTIQUE FINISH',
    bgFrom: '#FFFBF2',
    bgTo: '#EFE0C2',
    accent: '#A6113E',
    illustration: jhumkaArt('#A6113E', 5),
  },
  {
    file: 'earrings/oxidised-chandbali-01.svg',
    titleEn: 'Oxidised Silver Mirror Chandbalis',
    subtitleEn: 'German Silver · Lightweight',
    badge: 'NEW ARRIVAL',
    bgFrom: '#F8F9FB',
    bgTo: '#E3E7EE',
    accent: '#2B4C65',
    illustration: chandbaliArt('#C4CCD4', '#8E0B52', 1),
  },
  {
    file: 'earrings/oxidised-chandbali-02.svg',
    titleEn: 'Oxidised Silver Mirror Chandbalis - Detail',
    subtitleEn: 'Ghungroo Bead Edging',
    badge: 'SILVER FINISH',
    bgFrom: '#F8F9FB',
    bgTo: '#DCE2EC',
    accent: '#2B4C65',
    illustration: chandbaliArt('#B8C2CC', '#1D5B6E', 1.08),
  },
  {
    file: 'earrings/ruby-studs-01.svg',
    titleEn: 'Ruby Stone Floral Stud Earrings',
    subtitleEn: 'Daily & Office Wear',
    badge: 'DAILY WEAR',
    bgFrom: '#FFF8F9',
    bgTo: '#F4E1E6',
    accent: '#9E124F',
    illustration: studArt('#9E124F', 0),
  },
  {
    file: 'earrings/ruby-studs-02.svg',
    titleEn: 'Ruby Stone Floral Stud Earrings - Pair',
    subtitleEn: 'Screw Back Comfort Fit',
    badge: 'COMFORT FIT',
    bgFrom: '#FFF8F9',
    bgTo: '#EFE0E4',
    accent: '#9E124F',
    illustration: studArt('#7A0B43', 12),
  },

  // Bangles products
  {
    file: 'bangles/bridal-velvet-01.svg',
    titleEn: 'Bridal Velvet Glass Bangle Set (24 Pcs)',
    subtitleEn: 'Maroon Velvet · Zari Borders',
    badge: 'BRIDAL SET',
    bgFrom: '#FFF8F5',
    bgTo: '#F4E0DA',
    accent: '#8E0B52',
    illustration: bangleStackArt('#8E0B52', '#B5174E', 0),
  },
  {
    file: 'bangles/bridal-velvet-02.svg',
    titleEn: 'Bridal Velvet Glass Bangle Set - Closer View',
    subtitleEn: 'Sizes 2.4, 2.6, 2.8 Available',
    badge: '24 PIECES',
    bgFrom: '#FFF8F5',
    bgTo: '#F0DBD4',
    accent: '#8E0B52',
    illustration: bangleStackArt('#7A0B43', '#D49B35', 10),
  },
  {
    file: 'bangles/kundan-kada-01.svg',
    titleEn: 'Kundan & Pearl Designer Kada Pair',
    subtitleEn: 'Stone Work · 2 Piece Set',
    badge: 'FEATURED',
    bgFrom: '#FFFBF3',
    bgTo: '#F3E5CE',
    accent: '#8E0B52',
    illustration: bangleStackArt('#146B48', '#8E0B52', -6),
  },
  {
    file: 'bangles/kundan-kada-02.svg',
    titleEn: 'Kundan & Pearl Designer Kada Pair - Side',
    subtitleEn: 'Smooth Inner Polish',
    badge: 'PAIR OF 2',
    bgFrom: '#FFFBF3',
    bgTo: '#EFE0C5',
    accent: '#8E0B52',
    illustration: bangleStackArt('#8E0B52', '#146B48', 8),
  },
  {
    file: 'bangles/silk-thread-01.svg',
    titleEn: 'Handwrapped Silk Thread Zari Bangles',
    subtitleEn: 'Rani Pink & Emerald Green',
    badge: 'HANDCRAFTED',
    bgFrom: '#FDF7FA',
    bgTo: '#F2DFEA',
    accent: '#A8135B',
    illustration: bangleStackArt('#C21868', '#146B48', 4),
  },
  {
    file: 'bangles/daily-gold-01.svg',
    titleEn: 'One-Gram Gold Plated Daily Wear Bangles (Set of 4)',
    subtitleEn: 'Micro-Gold Polish · Set of 4',
    badge: 'DAILY WEAR',
    bgFrom: '#FFFBF2',
    bgTo: '#F4E6C8',
    accent: '#9A711C',
    illustration: bangleStackArt('#C4952D', '#9A711C', -4),
  },

  // Necklaces products
  {
    file: 'necklaces/kundan-choker-01.svg',
    titleEn: 'Royal Kundan Bridal Choker Set with Earrings',
    subtitleEn: 'Adjustable Dori · Matching Studs',
    badge: 'FESTIVE FAVORITE',
    bgFrom: '#FFF8F6',
    bgTo: '#F3DFDA',
    accent: '#8E0B52',
    illustration: necklaceArt('#8E0B52', 'choker'),
  },
  {
    file: 'necklaces/kundan-choker-02.svg',
    titleEn: 'Royal Kundan Bridal Choker Set - Detail',
    subtitleEn: 'Ruby & Pearl Cluster Pendant',
    badge: 'WITH EARRINGS',
    bgFrom: '#FFF8F6',
    bgTo: '#EFE0DC',
    accent: '#8E0B52',
    illustration: necklaceArt('#146B48', 'choker'),
  },
  {
    file: 'necklaces/lakshmi-haram-01.svg',
    titleEn: 'Lakshmi Kasu Long Temple Haram',
    subtitleEn: 'Traditional Coin Design',
    badge: 'TRADITIONAL',
    bgFrom: '#FFFBF2',
    bgTo: '#F3E4C6',
    accent: '#8E0B52',
    illustration: necklaceArt('#A6113E', 'haram'),
  },
  {
    file: 'necklaces/pearl-mala-01.svg',
    titleEn: 'Two-Layer Cream Pearl Mala with Side Brooch',
    subtitleEn: 'Lightweight Saree Necklace',
    badge: 'NEW ARRIVAL',
    bgFrom: '#FAF8F5',
    bgTo: '#EDE4DA',
    accent: '#7A0B43',
    illustration: necklaceArt('#7A0B43', 'haram'),
  },

  // Hair Accessories products
  {
    file: 'hair-accessories/jasmine-clips-01.svg',
    titleEn: 'Gold-Toned Jasmine Pearl Hair Clip Set (3 Pcs)',
    subtitleEn: 'Non-Slip Alligator Grip',
    badge: 'SET OF 3',
    bgFrom: '#FFF9F4',
    bgTo: '#F2E3D6',
    accent: '#8E0B52',
    illustration: hairAccessoryArt('#8E0B52', 'clip'),
  },
  {
    file: 'hair-accessories/satin-scrunchies-01.svg',
    titleEn: 'Soft Mulberry Satin Hair Scrunchies (Pack of 5)',
    subtitleEn: 'Gentle on Hair · Festive Shades',
    badge: 'PACK OF 5',
    bgFrom: '#FDF7FA',
    bgTo: '#F1E0E8',
    accent: '#8E0B52',
    illustration: hairAccessoryArt('#8E0B52', 'scrunchie'),
  },
  {
    file: 'hair-accessories/bridal-juda-pins-01.svg',
    titleEn: 'Stone-Studded Bridal Juda Bun Pins (Set of 6)',
    subtitleEn: 'Kundan & Pearl Hair Pins',
    badge: 'BRIDAL WEAR',
    bgFrom: '#FFFBF3',
    bgTo: '#F2E5CE',
    accent: '#146B48',
    illustration: hairAccessoryArt('#146B48', 'clip'),
  },

  // Gifts & Other Fancy Items
  {
    file: 'other/meenakari-gift-box-01.svg',
    titleEn: 'Meenakari Haldi-Kumkum Return Gift Box',
    subtitleEn: 'Auspicious Pooja & Tamboolam Gift',
    badge: 'RETURN GIFT',
    bgFrom: '#FFF8F4',
    bgTo: '#F4E1D6',
    accent: '#8E0B52',
    illustration: giftBoxArt('#8E0B52', 'box'),
  },
  {
    file: 'other/saree-brooch-pins-01.svg',
    titleEn: 'Crystal Stone Gold Saree Pleat Brooch Pins (2 Pcs)',
    subtitleEn: 'Snag-Free Safety Clasp',
    badge: 'SAREE ESSENTIAL',
    bgFrom: '#FFFBF2',
    bgTo: '#F3E5CC',
    accent: '#8E0B52',
    illustration: giftBoxArt('#8E0B52', 'brooch'),
  },
];

for (const item of filesToCreate) {
  const fullPath = path.join(baseDir, item.file);
  const svgContent = wrapStudioSvg(item);
  fs.writeFileSync(fullPath, svgContent, 'utf-8');
}

console.log(`Generated ${filesToCreate.length} local studio product images in public/images/`);
