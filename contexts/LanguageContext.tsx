import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { languages, LanguageCode } from '../i18n-config';

type TFunction = (key: string) => string;
type Translations = Record<string, string>;

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: TFunction;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  translations: Translations;
  fallbackTranslations: Translations;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, translations, fallbackTranslations }) => {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  
  const language = (locale || defaultLocale || 'en') as LanguageCode;

  const setLanguage = useCallback((lang: LanguageCode) => {
    if (languages[lang]) {
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: lang });
    }
  }, [router]);
  
  const t = useCallback((key: string): string => {
    return translations[key] || fallbackTranslations[key] || key;
  }, [translations, fallbackTranslations]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};