import type { GetServerSideProps } from 'next';

const siteUrl = 'https://xsave.app';
const locales = [
  'en', 'id', 'vi', 'ms', 'jv', 'cs', 'es', 'fr', 'de', 'el',
  'hu', 'it', 'nl', 'pl', 'pt', 'ro', 'th', 'tr', 'uk', 'ru',
  'hi', 'ko', 'zh-CN', 'zh-TW', 'ja'
];
const defaultLocale = 'en';
const staticPages = ['', '/about', '/privacy', '/disclaimer', '/contact'];
const lastmod = '2024-05-20'; 

const generateSitemap = (): string => {
    const urlEntries = staticPages.map(pagePath => {
        const canonicalUrl = `${siteUrl}${pagePath || '/'}`;
        
        const alternateLinks = locales.map(locale => {
            const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
            const href = `${siteUrl}${localePrefix}${pagePath || ''}`;
            return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${href}"/>`;
        }).join('\n');

        return `  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${pagePath === '' ? '1.0' : '0.8'}</priority>
${alternateLinks}
    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalUrl}"/>
  </url>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlEntries}\n</urlset>`;
};

const SitemapPage = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const sitemap = generateSitemap();

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache for 24 hours
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default SitemapPage;