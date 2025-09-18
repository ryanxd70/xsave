import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { LanguageProvider } from '../contexts/LanguageContext';
import Layout from '../components/Layout';
import seoConfig from '../seo.config';
import '../styles/globals.css';

type AppPropsWithTranslations = AppProps & {
  pageProps: {
    translations?: Record<string, string>;
    fallbackTranslations?: Record<string, string>;
  }
}

function MyApp({ Component, pageProps }: AppPropsWithTranslations) {
  return (
    <LanguageProvider 
      translations={pageProps.translations || {}}
      fallbackTranslations={pageProps.fallbackTranslations || {}}
    >
      <DefaultSeo {...seoConfig} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LanguageProvider>
  );
}

export default MyApp;
