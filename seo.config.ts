import { DefaultSeoProps } from 'next-seo';

const title = 'X Save: Twitter Video Downloader HD | X to MP4 Converter';
const description = 'Download any Twitter/X video in HD with XSave. Fast, safe, and free X to MP4 converter — works on all devices.';
const url = 'https://xsave.app';
const imageUrl = 'https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

const seoConfig: DefaultSeoProps = {
  titleTemplate: '%s - XSave',
  defaultTitle: title,
  description,
  canonical: url,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url,
    site_name: 'XSave',
    title,
    description,
    images: [
      {
        url: imageUrl,
        width: 1260,
        height: 750,
        alt: 'A bird flying over a mountain, representing freedom and ease of downloading.',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    handle: '@xsaveapp', // Replace with your actual Twitter handle
    site: '@xsaveapp',    // Replace with your actual Twitter handle
    cardType: 'summary_large_image',
  },
};

export default seoConfig;