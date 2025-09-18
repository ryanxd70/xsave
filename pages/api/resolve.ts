import { NextApiRequest, NextApiResponse } from 'next';
import type { VideoData, Variant } from '../../types';
import ytDlpExec from 'yt-dlp-exec';

/**
 * Formats bytes into a human-readable string (KB, MB, GB).
 * @param bytes The number of bytes.
 * @param decimals The number of decimal places.
 * @returns A formatted string.
 */
function formatBytes(bytes: number, decimals = 2): string {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    const { url } = req.body;

    if (!url || (typeof url === 'string' && (!url.includes('twitter.com/') && !url.includes('x.com/')))) {
        return res.status(400).json({ message: 'Invalid Twitter/X URL provided. Please check the link and try again.' });
    }
    
    try {
        const output = await ytDlpExec(url, {
            dumpJson: true,
            // Optionally add flags like --cookies-from-browser to handle private tweets if needed
        });

        const videoInfo = output;

        if (!videoInfo || !videoInfo.formats) {
            throw new Error('Could not retrieve video information. The URL may be invalid or the tweet may not contain a video.');
        }

        const variants: Variant[] = videoInfo.formats
            // Keep formats that have a URL and audio (acodec !== 'none'). This filters out video-only streams.
            .filter((format: any) => format.url && format.acodec !== 'none')
            .map((format: any) => {
                let quality: string;
                // If a format has no video codec, or it's a very low resolution (likely album art), treat as audio.
                if (format.vcodec === 'none' || !format.height || format.height < 100) {
                    quality = 'Download Audio Only';
                } else {
                    // Otherwise, it's a video stream
                    quality = `Download ${format.width}x${format.height}: ${format.ext.toUpperCase()}`;
                }
                
                return {
                    quality,
                    size: format.filesize ? formatBytes(format.filesize) : 'N/A',
                    url: format.url,
                };
            });

        // Deduplicate variants based on the unique quality string and then sort them
        const uniqueVariants = Array.from(new Map(variants.map(v => [v.quality, v])).values())
            .sort((a, b) => {
                 const aResMatch = a.quality.match(/(\d+)x(\d+)/);
                 const bResMatch = b.quality.match(/(\d+)x(\d+)/);

                 if (aResMatch && bResMatch) {
                     const aHeight = parseInt(aResMatch[2], 10);
                     const bHeight = parseInt(bResMatch[2], 10);
                     if (aHeight !== bHeight) {
                         return bHeight - aHeight; // Sort by height descending
                     }
                 }
                 
                 // If resolutions are the same or one is missing, check for audio
                 if (a.quality.includes('Audio')) return 1; // Put audio at the very end
                 if (b.quality.includes('Audio')) return -1;
                 
                 return 0;
            });
        
        if (uniqueVariants.length === 0) {
            // Check if there were only video-only streams to provide a better error
            const hasVideoOnly = videoInfo.formats.some((f: any) => f.acodec === 'none' && f.vcodec !== 'none');
            if (hasVideoOnly) {
                throw new Error('No video formats with audio were found. This may be a silent video or a different format.');
            }
            throw new Error('No downloadable video formats found for this tweet.');
        }

        const videoData: VideoData = {
            title: videoInfo.title || 'Untitled Video',
            thumbnail: videoInfo.thumbnail,
            variants: uniqueVariants,
        };

        return res.status(200).json(videoData);

    } catch (error: any) {
        console.error('yt-dlp error:', error);
        let userMessage = 'Failed to get video data. The tweet might not contain a video, or there was a server error.';
        if (error?.stderr) {
            if (error.stderr.includes('private') || error.stderr.includes('protected tweet')) {
                userMessage = 'This video is private, has been deleted, or is from an account you do not have access to.';
            } else if (error.stderr.includes('Unsupported URL')) {
                 userMessage = 'Invalid Twitter/X URL provided. Please check the link and try again.';
            } else if (error.stderr.includes('No media found')) {
                 userMessage = 'This tweet does not contain any downloadable video or GIF.';
            }
        } else if (error instanceof Error) {
            userMessage = error.message;
        }

        return res.status(500).json({ message: userMessage });
    }
}