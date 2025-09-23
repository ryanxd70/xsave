
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { FacebookIcon } from './icons/FacebookIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { PinterestIcon } from './icons/PinterestIcon';
import { XIcon } from './icons/XIcon';
import { TelegramIcon } from './icons/TelegramIcon';
import { RedditIcon } from './icons/RedditIcon';
import { XSaveLogoIcon } from './icons/XSaveLogoIcon';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-md" aria-label="Go to homepage">
                <XSaveLogoIcon className="h-9 w-auto text-white" />
            </Link>
            <p className="mt-4 text-sm">
              {t('footer_site_description')}
            </p>
            <div className="mt-6 flex justify-center md:justify-start space-x-4">
                <a href="#" aria-label="Facebook" className="text-[#1877F2] hover:opacity-80 transition-opacity"><FacebookIcon className="h-6 w-6" /></a>
                <a href="#" aria-label="YouTube" className="text-[#FF0000] hover:opacity-80 transition-opacity"><YoutubeIcon className="h-6 w-6" /></a>
                <a href="#" aria-label="Pinterest" className="text-[#E60023] hover:opacity-80 transition-opacity"><PinterestIcon className="h-6 w-6" /></a>
                <a href="#" aria-label="X" className="text-gray-400 hover:text-white transition-colors"><XIcon className="h-6 w-6" /></a>
                <a href="#" aria-label="Telegram" className="text-[#24A1DE] hover:opacity-80 transition-opacity"><TelegramIcon className="h-6 w-6" /></a>
                <a href="#" aria-label="Reddit" className="text-[#FF4500] hover:opacity-80 transition-opacity"><RedditIcon className="h-6 w-6" /></a>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-white transition-colors text-sm">XSave</Link></li>
              <li><Link href="/#how-to" scroll={true} className="hover:text-white transition-colors text-sm">{t('how_to_use_nav')}</Link></li>
              <li><Link href="/#home" scroll={true} className="hover:text-white transition-colors text-sm">{t('download')}</Link></li>
              <li><Link href="/#faq" scroll={true} className="hover:text-white transition-colors text-sm">{t('faq')}</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">{t('footer_nav_company')}</h4>
            <ul className="space-y-3 text-center md:text-left">
              <li><Link href="/about" className="hover:text-white transition-colors text-sm">{t('about')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors text-sm">{t('contact_us')}</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors text-sm">{t('privacy_policy')}</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors text-sm">{t('disclaimer_page_title')}</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} xsave.app. {t('all_rights_reserved')}</p>
          <p className="mt-2 text-xs">{t('footer_disclaimer_short')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;