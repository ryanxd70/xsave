import { GetServerSideProps } from 'next';
import { languages } from '../i18n-config';

const siteUrl = 'https://xsave.app';
const pages = ['', '/about', '/privacy', '/disclaimer', '/contact'];
const locales = Object.keys(languages);

const generateSitemap = (): string => {
  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  pages.forEach(page => {
    locales.forEach(locale => {
      const localePrefix = locale === 'en' ? '' : `/${locale}`;
      const pageUrl = `${siteUrl}${localePrefix}${page}`;
      
      xml += `
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastmod}</lastmod>`;

      // Add all alternate language versions for this page
      locales.forEach(alternateLocale => {
        const alternateLocalePrefix = alternateLocale === 'en' ? '' : `/${alternateLocale}`;
        const alternateUrl = `${siteUrl}${alternateLocalePrefix}${page}`;
        xml += `
    <xhtml:link rel="alternate" hreflang="${alternateLocale}" href="${alternateUrl}" />`;
      });
      
      xml += `
  </url>`;
    });
  });

  xml += `
</urlset>`;

  return xml;
};

const SitemapPage = () => {
  // This component does not render anything.
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSitemap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SitemapPage;