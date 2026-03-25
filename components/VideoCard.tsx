
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
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {videoData.variants.map((variant) => (
                    <a
                      key={variant.quality}
                      href={variant.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between gap-3 px-6 py-4 bg-gray-900 dark:bg-black hover:bg-blue-600 dark:hover:bg-blue-600 text-white rounded-xl transition-all duration-300 group cursor-pointer border border-gray-800 dark:border-gray-900 hover:border-blue-600 dark:hover:border-blue-600 shadow-sm hover:shadow-lg hover:shadow-blue-500/20"
                    >
                        <span className="font-bold text-sm tracking-wide">{variant.quality}</span>
                        <DownloadIcon className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default VideoCard;