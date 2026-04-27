import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import TwitterToMP3PageContent from '../components/TwitterToMP3Page';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageMetadata, getFaqSchema, getBreadcrumbSchema } from '../constants';
import { languages } from '../i18n-config';
import { getStaticProps } from '../lib/translations';

const TwitterToMP3Page = () => {
    const { t } = useLanguage();
    const { locale } = useRouter();
    const metadata = getPageMetadata(t)['twitter-to-mp3'];
    const siteUrl = 'https://xsave.app';
    const pagePath = '/download-twitter-mp3';

    const canonicalUrl = `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${pagePath}`;
    const faqJsonLd = getFaqSchema(t);
    const breadcrumbSchema = getBreadcrumbSchema('twitter-to-mp3', t, siteUrl, locale);

    const webAppJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'XSave - Twitter/X to MP3 Converter',
        url: `${siteUrl}${pagePath}`,
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
                {breadcrumbSchema && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                        key="breadcrumb-jsonld"
                    />
                )}
            </Head>
            <TwitterToMP3PageContent />
        </>
    );
};

export { getStaticProps };

export default TwitterToMP3Page;
