import type { GetServerSideProps } from 'next';

const locales = [
  'en', 'id', 'vi', 'ms', 'jv', 'cs', 'es', 'fr', 'de', 'el',
  'hu', 'it', 'nl', 'pl', 'pt', 'ro', 'th', 'tr', 'uk', 'ru',
  'hi', 'ko', 'zh-CN', 'zh-TW', 'ja'
];
const defaultLocale = 'en';
const staticPages = ['/about', '/privacy', '/disclaimer', '/contact'];

const generateSitemapIndex = (siteUrl: string): string => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>`;

const generateSitemapUrls = (siteUrl: string): string => {
    // Add the homepage (represented by an empty string) to the list of static pages.
    const pages = ['', ...staticPages]; 
    const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    let urlsXml = '';

    for (const pagePath of pages) {
        // The canonical URL should point to the default language version (English).
        const canonicalUrl = `${siteUrl}${pagePath}`;

        urlsXml += '  <url>\n';
        urlsXml += `    <loc>${canonicalUrl}</loc>\n`;
        urlsXml += `    <lastmod>${lastmod}</lastmod>\n`;
        urlsXml += '    <changefreq>daily</changefreq>\n';
        urlsXml += '    <priority>0.7</priority>\n';

        // Add alternate links for every language variant of the page.
        for (const locale of locales) {
            const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
            // Correctly construct the URL without adding a trailing slash to the homepage.
            const href = `${siteUrl}${localePrefix}${pagePath}`;
            urlsXml += `    <xhtml:link rel="alternate" hreflang="${locale}" href="${href}"/>\n`;
        }
        
        // Add the x-default link pointing to the default language version.
        const xDefaultHref = `${siteUrl}${pagePath}`;
        urlsXml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultHref}"/>\n`;
        
        urlsXml += '  </url>\n';
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlsXml}</urlset>`;
};

const SitemapPage = () => null; // This component will not be rendered.

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const sitemapParam = params?.sitemap as string;
  // Use SITE_URL from environment variables if available, otherwise default.
  const siteUrl = process.env.SITE_URL || 'https://xsave.app';
  
  let content = '';

  if (sitemapParam === 'sitemap') {
    content = generateSitemapIndex(siteUrl);
  } else if (sitemapParam === 'sitemap-0') {
    content = generateSitemapUrls(siteUrl);
  } else {
    res.statusCode = 404;
    res.end();
    return { props: {} };
  }

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.write(content);
  res.end();

  return { props: {} };
};

export default SitemapPage;