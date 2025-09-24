// /pages/sitemap.xml.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { languages } from "../i18n-config";

const siteUrl = "https://xsave.app";
const pages = ["", "/about", "/privacy", "/disclaimer", "/contact"];
const locales = Object.keys(languages);

function generateSitemap(): string {
  const lastmod = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  pages.forEach((page) => {
    locales.forEach((locale) => {
      const localePrefix = locale === "en" ? "" : `/${locale}`;
      const pageUrl = `${siteUrl}${localePrefix}${page}`;
      
      xml += `
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastmod}</lastmod>`;

      locales.forEach((alt) => {
        const altPrefix = alt === "en" ? "" : `/${alt}`;
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
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sitemap = generateSitemap();
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=60");
  res.status(200).send(sitemap);
}
