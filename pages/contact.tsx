import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ContactPageContent from '../components/ContactPage';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageMetadata, getBreadcrumbSchema } from '../constants';
import { languages } from '../i18n-config';
import { getStaticProps } from '../lib/translations';

const ContactPage = () => {
    const { t } = useLanguage();
    const { locale } = useRouter();
    const metadata = getPageMetadata(t)['contact'];
    const siteUrl = 'https://xsave.app';
    const pagePath = '/contact';

    const canonicalUrl = `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${pagePath}`;
    const breadcrumbSchema = getBreadcrumbSchema('contact', t, siteUrl, locale);
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
            <ContactPageContent />
        </>
    );
};

export { getStaticProps };

export default ContactPage;