import type { NextApiRequest, NextApiResponse } from 'next';
import { execSync } from 'child_process';
import path from 'path';
import { languages } from '../../i18n-config';

const siteUrl = 'https://xsave.app';
// The empty string represents the homepage, other strings are paths
const pages = ['', '/about', '/privacy', '/disclaimer', '/contact']; 
const locales = Object.keys(languages);

/**
 * Gets the last git commit date for a file in YYYY-MM-DD format.
 * Falls back to the current date if git is not available or the file is not committed.
 * @param filePath The absolute path to the file.
 * @returns The last modified date string.
 */
function getGitLastModified(filePath: string): string {
  try {
    // Use %as for author date, YYYY-MM-DD format
    const gitDate = execSync(`git log -1 --format=%as -- ${filePath}`, {
      encoding: "utf-8",
    }).trim();
    // Fallback if gitDate is empty (e.g., for a new untracked file)
    return gitDate || new Date().toISOString().split("T")[0];
  } catch (err) {
    // Fallback to current date if git info is unavailable
    console.warn(`Could not get git last modified date for ${filePath}. Falling back to current date.`);
    return new Date().toISOString().split("T")[0];
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  pages.forEach(page => {
    // The file path is always based on the page component file.
    const pageFileName = page === '' ? 'index.tsx' : `${page.slice(1)}.tsx`;
    // Fix: `process.cwd` is a function and must be called as `process.cwd()`.
    const filePath = path.join(process.cwd(), 'pages', pageFileName);
    const lastmod = getGitLastModified(filePath);

    // Create a sitemap <url> entry for each page that should be indexed.
    // Our strategy: Homepages for all locales, but subpages only for 'en'.
    locales.forEach(locale => {
      if (page !== '' && locale !== 'en') {
        return; // Skip non-English subpages as they are no-indexed.
      }
      
      const localePrefix = locale === 'en' ? '' : `/${locale}`;
      // Add a trailing slash ONLY for the homepage
      const trailingSlash = page === '' ? '/' : '';
      const pageUrl = `${siteUrl}${localePrefix}${page}${trailingSlash}`;
      
      xml += `
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastmod}</lastmod>`;

      // For any page included in the sitemap, list ALL its language variants
      // as alternates, which is crucial for correct hreflang implementation.
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

  xml += `
</urlset>`;

  // Set headers and send the response
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=60');
  res.status(200).send(xml);
}