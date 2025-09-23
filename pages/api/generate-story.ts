// This file is obsolete as the feature it was used for has been removed.
// It can be safely deleted.
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(404).json({ message: 'This API route is no longer in use.' });
}