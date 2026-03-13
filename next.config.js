/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  async redirects() {
    return [{ source: '/empresas', destination: '/', permanent: false }];
  },
};

module.exports = nextConfig;
