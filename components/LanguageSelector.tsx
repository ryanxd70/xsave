import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, LanguageCode } from '../i18n-config';
import { GlobeIcon } from './icons/GlobeIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LanguageSelector: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Change language"
      >
        <GlobeIcon className="h-5 w-5 text-white" />
        <span className="text-sm font-medium uppercase text-white">{language}</span>
        <ChevronDownIcon className={`w-4 h-4 text-white transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-[-80px] sm:right-0 mt-2 w-64 sm:w-72 max-h-96 overflow-y-auto origin-top-right bg-gray-900 border border-white/10 rounded-xl shadow-2xl focus:outline-none z-50 scrollbar-thin scrollbar-thumb-white/20"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
            <div className="p-2 grid grid-cols-2 gap-1">
                {(Object.keys(languages) as LanguageCode[]).map((langCode) => (
                    <Link
                        key={langCode}
                        href={router.asPath}
                        locale={langCode}
                        prefetch={false}
                        onClick={() => setIsOpen(false)}
                        className={`block w-full text-left px-4 py-3 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                        language === langCode
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                        role="menuitem"
                    >
                        {languages[langCode].name}
                    </Link>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;