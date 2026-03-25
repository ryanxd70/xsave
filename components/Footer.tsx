
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { FacebookIcon } from './icons/FacebookIcon';
import { PinterestIcon } from './icons/PinterestIcon';
import { XIcon } from './icons/XIcon';
import { TelegramIcon } from './icons/TelegramIcon';
import { RedditIcon } from './icons/RedditIcon';
import { XSaveLogoIcon } from './icons/XSaveLogoIcon';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 border-t border-white/5 dark:border-gray-800 text-gray-400">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-transform hover:scale-105" aria-label="Go to homepage">
                <XSaveLogoIcon className="h-10 w-auto text-white" />
            </Link>
            <p className="mt-6 text-base leading-relaxed max-w-sm text-gray-400">
              {t('footer_site_description')}
            </p>
            <div className="mt-8 flex justify-center md:justify-start space-x-5">
                <a href="https://www.facebook.com/people/Xsave/61588034676582/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-white/5 p-2 rounded-xl shadow-sm border border-white/10 text-[#1877F2] hover:bg-white/10 transition-all"><FacebookIcon className="h-5 w-5" /></a>
                <a href="https://www.pinterest.com/xsaveapp/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="bg-white/5 p-2 rounded-xl shadow-sm border border-white/10 text-[#E60023] hover:bg-white/10 transition-all"><PinterestIcon className="h-5 w-5" /></a>
                <a href="https://x.com/xsave_app" target="_blank" rel="noopener noreferrer" aria-label="X" className="bg-white/5 p-2 rounded-xl shadow-sm border border-white/10 text-white hover:bg-white/10 transition-all"><XIcon className="h-5 w-5" /></a>
                <a href="https://t.me/xsaveapp" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="bg-white/5 p-2 rounded-xl shadow-sm border border-white/10 text-[#24A1DE] hover:bg-white/10 transition-all"><TelegramIcon className="h-5 w-5" /></a>
                <a href="https://www.reddit.com/r/XSave/" target="_blank" rel="noopener noreferrer" aria-label="Reddit" className="bg-white/5 p-2 rounded-xl shadow-sm border border-white/10 text-[#FF4500] hover:bg-white/10 transition-all"><RedditIcon className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">{t('quick_links')}</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-blue-400 transition-colors text-sm font-medium">XSave</Link></li>
              <li><Link href="/#how-to" scroll={true} className="hover:text-blue-400 transition-colors text-sm font-medium">{t('how_to_use_nav')}</Link></li>
              <li><Link href="/#home" scroll={true} className="hover:text-blue-400 transition-colors text-sm font-medium">{t('download')}</Link></li>
              <li><Link href="/#faq" scroll={true} className="hover:text-blue-400 transition-colors text-sm font-medium">{t('faq')}</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">{t('footer_nav_company')}</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors text-sm font-medium">{t('about')}</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors text-sm font-medium">{t('contact_us')}</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors text-sm font-medium">{t('blog')}</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors text-sm font-medium">{t('privacy_policy')}</Link></li>
              <li><Link href="/disclaimer" className="hover:text-blue-400 transition-colors text-sm font-medium">{t('disclaimer_page_title')}</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-sm font-medium text-gray-300">&copy; {new Date().getFullYear()} xsave.app. {t('all_rights_reserved')}</p>
          <p className="mt-4 text-xs opacity-40 leading-relaxed max-w-2xl mx-auto text-gray-400">{t('footer_disclaimer_short')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;