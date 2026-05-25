// Générer l'index de recherche au build
try {
  const { generateSearchIndex } = require('./lib/generateIndex.js');
  generateSearchIndex();
} catch (err) {
  console.warn('⚠️  Could not generate search index at config time:', err.message);
  // Continue building - index generation can fail gracefully
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',
  // basePath for GitHub Pages project hosting (subdirectory)
  // GitHub Pages serves at: https://username.github.io/repo-name/site-vitrine/
  basePath: '/animated-octo-happiness/site-vitrine',
  assetPrefix: '/animated-octo-happiness/site-vitrine/',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
