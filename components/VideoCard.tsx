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
                      className="w-full sm:w-96 inline-flex items-center justify-between gap-3 px-4 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors duration-200 group text-white"
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <DownloadIcon className="h-5 w-5 text-gray-300 flex-shrink-0" />
                            <span className="font-medium text-sm text-left truncate">{variant.quality}</span>
                        </div>
                        {variant.size !== 'N/A' && (
                           <span className="text-xs font-mono bg-gray-700 dark:bg-blue-500/50 px-2 py-1 rounded-md whitespace-nowrap">{variant.size}</span>
                        )}
                    </a>
                ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default VideoCard;