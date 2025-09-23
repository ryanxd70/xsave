import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LanguageSuggestionBanner from './LanguageSuggestionBanner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Header />
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {children}
      </main>
      <Footer />
      <LanguageSuggestionBanner />
    </div>
  );
};

export default Layout;
