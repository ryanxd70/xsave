import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DisclaimerPageContent from '../components/DisclaimerPage';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageMetadata, getBreadcrumbSchema } from '../constants';
import { languages } from '../i18n-config';
import { getStaticProps } from '../lib/translations';

const DisclaimerPage = () => {
    const { t } = useLanguage();
    const { locale } = useRouter();
    const metadata = getPageMetadata(t)['disclaimer'];
    const siteUrl = 'https://xsave.app';
    const pagePath = '/disclaimer';

    const canonicalUrl = `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${pagePath}`;
    const breadcrumbSchema = getBreadcrumbSchema('disclaimer', t, siteUrl, locale);
    const shouldNoIndex = locale !== 'en';

    return (
        <>
            <NextSeo
                title={metadata.title}
                description={metadata.description}
                canonical={canonicalUrl}
                noindex={shouldNoIndex}
                nofollow={shouldNoIndex ? false : undefined}
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
            {breadcrumbSchema && (
                <Head>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                        key="breadcrumb-jsonld"
                    />
                </Head>
            )}
            <DisclaimerPageContent />
        </>
    );
};

export { getStaticProps };

export default DisclaimerPage;