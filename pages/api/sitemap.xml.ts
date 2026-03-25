import type { NextApiRequest, NextApiResponse } from 'next';
import { execSync } from 'child_process';
import path from 'path';
import { languages } from '../../i18n-config';
import { getPosts } from '../../lib/wordpress';

const siteUrl = 'https://xsave.app';
// Static pages to include in the sitemap
const staticPages = ['', '/about', '/privacy', '/disclaimer', '/contact', '/blog']; 
const locales = Object.keys(languages);

/**
 * Gets the last git commit date for a file in YYYY-MM-DD format.
 * Falls back to the current date if git is not available or the file is not committed.
 */
function getGitLastModified(filePath: string): string {
  try {
    const gitDate = execSync(`git log -1 --format=%as -- ${filePath}`, {
      encoding: "utf-8",
      stdio: ['ignore', 'pipe', 'ignore'] // Ignore errors if git is not present
    }).trim();
    return gitDate || new Date().toISOString().split("T")[0];
  } catch (err) {
    return new Date().toISOString().split("T")[0];
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = await getPosts();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // 1. Process Static Pages
  staticPages.forEach(page => {
    let pageFileName = '';
    if (page === '') pageFileName = 'index.tsx';
    else if (page === '/blog') pageFileName = 'blog/index.tsx';
    else pageFileName = `${page.slice(1)}.tsx`;

    const filePath = path.join(process.cwd(), 'pages', pageFileName);
    const lastmod = getGitLastModified(filePath);

    locales.forEach(locale => {
      // Strategy: Homepage and Blog index for all locales, others only for 'en'
      const isHomepage = page === '';
      const isBlogIndex = page === '/blog';
      
      if (!isHomepage && !isBlogIndex && locale !== 'en') {
        return; // Skip non-English subpages as they are no-indexed.
      }
      
      const localePrefix = locale === 'en' ? '' : `/${locale}`;
      const trailingSlash = isHomepage ? '/' : '';
      const pageUrl = `${siteUrl}${localePrefix}${page}${trailingSlash}`;
      
      xml += `
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${page}${trailingSlash}" />`;

      locales.forEach(alternateLocale => {
        const alternateLocalePrefix = alternateLocale === 'en' ? '' : `/${alternateLocale}`;
        const alternateUrl = `${siteUrl}${alternateLocalePrefix}${page}${trailingSlash}`;
        xml += `
    <xhtml:link rel="alternate" hreflang="${alternateLocale}" href="${alternateUrl}" />`;
      });
      
      xml += `
  </url>`;
    });
  });

  // 2. Process Blog Posts
  posts.forEach(post => {
    const page = `/blog/${post.slug}`;
    const lastmod = new Date(post.date).toISOString().split('T')[0];

    locales.forEach(locale => {
      // Blog posts are indexed in all languages as they don't have noindex meta
      const localePrefix = locale === 'en' ? '' : `/${locale}`;
      const pageUrl = `${siteUrl}${localePrefix}${page}`;
      
      xml += `
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${page}" />`;

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

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=60');
  res.status(200).send(xml);
}