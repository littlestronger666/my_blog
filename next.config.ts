import type { NextConfig } from "next";
import createMDX from '@next/mdx';

// 🔧 配置说明：
// 1. 如果部署在 https://username.github.io/仓库名，设置 REPO_NAME
// 2. 如果使用自定义域名或 username.github.io，保持 REPO_NAME 为空字符串

const REPO_NAME = ''; // 👈 在这里填写你的仓库名，例如：'xiaodu-blog'

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // 生产环境且有仓库名时才添加 basePath
  basePath: isProd && REPO_NAME ? `/${REPO_NAME}` : '',
  assetPrefix: isProd && REPO_NAME ? `/${REPO_NAME}/` : '',
  // 配置页面扩展名，支持 .mdx
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  // 可以在这里添加 remark 和 rehype 插件
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
