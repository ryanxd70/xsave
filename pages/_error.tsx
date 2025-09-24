import type { NextPageContext } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { ServerIcon } from '../components/icons/ServerIcon';

// We need a minimal version of the LanguageProvider logic here since we can't use getStaticProps
const loadTranslationForError = async (lang: string): Promise<Record<string, string>> => {
  try {
    const translations = await import(`../locales/${lang}/common.json`);
    return translations.default;
  } catch (error) {
    console.warn(`Could not load translation file for locale: ${lang}.`);
    return {};
  }
};

interface ErrorPageProps {
  statusCode?: number;
  translations: Record<string, string>;
  fallbackTranslations: Record<string, string>;
}

const ErrorContent = ({ statusCode }: { statusCode?: number }) => {
    const { t } = useLanguage();

    const getErrorDetails = () => {
        switch (statusCode) {
            case 400:
                return {
                    title: t('error_page_title_400'),
                    description: t('error_page_description_400'),
                };
            case 500:
                 return {
                    title: t('error_page_title_500'),
                    description: t('error_page_description_500'),
                };
            default:
                return {
                    title: t('error_page_title_generic'),
                    description: t('error_page_description_generic'),
                };
        }
    };

    const { title, description } = getErrorDetails();

    return (
        <>
            <NextSeo
                title={`${statusCode || 'Error'} - ${title} - XSave`}
                noindex={true}
                nofollow={true}
            />
            <section className="text-center flex flex-col items-center justify-center animate-fade-in py-16">
                <ServerIcon className="h-20 w-20 text-blue-500 mb-6" />
                <h1 className="text-6xl md:text-8xl font-extrabold text-blue-600 dark:text-blue-500 mb-4">
                    {statusCode || ''}
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {title}
                </h2>
                <p className="text-base text-gray-900 dark:text-gray-300 mb-12 max-w-md">
                    {description}
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 dark:focus:ring-blue-400/30"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>{t('go_back_home')}</span>
                </Link>
            </section>
        </>
    );
}


const ErrorPage = ({ statusCode, translations, fallbackTranslations }: ErrorPageProps) => {
    return (
        <LanguageProvider translations={translations} fallbackTranslations={fallbackTranslations}>
            <ErrorContent statusCode={statusCode} />
        </LanguageProvider>
    );
};


ErrorPage.getInitialProps = async ({ res, err, locale }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const defaultLocale = 'en';
  const lang = locale || defaultLocale;

  const translations = await loadTranslationForError(lang);
  const fallbackTranslations = lang !== defaultLocale ? await loadTranslationForError(defaultLocale) : translations;

  return { statusCode, translations, fallbackTranslations };
};

export default ErrorPage;