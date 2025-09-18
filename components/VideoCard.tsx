import React from 'react';
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
        <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
            <div className="relative aspect-video">
                <img 
                  src={videoData.thumbnail} 
                  alt="Video thumbnail" 
                  className="absolute h-full w-full left-0 top-0 right-0 bottom-0 object-cover"
                  loading="lazy"
                />
            </div>
            <div className="p-6">
                <p className="text-gray-900 dark:text-gray-200 text-left">{videoData.title}</p>
                <div className="mt-6 flex flex-col items-center gap-3">
                {videoData.variants.map((variant) => (
                    <a
                      key={variant.quality}
                      href={variant.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 px-4 py-2 bg-gray-900 hover:bg-gray-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors duration-200 group"
                    >
                        <DownloadIcon className="h-5 w-5 text-gray-300" />
                        <span className="font-medium text-sm text-white">{variant.quality}</span>
                    </a>
                ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default VideoCard;