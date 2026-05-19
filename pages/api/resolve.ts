import { spawn } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';
import type { VideoData, Variant } from '../../types';

// Interfaces for stronger type checking of the yt-dlp JSON output
interface YtdlpFormat {
  url: string;
  acodec: string;
  vcodec: string;
  height?: number;
  width?: number;
  ext: string;
}

interface YtdlpInfo {
  title: string;
  thumbnail: string;
  formats: YtdlpFormat[];
}

function getYtdlpInfo(url: string): Promise<YtdlpInfo> {
    return new Promise((resolve, reject) => {
        const args = [
            url,
            '--dump-single-json',
            '--no-warnings',
            '--referer', 'https://twitter.com/',
            '--extractor-args', 'twitter:api=Syndication',
        ];

        const ytProcess = spawn('yt-dlp', args);
        let stdout = '';
        let stderr = '';

        ytProcess.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        ytProcess.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        ytProcess.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(stderr || `yt-dlp exited with code ${code}`));
            }
            try {
                resolve(JSON.parse(stdout));
            } catch (e) {
                reject(new Error('Failed to parse yt-dlp output'));
            }
        });

        ytProcess.on('error', (err) => {
            reject(err);
        });
    });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    const { url, mode } = req.body;

    if (!url || (typeof url === 'string' && (!url.includes('twitter.com/') && !url.includes('x.com/')))) {
        return res.status(400).json({ message: 'Invalid Twitter/X URL provided. Please check the link and try again.' });
    }
    
    try {
        const videoInfo = await getYtdlpInfo(url);

        if (!videoInfo || !videoInfo.formats) {
            throw new Error('Could not retrieve video information.');
        }

        if (mode === 'mp3') {
            const videoData: VideoData = {
                title: videoInfo.title || 'Untitled Video',
                thumbnail: videoInfo.thumbnail,
                variants: [
                    {
                        quality: 'Download MP3',
                        url: url, // Use the original tweet URL for the extractor
                        ext: 'mp3'
                    }
                ],
                tweetUrl: url
            };
            return res.status(200).json(videoData);
        }

        const variants: Variant[] = videoInfo.formats
            .filter((format) => format.url && format.acodec !== 'none')
            .map((format): Variant => {
                let quality: string;
                const isAudioOnly = format.vcodec === 'none' || !format.height || format.height < 100;

                // If a format has no video codec, or it's a very low resolution (likely album art), treat as audio.
                if (isAudioOnly) {
                    quality = 'Download Audio Only';
                } else {
                    // Otherwise, it's a video stream
                    quality = `Download ${format.width}x${format.height}: ${format.ext.toUpperCase()}`;
                }

                return {
                    quality,
                    url: format.url,
                    ext: format.ext,
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
            const hasVideoOnly = videoInfo.formats.some((f) => f.acodec === 'none' && f.vcodec !== 'none');
            if (hasVideoOnly) {
                throw new Error('No video formats with audio were found. This may be a silent video or a different format.');
            }
            throw new Error('No downloadable video formats found for this tweet.');
        }

        const videoData: VideoData = {
            title: videoInfo.title || 'Untitled Video',
            thumbnail: videoInfo.thumbnail,
            variants: uniqueVariants,
            tweetUrl: url,
        };

        return res.status(200).json(videoData);

    } catch (error: unknown) {
        console.error('yt-dlp-exec error:', error);
        let userMessage = 'Failed to get video data. The tweet might not contain a video, or there was a server error.';
        
        // Type guard for yt-dlp-exec specific error structure
        const aerr = error as { stderr?: string };

        if (aerr?.stderr) {
            if (aerr.stderr.includes('private') || aerr.stderr.includes('protected tweet')) {
                userMessage = 'This video is private, has been deleted, or is from an account you do not have access to.';
            } else if (aerr.stderr.includes('Unsupported URL')) {
                 userMessage = 'Invalid Twitter/X URL provided. Please check the link and try again.';
            } else if (aerr.stderr.includes('No media found')) {
                 userMessage = 'This tweet does not contain any downloadable video or GIF.';
            }
        } else if (error instanceof Error) {
            userMessage = error.message;
        }

        return res.status(500).json({ message: userMessage });
    }
}