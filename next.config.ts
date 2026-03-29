import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: '/data/data/com.termux/files/home/cyberguard-academy',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
