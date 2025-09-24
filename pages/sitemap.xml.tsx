import type { GetServerSideProps } from 'next';

const siteUrl = 'https://xsave.app';
const locales = [
  'en', 'id', 'vi', 'ms', 'jv', 'cs', 'es', 'fr', 'de', 'el',
  'hu', 'it', 'nl', 'pl', 'pt', 'ro', 'th', 'tr', 'uk', 'ru',
  'hi', 'ko', 'zh-CN', 'zh-TW', 'ja'
];
const defaultLocale = 'en';
const staticPages = ['', '/about', '/privacy', '/disclaimer', '/contact'];
const lastmod = new Date().toISOString().split('T')[0]; // Use current date

const generateSitemap = (): string => {
    const urlEntries = staticPages.flatMap(pagePath => {
        return locales.map(locale => {
            const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
            const href = `${siteUrl}${localePrefix}${pagePath || ''}`;
            return `  <url>
    <loc>${href}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
        });
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};


const SitemapPage = () => {
  // This component should be empty and return null
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const sitemap = generateSitemap();

    res.setHeader('Content-Type', 'text/xml');
    // Cache for 24 hours
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default SitemapPage;
