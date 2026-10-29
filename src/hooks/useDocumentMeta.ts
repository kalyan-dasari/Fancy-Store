import { useEffect } from 'react';
import { storeConfig } from '../config/store';

interface DocumentMetaOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

/**
 * Updates document title, meta description, canonical URL, and Open Graph tags
 * on route transitions for SEO and link sharing.
 */
export function useDocumentMeta({ title, description, path = '/', image }: DocumentMetaOptions) {
  useEffect(() => {
    const fullTitle = title.includes('MAHA Fancy Store')
      ? title
      : `${title} | MAHA Fancy Store`;
    document.title = fullTitle;

    const setMetaTag = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : storeConfig.siteUrl;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${origin}${cleanPath}`;

    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);

    const imageUrl = image
      ? image.startsWith('http')
        ? image
        : `${origin}${image}`
      : `${origin}${storeConfig.logoPath}`;
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [title, description, path, image]);
}
