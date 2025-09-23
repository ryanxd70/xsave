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
  const pages = ['', ...staticPages]; // Add root page

  const urlEntries = pages.map(page => {
    const loc = `${siteUrl}${page}`;
    
    const alternateLinks = locales.map(locale => {
      const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
      const href = `${siteUrl}${localePrefix}${page}`;
      return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${href}"/>`;
    }).join('\n');
    
    const xDefaultLocalePrefix = defaultLocale === 'en' ? '' : `/${defaultLocale}`;
    const xDefaultHref = `${siteUrl}${xDefaultLocalePrefix}${page}`;
    const xDefaultLink = `<xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultHref}"/>`;

    return `
  <url>
    <loc>${loc}</loc>
${'    '}${xDefaultLink}
${alternateLinks}
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urlEntries}
</urlset>`;
};

const SitemapPage = () => null; // This component will not be rendered.

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const sitemapParam = params?.sitemap as string;
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