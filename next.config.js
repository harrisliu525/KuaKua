/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // 禁用字体优化以避免构建时网络问题
  optimizeFonts: false,
};

module.exports = nextConfig;