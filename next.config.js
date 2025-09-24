/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: [
      'en','id','vi','ms','jv','cs','es','fr','de','el',
      'hu','it','nl','pl','pt','ro','th','tr','uk','ru',
      'hi','ko','zh-CN','zh-TW','ja'
    ],
    defaultLocale: 'en',
    localeDetection: false,
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap.xml",
      },
    ];
  },
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      poll: 1000,
      ignored: [
        '**/.git/**',
        '**/node_modules/**',
        '**/.next/**',
        '**/hiberfil.sys',
        '**/pagefile.sys',
        '**/swapfile.sys',
        '**/DumpStack.log.tmp',
      ],
    };
    return config;
  },
};

module.exports = nextConfig;
