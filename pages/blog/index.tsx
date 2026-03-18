
import React from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLanguage } from '../../contexts/LanguageContext';
import { getPosts, Post } from '../../lib/wordpress';
import { getStaticProps as getTranslations } from '../../lib/translations';
import { languages } from '../../i18n-config';

interface BlogIndexProps {
  posts: Post[];
}

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
  const { t } = useLanguage();
  const { locale } = useRouter();
  const siteUrl = 'https://xsave.app';
  const pagePath = '/blog';
  const canonicalUrl = `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${pagePath}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <NextSeo
        title={`${t('blog')} - XSave`}
        description="Read the latest updates and guides about downloading Twitter/X videos."
        canonical={canonicalUrl}
        languageAlternates={Object.keys(languages).map(lang => ({
            hrefLang: lang,
            href: `${siteUrl}${lang === 'en' ? '' : `/${lang}`}${pagePath}`,
        }))}
      />
      
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center font-display">
        {t('blog')}
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">{t('no_posts_found')}</p>
      ) : (
        <div className="grid gap-12">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="space-y-4">
                  <h2 
                    className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {t('published_on')} {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div 
                    className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <span className="inline-block text-blue-600 font-semibold hover:underline">
                    {t('read_more')} →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export const getStaticProps = async (context: any) => {
  const translationProps = await getTranslations(context);
  const posts = await getPosts();

  if (!('props' in translationProps)) {
    return translationProps;
  }

  return {
    ...translationProps,
    props: {
      ...translationProps.props,
      posts,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default BlogIndex;
