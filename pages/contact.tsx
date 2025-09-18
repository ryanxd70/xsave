
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ContactPageContent from '../components/ContactPage';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageMetadata, getBreadcrumbSchema } from '../constants';
import { languages } from '../i18n-config';
import type { GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs';

const ContactPage = () => {
    const { t } = useLanguage();
    const { locale } = useRouter();
    const metadata = getPageMetadata(t)['contact'];
    const siteUrl = 'https://xsave.app';
    const pagePath = '/contact';

    const canonicalUrl = `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${pagePath}`;
    const breadcrumbSchema = getBreadcrumbSchema('contact', t, siteUrl, locale);

    return (
        <>
            <NextSeo
                title={metadata.title}
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const defaultLocale = 'en';
  
  const loadTranslation = (lang: string) => {
    try {
      const filePath = path.join(process.cwd(), 'locales', lang, 'common.json');
      const jsonContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(jsonContent);
    } catch (error) {
      console.warn(`Could not load translation file for locale: ${lang}. Falling back.`);
      return {};
    }
  };

  const translations = loadTranslation(locale || defaultLocale);
  const fallbackTranslations = loadTranslation(defaultLocale);

  return {
    props: {
      translations,
      fallbackTranslations,
    },
  };
};

export default ContactPage;
