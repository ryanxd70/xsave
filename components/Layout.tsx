
import React from 'react';
import Header from './Header';
import Footer from './Footer';
// Fix: Removed Page type import as it's no longer used.

// Fix: Removed setCurrentPage from LayoutProps to align with Next.js routing.
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Fix: Removed setCurrentPage prop from Header and Footer components. */}
      <Header />
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
