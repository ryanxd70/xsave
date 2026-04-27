'use client';

import React, { useState, useCallback, useRef } from 'react';
import VideoCard from './VideoCard';
import FAQItem from './FAQItem';
import { LogoIcon } from './icons/LogoIcon';
import type { VideoData } from '../types';
import { getFaqData } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CloseIcon } from './icons/CloseIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

const TwitterToMP3Page: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const errorId = "url-error-message";
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFaqToggle = (index: number) => {
    setOpenFaqIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const fetchVideoData = useCallback(async (videoUrl: string) => {
    setError(null);
    if (!videoUrl) {
      setError(t('error_enter_url'));
      return;
    }
    setLoading(true);
    setVideoData(null);

    try {
      const response = await fetch('/api/resolve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoUrl, mode: 'mp3' }),
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
  }, [t]);

  const handlePaste = useCallback(async () => {
    try {
        const text = await navigator.clipboard.readText();
        setUrl(text);
        inputRef.current?.focus();
    } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
        setError(t('error_paste_failed'));
    }
  }, [t]);

  const handleClearInput = useCallback(() => {
    setUrl('');
    setError(null);
    inputRef.current?.focus();
  }, []);

  const resetState = useCallback(() => {
    setUrl('');
    setError(null);
    setVideoData(null);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    fetchVideoData(url);
  }, [url, fetchVideoData]);

  const FAQ_DATA = getFaqData(t);

  return (
    <div className="space-y-16">
      <motion.section 
        id="home" 
        className="text-center relative pt-2 pb-4 md:pt-4 md:pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight font-display">
            {t('mp3_title')}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('mp3_prompt')}
          </p>
        </div>

        <form onSubmit={handleSubmit} ref={formRef} className="mt-12 max-w-3xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-gray-900 p-2 rounded-2xl border border-gray-200 dark:border-gray-800 focus-within:ring-4 focus-within:ring-blue-500/10 dark:focus-within:ring-blue-400/10 transition-all shadow-xl dark:shadow-2xl dark:shadow-blue-900/10">
            <div className="w-full flex items-center pl-4 relative">
              <LogoIcon className="h-6 w-6 text-blue-500 flex-shrink-0" />
              <input
                ref={inputRef}
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t('enter_url_placeholder')}
                className="w-full p-4 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-lg"
                aria-label="Twitter/X URL"
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
              />
              <AnimatePresence>
                {url && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    type="button" 
                    onClick={handleClearInput}
                    className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer transition-colors"
                    aria-label={t('clear_input')}
                  >
                    <CloseIcon className="h-4 w-4"/>
                  </motion.button>
                )}
              </AnimatePresence>
               <button 
                type="button" 
                onClick={handlePaste}
                className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 ml-1 cursor-pointer transition-colors"
                aria-label={t('paste_from_clipboard')}
              >
                <ClipboardIcon className="h-5 w-5"/>
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex-shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 focus:outline-none focus:ring-4 focus:ring-blue-500/50 cursor-pointer active:scale-95"
            >
              {loading ? (
                <svg className="animate-spin h-6 w-6 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : t('twitter_to_mp3')}
            </button>
          </div>

          <div className="flex justify-center gap-4 mt-6">
             <Link
                href="/"
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-600`}
             >
                <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700" />
                {t('mp4_label')}
             </Link>
             <div
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-2 bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20 cursor-default`}
             >
                <div className="w-3 h-3 rounded-full bg-white" />
                {t('mp3_label')}
             </div>
          </div>
        </form>

        <div className="mt-8 min-h-[100px] max-w-3xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                id={errorId} 
                className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-700 dark:text-red-400 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm" 
                role="alert"
              >
                <div className="bg-red-100 dark:bg-red-900/40 p-2 rounded-full">
                  <AlertTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0" />
                </div>
                <div className="text-left">
                  <strong className="font-bold block">{t('oops')}</strong>
                  <span className="text-sm opacity-90">{error}</span>
                </div>
              </motion.div>
            )}
            
            {videoData && (
              <motion.div 
                key="video"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <VideoCard videoData={videoData} />
                <button
                  onClick={resetState}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 focus:outline-none focus:ring-4 focus:ring-blue-500/50 cursor-pointer active:scale-95"
                >
                  {t('download_another_video')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      <motion.section 
        className="text-left max-w-4xl mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-4 border-blue-500 pl-6">
           <p>
              {t('mp3_description')}
           </p>
        </div>
      </motion.section>

      <motion.section 
        id="faq" 
        className="max-w-4xl mx-auto px-4 pb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 font-display">
          {t('faq_title')}
        </h2>
        <div className="space-y-4">
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
      </motion.section>
    </div>
  );
};

export default TwitterToMP3Page;
