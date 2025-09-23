import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const DisclaimerPageContent: React.FC = () => {
  const { t } = useLanguage();

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );

  return (
    <section id="disclaimer-page" className="text-left max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
        {t('disclaimer_page_title')}
      </h1>
      <div className="content-links space-y-8 text-gray-900 dark:text-gray-300 text-base">
        <p>{t('disclaimer_intro')}</p>

        <Section title={t('disclaimer_accuracy_title')}>
          <p>{t('disclaimer_accuracy_p1')}</p>
        </Section>
        
        <Section title={t('disclaimer_external_links_title')}>
          <p>{t('disclaimer_external_links_p1')}</p>
        </Section>
        
        <Section title={t('disclaimer_personal_responsibility_title')}>
          <p>{t('disclaimer_personal_responsibility_p1')}</p>
        </Section>

        <Section title={t('disclaimer_no_affiliation_title')}>
          <p>{t('disclaimer_no_affiliation_p1')}</p>
        </Section>

        <p dangerouslySetInnerHTML={{ __html: t('contact_prompt') }} />
      </div>
    </section>
  );
};

export default DisclaimerPageContent;