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
  // basePath for GitHub Pages: https://Kazafk.github.io/animated-octo-happiness/
  // Include full path from domain root
  basePath: '/animated-octo-happiness',
  assetPrefix: '/animated-octo-happiness/',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
