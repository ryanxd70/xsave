/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: [
      'en', 'id', 'vi', 'ms', 'jv', 'cs', 'es', 'fr', 'de', 'el',
      'hu', 'it', 'nl', 'pl', 'pt', 'ro', 'th', 'tr', 'uk', 'ru',
      'hi', 'ko', 'zh-CN', 'zh-TW', 'ja'
    ],
    defaultLocale: 'en',
    localeDetection: false,
  },
  webpack: (config) => {
    // This addresses a known issue on Windows where the development server's
    // file watcher (watchpack) tries to access system files, causing errors.
    // By replacing the default ignored configuration with an array of glob
    // patterns, we ensure schema compliance and prevent crashes.
    config.watchOptions = {
      ...config.watchOptions,
      poll: 1000, // Use polling for better compatibility in some environments.
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
