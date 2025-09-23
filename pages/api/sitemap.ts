// Fix: Correctly import Next.js API types as type-only imports.
import type { NextApiRequest, NextApiResponse } from 'next';

const siteUrl = 'https://xsave.app';
const locales = [
  'en', 'id', 'vi', 'ms', 'jv', 'cs', 'es', 'fr', 'de', 'el',
  'hu', 'it', 'nl', 'pl', 'pt', 'ro', 'th', 'tr', 'uk', 'ru',
  'hi', 'ko', 'zh-CN', 'zh-TW', 'ja'
];
const defaultLocale = 'en';
// These are the canonical page paths in the default locale.
const staticPages = ['', '/about', '/privacy', '/disclaimer', '/contact']; 

// Use a fixed date for lastmod for static content. 
// This should only be updated when the content on these pages actually changes.
const lastmod = '2024-05-20'; 

const generateSitemap = (): string => {
    const urlEntries = staticPages.map(pagePath => {
        // The canonical URL is the default language (English) version.
        const canonicalUrl = `${siteUrl}${pagePath || '/'}`;

        const alternateLinks = locales.map(locale => {
            const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
            const href = `${siteUrl}${localePrefix}${pagePath || ''}`;
            return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${href}"/>`;
        }).join('\n');

        const xDefaultLink = `    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalUrl}"/>`;

        return `
  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${pagePath === '' ? '1.0' : '0.8'}</priority>
${alternateLinks}
${xDefaultLink}
  </url>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urlEntries}
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
    
    try {
        let content: string;
        if (page === 'index') {
            content = generateSitemapIndex();
        } else if (page === '0') {
            content = generateSitemap();
        } else {
            return res.status(404).end();
        }

        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache for 24 hours
        res.status(200).send(content);

    } catch (e) {
        let message = 'Unknown Error';
        if (e instanceof Error) message = e.message;
        console.error('Sitemap generation error:', message);
        res.status(500).end();
    }
}