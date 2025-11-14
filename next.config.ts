import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // 如果部署在 'https://username.github.io/xiaodu-blog'，取消下面两行注释
  // basePath: '/xiaodu-blog',
  // assetPrefix: '/xiaodu-blog/',
};

export default nextConfig;
