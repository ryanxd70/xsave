'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'motion/react';

const TopProgressBar: React.FC = () => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsNavigating(true);
    const handleComplete = () => setIsNavigating(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ width: '0%', opacity: 1 }}
          animate={{ 
            width: '90%',
            transition: { duration: 2, ease: "easeOut" }
          }}
          exit={{ 
            width: '100%', 
            opacity: 0,
            transition: { duration: 0.3 }
          }}
          className="fixed top-0 left-0 h-[3px] bg-blue-600 z-[9999] shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        />
      )}
    </AnimatePresence>
  );
};

export default TopProgressBar;
