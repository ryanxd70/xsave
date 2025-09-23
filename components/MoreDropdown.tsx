
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import type { Page } from '../types';

const MoreDropdown: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
  
  const menuItems: { label: string; page: Page; icon?: React.ReactNode }[] = [
    { label: t('about'), page: 'about' },
    { label: t('privacy_policy'), page: 'privacy' },
    { label: t('disclaimer_page_title'), page: 'disclaimer' },
    { label: t('contact_us'), page: 'contact' },
  ];

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-md p-1"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{t('more')}</span>
        <ChevronDownIcon className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            {menuItems.map(item => (
                <Link
                  key={item.page}
                  href={`/${item.page}`}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.icon}
                  </span>
                </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreDropdown;