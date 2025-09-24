import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { getStaticProps } from '../lib/translations';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { BrokenLinkIcon } from '../components/icons/BrokenLinkIcon';

const NotFoundPage = () => {
    const { t } = useLanguage();

    return (
        <>
            <NextSeo
                title={`${t('not_found_title')} - XSave`}
                noindex={true}
                nofollow={true}
            />
            <section className="text-center flex flex-col items-center justify-center animate-fade-in py-16">
                <BrokenLinkIcon className="h-20 w-20 text-blue-500 mb-6" />
                <h1 className="text-6xl md:text-8xl font-extrabold text-blue-600 dark:text-blue-500 mb-4">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {t('not_found_title')}
                </h2>
                <p className="text-base text-gray-900 dark:text-gray-300 mb-12 max-w-md">
                    {t('not_found_description')}
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
};

export { getStaticProps };

export default NotFoundPage;
