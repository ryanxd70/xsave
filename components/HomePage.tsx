

import React, { useState, useCallback } from 'react';
import VideoCard from './VideoCard';
import FAQItem from './FAQItem';
import { LogoIcon } from './icons/LogoIcon';
import type { VideoData } from '../types';
import { getFaqData } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const errorId = "url-error-message";

  const handleFaqToggle = (index: number) => {
    setOpenFaqIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError(t('error_enter_url'));
      return;
    }
    setLoading(true);
    setError(null);
    setVideoData(null);

    try {
      const response = await fetch('/api/resolve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t('error_bad_response'));
      }
      
      setVideoData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t('error_generic'));
      }
    } finally {
      setLoading(false);
    }
  }, [url, t]);

  const FAQ_DATA = getFaqData(t);

  return (
    <>
      <section id="home" className="text-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            {t('twitter_video_downloader')}
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-900 dark:text-gray-300">
            {t('paste_url_prompt')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-white dark:bg-gray-900/50 p-2 rounded-full border border-gray-200 dark:border-gray-700 focus-within:ring-4 focus-within:ring-blue-500/50 dark:focus-within:ring-blue-400/30 transition-shadow shadow-lg">
            <div className="w-full flex items-center pl-4">
              <LogoIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t('enter_url_placeholder')}
                className="w-full p-3 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                aria-label="Twitter/X URL"
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex-shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 dark:focus:ring-blue-400/30"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : t('download')}
            </button>
          </div>
        </form>

        <div className="mt-4 min-h-[80px]">
          {error && (
            <div id={errorId} className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">{t('oops')}</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}
           <div className="mt-4 flex flex-col items-center gap-4 animate-fade-in">
            {videoData && <VideoCard videoData={videoData} />}
          </div>
        </div>
      </section>

      <section className="mt-12 text-left bg-gray-100 dark:bg-gray-900 p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {t('xsave_title')}
        </h2>
        <div className="space-y-6 text-base text-gray-900 dark:text-gray-300">
           <p>
              {t('xsave_description_1')}
           </p>
           <p>
              {t('xsave_description_2')}
           </p>
        </div>
      </section>
      
      <section id="how-to" className="mt-16 text-left bg-gray-100 dark:bg-gray-900 p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          {t('how_to_title')}
        </h2>
        <div className="mt-8 text-base text-gray-900 dark:text-gray-300">
          <ol className="space-y-4 list-decimal list-inside">
            <li>{t('how_to_step_1')}</li>
            <li>{t('how_to_step_2')}</li>
            <li>{t('how_to_step_3')}</li>
            <li>{t('how_to_step_4')}</li>
            <li>{t('how_to_step_5')}</li>
          </ol>
        </div>
      </section>

      <section id="features" className="mt-16 text-left bg-gray-100 dark:bg-gray-900 p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {t('features_title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8 text-base text-gray-900 dark:text-gray-300">
          <p dangerouslySetInnerHTML={{ __html: t('feature_1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('feature_2') }} />
          <p dangerouslySetInnerHTML={{ __html: t('feature_3') }} />
          <p dangerouslySetInnerHTML={{ __html: t('feature_4') }} />
        </div>
      </section>

      <section id="faq" className="mt-16 bg-gray-100 dark:bg-gray-900 p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          {t('faq_title')}
        </h2>
        <div className="mt-8 space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaqIndex === index}
              onToggle={() => handleFaqToggle(index)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;