import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const PrivacyPolicyPageContent: React.FC = () => {
  const { t } = useLanguage();

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );

  return (
    <section id="privacy-policy" className="text-left max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
        {t('privacy_heading')}
      </h1>
      <div className="content-links space-y-8 text-gray-900 dark:text-gray-300 text-base">
        <p>{t('privacy_intro')}</p>

        <Section title={t('privacy_info_we_collect_title')}>
          <p>{t('privacy_info_we_collect_p1')}</p>
        </Section>

        <Section title={t('privacy_log_files_title')}>
          <p>{t('privacy_log_files_p1')}</p>
        </Section>
        
        <Section title={t('privacy_cookies_title')}>
          <p>{t('privacy_cookies_p1')}</p>
        </Section>
        
        <Section title={t('privacy_third_party_title')}>
          <p>{t('privacy_third_party_p1')}</p>
        </Section>
        
        <Section title={t('privacy_your_rights_title')}>
          <p>{t('privacy_your_rights_p1')}</p>
        </Section>
        
        <Section title={t('privacy_consent_title')}>
          <p>{t('privacy_consent_p1')}</p>
        </Section>

        <p dangerouslySetInnerHTML={{ __html: t('contact_prompt') }} />
      </div>
    </section>
  );
};

export default PrivacyPolicyPageContent;