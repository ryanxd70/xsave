import type { NextApiRequest, NextApiResponse } from 'next';

// This API route is deprecated and superseded by the page-based sitemap at /pages/[sitemap].xml.tsx.
// It can be safely deleted.
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(404).json({ message: 'This sitemap API is deprecated.' });
}
