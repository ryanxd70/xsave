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
    // By ignoring these specific files, we prevent the errors and improve
    // the stability of the development environment.
    const ignored = [
      ...(Array.isArray(config.watchOptions.ignored) ? config.watchOptions.ignored : []),
      /hiberfil\.sys/,
      /pagefile\.sys/,
      /swapfile\.sys/,
      /DumpStack\.log\.tmp/,
    ];
    config.watchOptions.ignored = ignored;
    return config;
  },
};

module.exports = nextConfig;