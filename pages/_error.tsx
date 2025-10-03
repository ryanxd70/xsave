import type { NextPageContext } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { ServerIcon } from '../components/icons/ServerIcon';

// Import all translation files directly to avoid server-side fs access in getInitialProps
import en from '../locales/en/common.json';
import id from '../locales/id/common.json';
import vi from '../locales/vi/common.json';
import ms from '../locales/ms/common.json';
import jv from '../locales/jv/common.json';
import cs from '../locales/cs/common.json';
import es from '../locales/es/common.json';
import fr from '../locales/fr/common.json';
import de from '../locales/de/common.json';
import el from '../locales/el/common.json';
import hu from '../locales/hu/common.json';
import it from '../locales/it/common.json';
import nl from '../locales/nl/common.json';
import pl from '../locales/pl/common.json';
import pt from '../locales/pt/common.json';
import ro from '../locales/ro/common.json';
import th from '../locales/th/common.json';
import tr from '../locales/tr/common.json';
import uk from '../locales/uk/common.json';
import ru from '../locales/ru/common.json';
import hi from '../locales/hi/common.json';
import ko from '../locales/ko/common.json';
import zhCN from '../locales/zh-CN/common.json';
import zhTW from '../locales/zh-TW/common.json';
import ja from '../locales/ja/common.json';

const allTranslations: Record<string, Record<string, string>> = {
  en, id, vi, ms, jv, cs, es, fr, de, el, hu, it, nl, pl, pt, ro, th, tr, uk, ru, hi, ko, 'zh-CN': zhCN, 'zh-TW': zhTW, ja
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
                title={`${statusCode || 'Error'} - ${title}`}
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


ErrorPage.getInitialProps = ({ res, err, locale }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const defaultLocale = 'en';
  const lang = locale || defaultLocale;

  const translations = allTranslations[lang] || allTranslations[defaultLocale];
  const fallbackTranslations = allTranslations[defaultLocale];

  return { statusCode, translations, fallbackTranslations };
};

export default ErrorPage;