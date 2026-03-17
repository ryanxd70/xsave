
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../hooks/useTheme';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { MenuIcon } from './icons/MenuIcon';
import { CloseIcon } from './icons/CloseIcon';
import LanguageSelector from './LanguageSelector';
import MoreDropdown from './MoreDropdown';
import { useLanguage } from '../contexts/LanguageContext';
import { XSaveLogoIcon } from './icons/XSaveLogoIcon';

const Header: React.FC = () => {
    const [theme, toggleTheme] = useTheme();
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const navLinks = [
        { href: '/', label: t('home'), scroll: false },
        { href: '/#how-to', label: t('how_to_use_nav'), scroll: true },
        { href: '/#faq', label: t('faq'), scroll: true },
        { href: '/about', label: t('about'), scroll: false },
        { href: '/contact', label: t('contact_us'), scroll: false },
        { href: '/privacy', label: t('privacy_policy'), scroll: false },
        { href: '/blog', label: t('blog'), scroll: false },
        { href: '/disclaimer', label: t('disclaimer_page_title'), scroll: false },
    ];

    return (
        <>
            <header className="w-full bg-gray-900 dark:bg-gray-950 border-b border-white/10 dark:border-gray-800 transition-colors duration-300">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link
                       href="/"
                       onClick={() => setIsMenuOpen(false)} 
                       className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-transform hover:scale-105" 
                       aria-label="Go to homepage"
                    >
                        <XSaveLogoIcon className="h-10 w-auto text-white" />
                    </Link>
                    <nav className="flex items-center gap-2 md:gap-4">
                        <div className="hidden md:flex items-center gap-8 mr-4">
                            <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm font-semibold tracking-wide uppercase">{t('home')}</Link>
                            <Link href="/#how-to" scroll={true} className="text-gray-300 hover:text-white transition-colors text-sm font-semibold tracking-wide uppercase">{t('how_to_use_nav')}</Link>
                            <Link href="/#faq" scroll={true} className="text-gray-300 hover:text-white transition-colors text-sm font-semibold tracking-wide uppercase">{t('faq')}</Link>
                            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm font-semibold tracking-wide uppercase">{t('blog')}</Link>
                        </div>
                        <div className="hidden md:block">
                            <MoreDropdown />
                        </div>
                        <LanguageSelector />
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                            aria-label="Toggle dark mode"
                        >
                            {mounted && (theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />)}
                        </button>
                         {/* Hamburger Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                                aria-label="Open menu"
                            >
                                <MenuIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden={!isMenuOpen}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
                
                {/* Menu Panel */}
                <div
                    className={`relative h-full w-4/5 max-w-xs bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
                        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="mobile-menu-title"
                >
                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                         <span id="mobile-menu-title" className="font-bold text-lg text-white">Menu</span>
                         <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-full text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                            aria-label="Close menu"
                         >
                            <CloseIcon className="h-6 w-6" />
                         </button>
                    </div>
                    <nav className="flex flex-col p-4 space-y-2">
                         {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                scroll={link.scroll}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-300 hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-base font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
                         ))}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Header;