
'use client';

import React from 'react';
import Image from 'next/image';
import type { VideoData } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface VideoCardProps {
  videoData: VideoData;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoData }) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-3xl">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video group">
                <Image 
                  src={videoData.thumbnail} 
                  alt="Video thumbnail" 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            </div>
            <div className="p-8">
                <p className="text-gray-900 dark:text-gray-100 text-lg font-medium leading-relaxed text-left">{videoData.title}</p>
                <div className={`mt-8 grid gap-4 ${videoData.variants.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {videoData.variants.map((variant) => {
                    const isAudioVariant = variant.quality.toLowerCase().includes('audio only');
                    const isMp3 = variant.quality.toLowerCase().includes('mp3') || variant.quality.toLowerCase().includes('audio');
                    const ext = variant.ext || (isMp3 ? 'mp3' : 'mp4');
                    const filename = `${videoData.title.slice(0, 50)}_${variant.quality.replace(/\s+/g, '_')}.${ext}`;
                    
                    // For MP3, prefer using the tweet URL to let yt-dlp handle extraction/conversion
                    const sourceUrl = (isMp3 && videoData.tweetUrl) ? videoData.tweetUrl : variant.url;
                    const downloadUrl = `/api/download?url=${encodeURIComponent(sourceUrl)}&filename=${encodeURIComponent(filename)}${isMp3 ? '&mode=mp3' : ''}`;

                    // Content from user: "Download Audio Only button that shows up with mp4 links generated, should link to http://xsave.app/download-twitter-mp3"
                    const finalUrl = isAudioVariant ? 'http://xsave.app/download-twitter-mp3' : downloadUrl;
                    const isExternal = isAudioVariant;

                    return (
                        <a
                        key={variant.quality}
                        href={finalUrl}
                        download={isExternal ? undefined : filename}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="flex items-center justify-between gap-3 px-6 py-4 bg-gray-900 dark:bg-black hover:bg-blue-600 dark:hover:bg-blue-600 text-white rounded-xl transition-all duration-300 group cursor-pointer border border-gray-800 dark:border-gray-900 hover:border-blue-600 dark:hover:border-blue-600 shadow-sm hover:shadow-lg hover:shadow-blue-500/20"
                        >
                            <span className="font-bold text-sm tracking-wide">{variant.quality}</span>
                            <DownloadIcon className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                    );
                })}
                </div>
            </div>
        </div>
    </div>
  );
};

export default VideoCard;