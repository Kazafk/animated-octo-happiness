/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',
  basePath: '/site-vitrine',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
