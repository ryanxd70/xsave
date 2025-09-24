import type { GetServerSideProps } from 'next';
import { languages } from '../i18n-config';

const siteUrl = 'https://xsave.app';
const pages = ['', '/about', '/privacy', '/disclaimer', '/contact'];
const locales = Object.keys(languages);

const generateSitemap = (): string => {
  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  pages.forEach((page) => {
    locales.forEach((locale) => {
      const localePrefix = locale === 'en' ? '' : `/${locale}`;
      const pageUrl = `${siteUrl}${localePrefix}${page}`;
      
      xml += `
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastmod}</lastmod>`;

      locales.forEach((alt) => {
        const altPrefix = alt === 'en' ? '' : `/${alt}`;
        const altUrl = `${siteUrl}${altPrefix}${page}`;
        xml += `
    <xhtml:link rel="alternate" hreflang="${alt}" href="${altUrl}" />`;
      });

      xml += `
  </url>`;
    });
  });

  xml += `
</urlset>`;

  return xml;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSitemap();

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=60');
  
  res.write(sitemap);
  res.end();

  return { props: {} };
};

// ⚠️ Exporting default is required, but no component is used.
export default function Sitemap() {
  return null;
}
