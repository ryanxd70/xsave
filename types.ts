
export type Page = 'home' | 'about' | 'privacy' | 'disclaimer' | 'contact' | 'twitter-to-mp3';

export interface Variant {
  quality: string;
  url: string;
  ext?: string;
}

export interface VideoData {
  title: string;
  thumbnail: string;
  variants: Variant[];
  tweetUrl?: string;
}