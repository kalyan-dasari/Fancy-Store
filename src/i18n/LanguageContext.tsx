import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, LocalizedText } from '../types';
import { storeConfig } from '../config/store';
import { translations, TranslationKey } from './translations';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  localize: (field: LocalizedText | undefined | null) => string;
}

const SESSION_STORAGE_KEY = 'maha_fancy_store_lang';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

/**
 * Helper that safely returns Telugu text when selected and non-empty,
 * otherwise cleanly falls back to English so blank text is never rendered.
 */
export function getLocalizedText(
  field: LocalizedText | undefined | null,
  language: Language
): string {
  if (!field) return '';
  if (language === 'te' && field.te && field.te.trim().length > 0) {
    return field.te.trim();
  }
  return field.en || '';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved === 'en' || saved === 'te') {
        return saved;
      }
    } catch {
      // Ignore storage access errors in restricted webviews
    }
    return storeConfig.defaultLanguage;
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'te' : 'en');
  }, [language, setLanguage]);

  useEffect(() => {
    document.documentElement.lang = language === 'te' ? 'te' : 'en';
  }, [language]);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>): string => {
      const dict = translations[language] || translations.en;
      let text: string = dict[key] || translations.en[key] || '';
      if (vars) {
        Object.entries(vars).forEach(([k, val]) => {
          text = text.replace(`{${k}}`, String(val));
        });
      }
      return text;
    },
    [language]
  );

  const localize = useCallback(
    (field: LocalizedText | undefined | null): string => getLocalizedText(field, language),
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, localize }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
