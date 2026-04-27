
import type { Page } from './types';

type TFunction = (key: string) => string;

export const getFaqData = (t: TFunction) => [
  {
    question: t('faq_q1'),
    answer: t('faq_a1')
  },
  {
    question: t('faq_q2'),
    answer: t('faq_a2')
  },
  {
    question: t('faq_q3'),
    answer: t('faq_a3')
  },
  {
    question: t('faq_q4'),
    answer: t('faq_a4')
  },
  {
    question: t('faq_q5'),
    answer: t('faq_a5')
  },
  {
    question: t('faq_q6'),
    answer: t('faq_a6')
  },
];

export const getFaqSchema = (t: TFunction) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": getFaqData(t).map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
});

export const getPageMetadata = (t: TFunction): Record<Page, { title: string; description: string }> => ({
  home: {
    title: t('page_title'),
    description: t('paste_url_prompt'),
  },
  about: {
    title: t('about'),
    description: t('about_p1'),
  },
  privacy: {
    title: t('privacy_policy'),
    description: t('privacy_intro'),
  },
  disclaimer: {
    title: t('disclaimer_page_title'),
    description: t('disclaimer_intro'),
  },
  contact: {
    title: t('contact_us'),
    description: t('contact_intro'),
  },
  'twitter-to-mp3': {
    title: t('mp3_seo_title'),
    description: t('mp3_seo_description'),
  },
});

export const getBreadcrumbSchema = (page: Page, t: TFunction, siteUrl: string, locale?: string) => {
    if (page === 'home') return null;

    const currentLocale = locale || 'en';
    const localePrefix = currentLocale === 'en' ? '' : `/${currentLocale}`;

    const pageTitleMap: { [key in Exclude<Page, 'home'>]: string } = {
        about: t('about'),
        privacy: t('privacy_policy'),
        disclaimer: t('disclaimer_page_title'),
        contact: t('contact_us'),
        'twitter-to-mp3': t('mp3_title'),
    };

    const pathMap: { [key in Exclude<Page, 'home'>]: string } = {
        about: '/about',
        privacy: '/privacy',
        disclaimer: '/disclaimer',
        contact: '/contact',
        'twitter-to-mp3': '/download-twitter-mp3',
    };

    if (!(page in pageTitleMap)) return null;

    const pageKey = page as Exclude<Page, 'home'>;

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": t('home'),
                "item": `${siteUrl}${localePrefix}` || siteUrl,
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": pageTitleMap[pageKey],
                "item": `${siteUrl}${localePrefix}${pathMap[pageKey]}`
            }
        ]
    };
};

export const getAboutPageSchema = (t: TFunction, url: string) => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": t('about'),
  "description": t('about_p1'),
  "url": url,
  "mainEntity": {
    "@type": "Organization",
    "name": "XSave",
    "url": "https://xsave.app",
    "logo": "https://xsave.app/favicon.svg"
  }
});

export const getContactPageSchema = (t: TFunction, url: string) => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": t('contact_us'),
  "description": t('contact_intro'),
  "url": url,
  "mainEntity": {
    "@type": "Organization",
    "name": "XSave",
    "url": "https://xsave.app",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@xsave.app",
      "url": "https://xsave.app/contact"
    }
  }
});

export const getPrivacyPageSchema = (t: TFunction, url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": t('privacy_policy'),
  "description": t('privacy_intro'),
  "url": url,
  "about": {
    "@type": "Thing",
    "name": "Privacy Policy"
  }
});
