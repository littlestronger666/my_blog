---
title: '使用 Next.js 构建静态博客'
date: '2024-01-20'
category: '技术'
excerpt: '介绍如何使用 Next.js 和 Markdown 构建一个现代化的静态博客网站。'
---

# 使用 Next.js 构建静态博客

Next.js 是一个强大的 React 框架，非常适合构建静态博客网站。

## 为什么选择 Next.js？

1. **静态站点生成（SSG）**：在构建时生成 HTML，性能优异
2. **文件系统路由**：基于文件结构自动生成路由
3. **优秀的开发体验**：热重载、TypeScript 支持等
4. **SEO 友好**：服务端渲染和静态生成都对 SEO 有利

## 技术栈

- Next.js - React 框架
- Tailwind CSS - 样式框架
- Markdown - 内容格式
- GitHub Pages - 部署平台

```typescript
// 获取所有文章
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
```

这是一个简单而强大的解决方案！
