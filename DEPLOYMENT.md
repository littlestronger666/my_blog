# 部署指南

## 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

1. 在 GitHub 上创建一个新仓库（例如：`my-blog`）
2. 不要初始化 README、.gitignore 或 license

### 2. 推送代码到 GitHub

在项目目录下执行：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

### 3. 配置 GitHub Pages

1. 进入仓库的 Settings
2. 在左侧菜单找到 "Pages"
3. 在 "Build and deployment" 部分：
   - Source: 选择 "GitHub Actions"
4. 保存设置

### 4. 等待部署完成

- 推送代码后，GitHub Actions 会自动开始构建
- 在仓库的 "Actions" 标签页可以查看构建进度
- 构建成功后，网站会自动部署
- 访问地址：`https://你的用户名.github.io/你的仓库名/`

### 5. 配置自定义域名（可选）

如果你有自己的域名：

1. 在域名提供商处添加 CNAME 记录，指向 `你的用户名.github.io`
2. 在 GitHub Pages 设置中，在 "Custom domain" 输入你的域名
3. 等待 DNS 生效（可能需要几分钟到几小时）

### 6. 配置子目录部署（如果需要）

如果你的网站部署在子目录（如 `https://username.github.io/blog`），需要修改 `next.config.ts`：

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/blog',  // 取消注释并修改为你的仓库名
  assetPrefix: '/blog/',  // 取消注释并修改为你的仓库名
};
```

## 本地预览构建结果

```bash
# 构建
npm run build

# 预览（需要安装 serve）
npx serve out
```

## 更新网站内容

1. 在 `_posts` 目录添加或修改 Markdown 文件
2. 提交并推送到 GitHub：
   ```bash
   git add .
   git commit -m "Add new post"
   git push
   ```
3. GitHub Actions 会自动重新构建和部署

## 配置 Giscus 评论系统

1. 访问 https://giscus.app/zh-CN
2. 输入你的仓库信息
3. 选择 Discussion 分类
4. 获取配置代码
5. 在 `app/posts/[id]/page.tsx` 中添加 Giscus 组件

示例：

```tsx
import Giscus from '@giscus/react';

// 在文章详情页的评论区域添加：
<Giscus
  repo="你的用户名/你的仓库名"
  repoId="你的仓库ID"
  category="Announcements"
  categoryId="你的分类ID"
  mapping="pathname"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="top"
  theme="light"
  lang="zh-CN"
/>
```

## 故障排查

### 构建失败

- 检查 GitHub Actions 日志
- 确保所有 Markdown 文件的 frontmatter 格式正确
- 确保 `_posts` 和 `_pages` 目录存在

### 页面显示 404

- 检查 `basePath` 和 `assetPrefix` 配置是否正确
- 确保 GitHub Pages 设置为从 GitHub Actions 部署

### 样式丢失

- 检查 `next.config.ts` 中的 `assetPrefix` 配置
- 确保 `images.unoptimized` 设置为 `true`
