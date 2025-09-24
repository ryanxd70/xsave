// Fix: Use a type-only import for Next.js types to fix module resolution errors.
import { GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs';
import process from 'process';

/**
 * Loads translation JSON file for a given locale.
 * @param lang The language code (e.g., 'en', 'es').
 * @returns The parsed JSON object for the translations.
 */
const loadTranslation = (lang: string) => {
  try {
    const filePath = path.join(process.cwd(), 'locales', lang, 'common.json');
    const jsonContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonContent);
  } catch (error) {
    console.warn(`Could not load translation file for locale: ${lang}.`);
    return {};
  }
};

/**
 * A reusable getStaticProps function that provides translation props to a page.
 * It loads the translations for the current locale and the fallback English translations.
 */
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const defaultLocale = 'en';
  const lang = locale || defaultLocale;

  const translations = loadTranslation(lang);
  // Load fallback translations only if the current language is not the default.
  const fallbackTranslations = lang !== defaultLocale ? loadTranslation(defaultLocale) : translations;

  return {
    props: {
      translations,
      fallbackTranslations,
    },
  };
};