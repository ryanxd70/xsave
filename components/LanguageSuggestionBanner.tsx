
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, LanguageCode } from '../i18n-config';
import { CloseIcon } from './icons/CloseIcon';

const LanguageSuggestionBanner: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [suggestedLang, setSuggestedLang] = useState<{ code: LanguageCode; name: string } | null>(null);

    useEffect(() => {
        const dismissed = localStorage.getItem('language_suggestion_dismissed');
        if (dismissed) {
            return;
        }

        const browserLang = navigator.language.slice(0, 2) as LanguageCode; // e.g., 'en-US' -> 'en'
        const browserLangLong = navigator.language as LanguageCode; // e.g., 'zh-TW'

        // Don't show if current language already matches browser language
        if (language === browserLang || language === browserLangLong) {
            return;
        }

        let matchedLangCode: LanguageCode | undefined;
        let matchedLangName: string | undefined;

        if (languages[browserLangLong]) {
            matchedLangCode = browserLangLong;
            matchedLangName = languages[browserLangLong].name;
        } else if (languages[browserLang]) {
            matchedLangCode = browserLang;
            matchedLangName = languages[browserLang].name;
        }

        if (matchedLangCode && matchedLangName) {
            setSuggestedLang({ code: matchedLangCode, name: matchedLangName });
            setIsVisible(true);
        }

    }, [language]);

    const handleAccept = () => {
        if (suggestedLang) {
            setLanguage(suggestedLang.code);
        }
        handleDismiss();
    };

    const handleDismiss = () => {
        localStorage.setItem('language_suggestion_dismissed', 'true');
        setIsVisible(false);
    };

    if (!isVisible || !suggestedLang) {
        return null;
    }

    return (
        <div 
          className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 text-white shadow-lg animate-fade-in"
          role="alert"
          aria-live="polite"
        >
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
                <p className="text-sm">
                    View this page in <span className="font-bold">{suggestedLang.name}</span>?
                </p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleAccept}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                        Switch
                    </button>
                    <button
                        onClick={handleDismiss}
                        className="p-2 rounded-full hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        aria-label="Dismiss language suggestion"
                    >
                        <CloseIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LanguageSuggestionBanner;
