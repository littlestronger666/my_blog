# 修复 GitHub Pages 部署问题

## 问题诊断

从截图看，GitHub Pages 部署后样式丢失，这是因为静态资源路径不正确。

## 🔍 确认你的部署 URL

### 情况 1: 自定义域名
如果你的网站 URL 是：
- `https://yourdomain.com`
- `https://blog.yourdomain.com`

**不需要修改配置**，当前配置已经正确。

### 情况 2: GitHub Pages 默认域名（用户/组织页面）
如果你的网站 URL 是：
- `https://username.github.io`

**不需要修改配置**，当前配置已经正确。

### 情况 3: GitHub Pages 项目页面（最常见）⚠️
如果你的网站 URL 是：
- `https://username.github.io/xiaodu-blog`
- `https://username.github.io/my-blog`
- `https://username.github.io/任何仓库名`

**需要修改配置** ← 这很可能是你的情况！

## 🔧 修复方法

### 步骤 1: 确认你的仓库名

1. 打开你的 GitHub 仓库
2. 查看仓库名称（在页面顶部）
3. 记下仓库名，例如：`xiaodu-blog`

### 步骤 2: 修改 next.config.ts

打开 `next.config.ts` 文件，找到这两行：

```typescript
// basePath: '/xiaodu-blog',
// assetPrefix: '/xiaodu-blog/',
```

**取消注释并修改为你的仓库名：**

```typescript
basePath: '/你的仓库名',
assetPrefix: '/你的仓库名/',
```

**示例：**

如果你的仓库名是 `my-blog`：
```typescript
basePath: '/my-blog',
assetPrefix: '/my-blog/',
```

如果你的仓库名是 `xiaodu-blog`：
```typescript
basePath: '/xiaodu-blog',
assetPrefix: '/xiaodu-blog/',
```

### 步骤 3: 完整的配置示例

修改后的 `next.config.ts` 应该是这样：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/你的仓库名',        // 👈 取消注释并修改
  assetPrefix: '/你的仓库名/',    // 👈 取消注释并修改
};

export default nextConfig;
```

### 步骤 4: 重新构建和部署

```bash
# 1. 重新构建
npm run build

# 2. 提交更改
git add .
git commit -m "Fix GitHub Pages deployment path"
git push

# 3. 等待 GitHub Actions 自动部署（约 2-3 分钟）
```

### 步骤 5: 验证

1. 等待 GitHub Actions 完成
2. 访问你的网站
3. 检查样式是否正常显示

## 🎯 快速修复（复制粘贴）

### 如果你的仓库名是 `xiaodu-blog`：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/xiaodu-blog',
  assetPrefix: '/xiaodu-blog/',
};

export default nextConfig;
```

### 如果你的仓库名是其他名称：

将上面的 `xiaodu-blog` 替换成你的实际仓库名。

## ⚠️ 重要提示

### 本地开发
修改配置后，本地开发时需要访问：
- `http://localhost:3000/你的仓库名`

而不是：
- `http://localhost:3000`

### 如果觉得不方便
可以使用环境变量来区分开发和生产环境：

```typescript
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'xiaodu-blog'; // 你的仓库名

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
};
```

这样：
- 开发时：`http://localhost:3000`
- 生产时：`https://username.github.io/xiaodu-blog`

## 🔍 检查部署状态

### 1. 查看 GitHub Actions
1. 进入你的 GitHub 仓库
2. 点击 **Actions** 标签
3. 查看最新的 workflow 运行状态
4. 确认是否成功完成

### 2. 查看 GitHub Pages 设置
1. 进入仓库 **Settings**
2. 点击左侧 **Pages**
3. 确认显示：
   - ✅ Your site is live at https://username.github.io/仓库名

### 3. 检查浏览器控制台
1. 访问你的网站
2. 按 F12 打开开发者工具
3. 查看 Console 和 Network 标签
4. 检查是否有 404 错误

## 📋 常见错误

### 错误 1: CSS 文件 404
**原因：** basePath 配置不正确
**解决：** 确认 basePath 与仓库名完全一致

### 错误 2: 页面空白
**原因：** JavaScript 文件路径错误
**解决：** 确认 assetPrefix 配置正确

### 错误 3: 图片不显示
**原因：** 图片路径不正确
**解决：** 确认 `images.unoptimized: true` 已设置

## ✅ 验证清单

修复后，检查以下项目：

- [ ] 页面样式正常显示
- [ ] 导航链接可以点击
- [ ] 文章列表正常显示
- [ ] 文章详情页正常显示
- [ ] 亮/暗模式切换正常
- [ ] 侧边栏正常显示
- [ ] 所有链接都能正常工作

## 🆘 如果还是不行

### 方案 A: 使用自定义域名
1. 购买域名
2. 在 GitHub Pages 设置中添加自定义域名
3. 移除 basePath 和assetPrefix 配置

### 方案 B: 使用用户页面
1. 将仓库重命名为 `username.github.io`
2. 移除 basePath 和 assetPrefix 配置
3. 网站将部署在 `https://username.github.io`

### 方案 C: 检查 .nojekyll 文件
确认项目根目录有 `.nojekyll` 文件（应该已经有了）

## 📚 相关文档

- [Next.js 静态导出文档](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Next.js basePath 配置](https://nextjs.org/docs/app/api-reference/next-config-js/basePath)

## 💡 提示

修改配置后记得：
1. 重新构建（`npm run build`）
2. 提交到 GitHub
3. 等待自动部署完成
4. 强制刷新浏览器（Ctrl+Shift+R）
