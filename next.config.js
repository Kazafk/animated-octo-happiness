// Générer l'index de recherche au build
const { generateSearchIndex } = require('./lib/generateIndex.js');
generateSearchIndex();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',
  // basePath for GitHub Pages project hosting (subdirectory)
  basePath: '/site-vitrine',
  assetPrefix: '/site-vitrine/',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
