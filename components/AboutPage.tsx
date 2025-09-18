import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPageContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="text-left max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
        {t('about_title')}
      </h1>
      <div className="space-y-8 text-gray-900 dark:text-gray-300 text-base">
        <div className="space-y-4">
            <p>{t('about_p1')}</p>
            <p>{t('about_p2')}</p>
            <p>{t('about_p3')}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">{t('about_why_title')}</h2>
          <ul className="list-disc list-inside space-y-2">
            <li dangerouslySetInnerHTML={{ __html: t('about_why_feature_1') }} />
            <li dangerouslySetInnerHTML={{ __html: t('about_why_feature_2') }} />
            <li dangerouslySetInnerHTML={{ __html: t('about_why_feature_3') }} />
          </ul>
        </div>
        
        <div>
           <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">{t('about_note_title')}</h2>
           <p>{t('about_note_p1')}</p>
        </div>

      </div>
    </section>
  );
};

export default AboutPageContent;