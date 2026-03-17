
export interface Post {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://public-api.wordpress.com/wp/v2/sites/xsavescom.wordpress.com';

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts?_embed`);
  if (!res.ok) return [];
  return res.json();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`);
  if (!res.ok) return null;
  const posts = await res.json();
  return posts.length > 0 ? posts[0] : null;
}
