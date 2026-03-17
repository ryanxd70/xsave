import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PrivacyPolicyPageContent from '../components/PrivacyPolicyPage';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageMetadata, getBreadcrumbSchema, getPrivacyPageSchema } from '../constants';
import { languages } from '../i18n-config';
import { getStaticProps } from '../lib/translations';

const PrivacyPage = () => {
    const { t } = useLanguage();
    const { locale } = useRouter();
    const metadata = getPageMetadata(t)['privacy'];
    const siteUrl = 'https://xsave.app';
    const pagePath = '/privacy';

    const canonicalUrl = `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${pagePath}`;
    const breadcrumbSchema = getBreadcrumbSchema('privacy', t, siteUrl, locale);
    const privacySchema = getPrivacyPageSchema(t, canonicalUrl);
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
            <Head>
                {breadcrumbSchema && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                        key="breadcrumb-jsonld"
                    />
                )}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
                    key="privacy-jsonld"
                />
            </Head>
            <PrivacyPolicyPageContent />
        </>
    );
};

export { getStaticProps };

export default PrivacyPage;