export type Page = 'home' | 'about' | 'privacy' | 'disclaimer' | 'contact';

export interface Variant {
  quality: string;
  size: string;
  url: string;
}

export interface VideoData {
  title: string;
  thumbnail: string;
  variants: Variant[];
}
