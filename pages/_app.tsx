import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { LanguageProvider } from '../contexts/LanguageContext';
import Layout from '../components/Layout';
import TopProgressBar from '../components/TopProgressBar';
import seoConfig from '../seo.config';
import '../styles/globals.css';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

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
      <TopProgressBar />
      <div className={`${inter.variable} ${outfit.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </LanguageProvider>
  );
}

export default MyApp;
