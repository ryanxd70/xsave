import Script from 'next/script';
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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-MWDYF2PJRL"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MWDYF2PJRL');
        `}
      </Script>
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
