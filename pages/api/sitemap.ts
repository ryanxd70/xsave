import type { NextApiRequest, NextApiResponse } from 'next';

const siteUrl = 'https://xsave.app'; // Hardcode to prevent environment issues
const locales = [
  'en', 'id', 'vi', 'ms', 'jv', 'cs', 'es', 'fr', 'de', 'el',
  'hu', 'it', 'nl', 'pl', 'pt', 'ro', 'th', 'tr', 'uk', 'ru',
  'hi', 'ko', 'zh-CN', 'zh-TW', 'ja'
];
const defaultLocale = 'en';
const staticPages = ['/about', '/privacy', '/disclaimer', '/contact'];

const generateSitemap = (): string => {
    const pages = ['', ...staticPages]; // Include the homepage
    const lastmod = new Date().toISOString().split('T')[0];

    const urlEntries = pages.map(pagePath => {
        const urlBlock = [
            '  <url>',
            `    <loc>${siteUrl}${pagePath || '/'}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            '    <changefreq>daily</changefreq>',
            '    <priority>0.7</priority>'
        ];
        
        locales.forEach(locale => {
            const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
            const href = `${siteUrl}${localePrefix}${pagePath || ''}`;
            urlBlock.push(`    <xhtml:link rel="alternate" hreflang="${locale}" href="${href}"/>`);
        });

        urlBlock.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${pagePath || '/'}"/>`);

        urlBlock.push('  </url>');
        return urlBlock.join('\n');
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlEntries}\n</urlset>`;
};

const generateSitemapIndex = (): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${siteUrl}/sitemap-0.xml</loc>\n  </sitemap>\n</sitemapindex>`;
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

        res.setHeader('Content-Type', 'text/xml; charset=utf-8');
        res.status(200).send(content);

    } catch (e) {
        console.error('Sitemap generation error:', e);
        res.status(500).end();
    }
}
