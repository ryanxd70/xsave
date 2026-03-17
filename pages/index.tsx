
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import HomePageContent from '../components/HomePage';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageMetadata, getFaqSchema } from '../constants';
import { languages } from '../i18n-config';
import { getStaticProps } from '../lib/translations';

const HomePage = () => {
    const { t } = useLanguage();
    const { locale } = useRouter();
    const metadata = getPageMetadata(t)['home'];
    const siteUrl = 'https://xsave.app';
    const pagePath = '';

    const canonicalUrl = `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${pagePath}`;
    const faqJsonLd = getFaqSchema(t);

    const webAppJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'XSave - Twitter/X Video Downloader',
        url: siteUrl,
        description: metadata.description,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any (Web browser)',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    };

    return (
        <>
            <NextSeo
                title={metadata.title}
                titleTemplate="%s"
                description={metadata.description}
                canonical={canonicalUrl}
                openGraph={{
                    url: canonicalUrl,
                    title: metadata.title,
                    description: metadata.description,
                }}
                languageAlternates={Object.keys(languages).map(lang => ({
                    hrefLang: lang,
                    href: `${siteUrl}${lang === 'en' ? '' : `/${lang}`}${pagePath}`,
                }))}
            />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                    key="faq-jsonld"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
                    key="webapp-jsonld"
                />
            </Head>
            <HomePageContent />
        </>
    );
};

export { getStaticProps };

export default HomePage;