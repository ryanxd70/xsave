import type { NextApiRequest, NextApiResponse } from 'next';

const siteUrl = process.env.SITE_URL || 'https://xsave.app';
const locales = [
  'en', 'id', 'vi', 'ms', 'jv', 'cs', 'es', 'fr', 'de', 'el',
  'hu', 'it', 'nl', 'pl', 'pt', 'ro', 'th', 'tr', 'uk', 'ru',
  'hi', 'ko', 'zh-CN', 'zh-TW', 'ja'
];
const defaultLocale = 'en';
const staticPages = ['/about', '/privacy', '/disclaimer', '/contact'];

const generateSitemap = (): string => {
    const pages = ['', ...staticPages]; 
    const lastmod = new Date().toISOString().split('T')[0];

    const urlEntries = pages.map(pagePath => {
        const canonicalUrl = `${siteUrl}${pagePath}`;
        
        const alternateLinks = locales.map(locale => {
            const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
            const href = `${siteUrl}${localePrefix}${pagePath}`;
            return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${href}"/>`;
        }).join('\n');

        const xDefaultHref = `${siteUrl}${pagePath}`;
        const xDefaultLink = `    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultHref}"/>`;

        return `  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
${alternateLinks}
${xDefaultLink}
  </url>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;
};

const generateSitemapIndex = (): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>`;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { page } = req.query;
    let content = '';

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');

    if (page === 'index') {
        content = generateSitemapIndex();
    } else if (page === '0') {
        content = generateSitemap();
    } else {
        return res.status(404).end();
    }
    
    res.status(200).send(content);
}
