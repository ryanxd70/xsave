import { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import http from 'http';
import { URL } from 'url';
import { spawn } from 'child_process';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url: targetUrl, filename, mode } = req.query;

  if (!targetUrl || typeof targetUrl !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  const safeFilename = (filename as string || 'download').replace(/\s+/g, '_').replace(/[^a-z0-9._-]/gi, '');

  if (mode === 'mp3') {
    try {
      // Set headers for MP3 download
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);

      // Use yt-dlp to extract best audio and convert to mp3 on the fly
      let ytdlp;
      try {
        const dynamicRequire = eval('require');
        ytdlp = dynamicRequire('yt-dlp-exec');
      } catch (e) {
        throw new Error('yt-dlp-exec is not installed');
      }

      const ytProcess = ytdlp.exec(targetUrl, {
        format: 'bestaudio',
        extractAudio: true,
        audioFormat: 'mp3',
        audioQuality: 0,
        output: '-',
        noPlaylist: true,
        noWarnings: true,
        quiet: true,
        referer: 'https://twitter.com/',
        extractorArgs: 'twitter:api=Syndication',
      }, {
        stdio: ['ignore', 'pipe', 'pipe']
      });

      ytProcess.stdout.pipe(res);

      let errorOutput = '';
      ytProcess.stderr.on('data', (data: Buffer) => {
        errorOutput += data.toString();
      });

      ytProcess.on('error', (err: Error) => {
        console.error('yt-dlp spawn error:', err);
        if (!res.writableEnded) {
          res.status(500).end('Failed to start downloader.');
        }
      });

      ytProcess.on('close', (code: number) => {
        if (code !== 0) {
          console.error(`yt-dlp exited with code ${code}: ${errorOutput}`);
          if (!res.writableEnded) {
            console.error('Download failed');
          }
        }
      });

      return;
    } catch (error) {
      console.error('MP3 Download error:', error);
      return res.status(500).json({ error: 'Failed to process MP3' });
    }
  }

  try {
    const download = (currentUrl: string, depth = 0) => {
      if (depth > 5) {
        return res.status(500).json({ error: 'Too many redirects' });
      }

      const parsedUrl = new URL(currentUrl);
      const protocol = parsedUrl.protocol === 'https:' ? https : http;

      const options = {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://twitter.com/',
        }
      };

      protocol.get(currentUrl, options, (proxyRes) => {
        // Handle Redirects
        if (proxyRes.statusCode && proxyRes.statusCode >= 300 && proxyRes.statusCode < 400 && proxyRes.headers.location) {
          proxyRes.resume(); // Consume the response
          return download(new URL(proxyRes.headers.location, currentUrl).toString(), depth + 1);
        }

        if (proxyRes.statusCode !== 200) {
          proxyRes.resume();
          return res.status(proxyRes.statusCode || 500).end(`Failed to fetch source: ${proxyRes.statusCode}`);
        }

        const contentType = proxyRes.headers['content-type'] || 'application/octet-stream';
        const contentLength = proxyRes.headers['content-length'];
        const safeFilename = (filename as string || 'download').replace(/\s+/g, '_').replace(/[^a-z0-9._-]/gi, '');

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
        if (contentLength) {
          res.setHeader('Content-Length', contentLength);
        }

        proxyRes.pipe(res);
      })
.on('error', (err) => {
        console.error('Request error:', err);
        if (!res.writableEnded) res.status(500).json({ error: err.message });
      });
    };

    download(targetUrl);
  } catch (error) {
    console.error('Download proxy error:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
}
