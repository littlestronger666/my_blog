# 小强大的普通日子

一个基于 Next.js 的极简主义静态博客网站。

## 技术栈

- **Next.js** - React 框架，使用静态站点生成（SSG）
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Markdown** - 内容格式
- **GitHub Pages** - 部署平台

## 功能特性

- ✅ Markdown 文章管理
- ✅ 分类系统
- ✅ 亮/暗模式切换
- ✅ 响应式设计
- ✅ 独立页面（关于、联系）
- ✅ RSS 订阅（待实现）
- ✅ 站内搜索（待实现）
- ✅ 评论系统（Giscus，待配置）

## 本地开发

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 访问 http://localhost:3000

## 构建和部署

1. 构建静态文件：
```bash
npm run build
```

2. 部署到 GitHub Pages：
   - 推送代码到 GitHub 仓库的 main 分支
   - GitHub Actions 会自动构建和部署
   - 在仓库设置中启用 GitHub Pages（Source: GitHub Actions）

## 内容管理

### 添加文章

在 `_posts` 目录下创建 `.md` 文件：

```markdown
---
title: '文章标题'
date: '2024-01-15'
category: '分类名称'
excerpt: '文章摘要'
---

文章内容...
```

### 添加独立页面

在 `_pages` 目录下创建 `.md` 文件：

```markdown
---
title: '页面标题'
---

页面内容...
```

## 配置 Giscus 评论

1. 访问 https://giscus.app/zh-CN
2. 按照指引配置你的 GitHub 仓库
3. 获取配置信息后，在 `app/posts/[id]/page.tsx` 中添加 Giscus 组件

## 自定义配置

### 修改网站标题和描述

编辑 `app/layout.tsx` 中的 metadata。

### 修改部署路径

如果部署在子目录（如 `https://username.github.io/blog`），需要在 `next.config.ts` 中取消注释并设置 `basePath` 和 `assetPrefix`。

## License

MIT
