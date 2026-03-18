
import React from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLanguage } from '../../contexts/LanguageContext';
import { getPostBySlug, getPosts, Post } from '../../lib/wordpress';
import { getStaticProps as getTranslations } from '../../lib/translations';
import { languages } from '../../i18n-config';

interface BlogPostProps {
  post: Post | null;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const { t } = useLanguage();
  const { locale } = useRouter();
  const siteUrl = 'https://xsave.app';
  
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">{t('not_found_title')}</h1>
        <Link href="/blog" className="text-blue-600 hover:underline">{t('back_to_blog')}</Link>
      </div>
    );
  }

  const pagePath = `/blog/${post.slug}`;
  const canonicalUrl = `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${pagePath}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <NextSeo
        title={`${post.title.rendered} - XSave Blog`}
        description={post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 160)}
        canonical={canonicalUrl}
        languageAlternates={Object.keys(languages).map(lang => ({
            hrefLang: lang,
            href: `${siteUrl}${lang === 'en' ? '' : `/${lang}`}${pagePath}`,
        }))}
      />

      <Link href="/blog" className="inline-block mb-8 text-blue-600 hover:underline">
        ← {t('back_to_blog')}
      </Link>

      <article>
        <header className="mb-12">
          <h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight font-display"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div className="text-gray-500 dark:text-gray-400">
            {t('published_on')} {new Date(post.date).toLocaleDateString()}
          </div>
        </header>

        <div 
          className="blog-content max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </div>
  );
};

export const getStaticPaths = async () => {
  const posts = await getPosts();
  const paths = posts.flatMap((post) => 
    Object.keys(languages).map((locale) => ({
      params: { slug: post.slug },
      locale,
    }))
  );

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: any) => {
  const { slug } = context.params;
  const translationProps = await getTranslations(context);
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  if (!('props' in translationProps)) {
    return translationProps;
  }

  return {
    ...translationProps,
    props: {
      ...translationProps.props,
      post,
    },
    revalidate: 3600,
  };
};

export default BlogPost;
