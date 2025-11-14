# 快速开始指南

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

### 3. 添加文章

在 `_posts` 目录下创建新的 `.md` 文件：

```markdown
---
title: '我的第一篇文章'
date: '2024-01-15'
category: '技术'
excerpt: '这是文章摘要'
---

# 文章标题

文章内容...

## 二级标题

更多内容...

```javascript
// 代码示例
console.log('Hello, World!');
```
```

### 4. 添加独立页面

在 `_pages` 目录下创建新的 `.md` 文件：

```markdown
---
title: '页面标题'
---

# 页面内容

这是一个独立页面。
```

### 5. 构建和预览

```bash
# 构建静态文件
npm run build

# 预览构建结果
npx serve out
```

## 自定义配置

### 修改网站标题和描述

编辑 `app/layout.tsx`：

```typescript
export const metadata: Metadata = {
  title: "你的网站标题",
  description: "你的网站描述",
};
```

### 修改个人信息

编辑 `components/Sidebar.tsx` 中的个人简介部分。

### 修改主题颜色

编辑 `tailwind.config.ts` 来自定义颜色方案。

### 添加 Google Analytics（可选）

在 `app/layout.tsx` 中添加 Google Analytics 脚本。

## 文件结构

```
xiaodu-blog/
├── _posts/              # 博客文章（Markdown）
├── _pages/              # 独立页面（Markdown）
├── app/                 # Next.js 应用目录
│   ├── layout.tsx       # 根布局
│   ├── page.tsx         # 首页
│   ├── about/           # 关于页面
│   ├── contact/         # 联系页面
│   ├── posts/[id]/      # 文章详情页
│   └── categories/[category]/  # 分类页面
├── components/          # React 组件
│   ├── Header.tsx       # 页头
│   ├── Footer.tsx       # 页脚
│   ├── Sidebar.tsx      # 侧边栏
│   └── ThemeSwitcher.tsx  # 主题切换器
├── lib/                 # 工具函数
│   └── posts.ts         # 文章处理逻辑
├── public/              # 静态资源
├── .github/workflows/   # GitHub Actions 配置
└── next.config.ts       # Next.js 配置
```

## 常用命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 类型检查
npm run type-check

# 代码检查
npm run lint
```

## 下一步

1. 阅读 [DEPLOYMENT.md](./DEPLOYMENT.md) 了解如何部署到 GitHub Pages
2. 阅读 [README.md](./README.md) 了解更多功能特性
3. 开始写作你的第一篇文章！

## 需要帮助？

- 查看 [Next.js 文档](https://nextjs.org/docs)
- 查看 [Tailwind CSS 文档](https://tailwindcss.com/docs)
- 提交 Issue 到 GitHub 仓库
