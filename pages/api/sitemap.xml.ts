// pages/api/sitemap.xml.ts
import { NextApiRequest, NextApiResponse } from "next";
import { execSync } from "child_process";
import path from "path";

const locales = [
  "id","vi","ms","jv","cs","es","fr","de","el","hu","it",
  "nl","pl","pt","ro","th","tr","uk","ru","hi","ko","zh-CN",
  "zh-TW","ja"
];

const pages = ["", "about", "privacy", "disclaimer", "contact"];
const baseUrl = "https://xsave.app";

type SitemapUrl = {
  loc: string;
  page: string;
  locale?: string;
};

// Function to get last git commit date for a file
function getGitLastModified(filePath: string): string {
  try {
    const gitDate = execSync(`git log -1 --format=%cd -- ${filePath}`, {
      encoding: "utf-8",
    }).trim();
    return new Date(gitDate).toISOString().split("T")[0];
  } catch (err) {
    // fallback to current date if git info is unavailable
    return new Date().toISOString().split("T")[0];
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sitemapUrls: SitemapUrl[] = [];

  pages.forEach((page) => {
    const pagePath = page ? `/${page}` : "";
    const filePath = path.join(process.cwd(), "pages", `${page || "index"}.tsx`);

    // Default English page
    sitemapUrls.push({ loc: `${baseUrl}${pagePath}`, page });

    // Localized pages
    locales.forEach((locale) => {
      sitemapUrls.push({ loc: `${baseUrl}/${locale}${pagePath}`, page, locale });
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapUrls
    .map((urlObj) => {
      // Path to actual file for lastmod
      const filePath = path.join(
        process.cwd(),
        "pages",
        `${urlObj.page || "index"}.tsx`
      );
      const lastmod = getGitLastModified(filePath);

      const hreflangs = locales
        .map(
          (locale) =>
            `<xhtml:link rel="alternate" hreflang="${locale}" href="${baseUrl}/${locale}${urlObj.page ? `/${urlObj.page}` : ""}" />`
        )
        .join("\n  ");

      return `<url>
  <loc>${urlObj.loc}</loc>
  ${hreflangs}
  <lastmod>${lastmod}</lastmod>
</url>`;
    })
    .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(sitemap);
}
