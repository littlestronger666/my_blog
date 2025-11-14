# 配置 Giscus 评论系统

## 📋 前提条件

在配置 Giscus 之前，你需要：

1. ✅ 有一个 GitHub 账号
2. ✅ 有一个公开的 GitHub 仓库（用于存放博客代码）
3. ✅ 该仓库已启用 Discussions 功能

## 🚀 配置步骤

### 步骤 1: 创建/准备 GitHub 仓库

1. 访问 GitHub 并登录
2. 创建一个新的公开仓库（或使用现有仓库）
   - 仓库名称例如：`my-blog` 或 `xiaodu-blog`
   - 必须设置为 **Public（公开）**

### 步骤 2: 启用 Discussions

1. 进入你的 GitHub 仓库
2. 点击 **Settings（设置）**
3. 向下滚动找到 **Features（功能）** 部分
4. 勾选 **Discussions（讨论）**
5. 点击 **Set up discussions（设置讨论）**

### 步骤 3: 安装 Giscus App

1. 访问 https://github.com/apps/giscus
2. 点击 **Install（安装）**
3. 选择你的账号
4. 选择 **Only select repositories（仅选择的仓库）**
5. 选择你的博客仓库
6. 点击 **Install（安装）**

### 步骤 4: 获取配置信息

1. 访问 https://giscus.app/zh-CN
2. 在 **配置** 部分填写信息：

#### 4.1 仓库
输入你的仓库地址，格式：`你的用户名/仓库名`
例如：`zhangsan/my-blog`

#### 4.2 页面 ↔️ discussion 映射关系
选择：**Discussion 的标题包含页面的 pathname**
（这是推荐的选项）

#### 4.3 Discussion 分类
选择：**Announcements** 或 **General**
（推荐使用 Announcements）

#### 4.4 特性
- ✅ 启用主评论区的反应
- ✅ 将评论框放在评论上方（可选）
- ✅ 懒加载评论

#### 4.5 主题
选择：**首选配色方案**
（我们的代码会自动根据网站主题切换）

### 步骤 5: 复制配置信息

在页面底部的 **启用 giscus** 部分，你会看到类似这样的代码：

```html
<script src="https://giscus.app/client.js"
        data-repo="你的用户名/仓库名"
        data-repo-id="R_kgDOxxxxxxx"
        data-category="Announcements"
        data-category-id="DIC_kwDOxxxxxxx"
        ...>
</script>
```

**重要：记下以下信息：**
- `data-repo`: 例如 `zhangsan/my-blog`
- `data-repo-id`: 例如 `R_kgDOxxxxxxx`
- `data-category`: 例如 `Announcements`
- `data-category-id`: 例如 `DIC_kwDOxxxxxxx`

### 步骤 6: 更新评论组件

打开 `components/Comments.tsx` 文件，替换以下内容：

```tsx
<Giscus
  id="comments"
  repo="YOUR_GITHUB_USERNAME/YOUR_REPO_NAME"  // 👈 替换这里
  repoId="YOUR_REPO_ID"                       // 👈 替换这里
  category="Announcements"                     // 👈 替换这里（如果你选择了其他分类）
  categoryId="YOUR_CATEGORY_ID"               // 👈 替换这里
  mapping="pathname"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="top"
  theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
  lang="zh-CN"
  loading="lazy"
/>
```

**替换示例：**
```tsx
<Giscus
  id="comments"
  repo="zhangsan/my-blog"
  repoId="R_kgDOL1234567"
  category="Announcements"
  categoryId="DIC_kwDOL1234567"
  mapping="pathname"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="top"
  theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
  lang="zh-CN"
  loading="lazy"
/>
```

### 步骤 7: 测试评论功能

1. 保存文件
2. 重启开发服务器：
   ```bash
   npm run dev
   ```
3. 访问任意文章页面
4. 滚动到页面底部
5. 你应该能看到 Giscus 评论框

## 📝 配置说明

### 各参数含义

| 参数 | 说明 | 示例 |
|------|------|------|
| `repo` | GitHub 仓库地址 | `zhangsan/my-blog` |
| `repoId` | 仓库 ID（自动生成） | `R_kgDOL1234567` |
| `category` | Discussion 分类名称 | `Announcements` |
| `categoryId` | 分类 ID（自动生成） | `DIC_kwDOL1234567` |
| `mapping` | 页面映射方式 | `pathname` |
| `reactionsEnabled` | 启用反应（点赞等） | `"1"` |
| `inputPosition` | 评论框位置 | `"top"` 或 `"bottom"` |
| `theme` | 主题 | `"light"` 或 `"dark"` |
| `lang` | 语言 | `"zh-CN"` |
| `loading` | 加载方式 | `"lazy"` |

### 主题自动切换

我们的配置会自动根据网站的亮/暗模式切换评论区主题：

```tsx
theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
```

## 🎨 自定义样式

如果需要自定义评论区样式，可以在 `globals.css` 中添加：

```css
/* Giscus 评论区自定义样式 */
.giscus {
  /* 你的自定义样式 */
}
```

## ⚠️ 常见问题

### Q1: 评论区不显示
**可能原因：**
- 仓库不是公开的
- 没有启用 Discussions
- 没有安装 Giscus App
- 配置信息填写错误

**解决方法：**
1. 确认仓库是 Public
2. 确认 Discussions 已启用
3. 重新安装 Giscus App
4. 检查配置信息是否正确

### Q2: 显示 "Discussion not found"
**原因：** 该页面还没有对应的 Discussion

**解决方法：**
- 这是正常的，第一次有人评论时会自动创建
- 或者在 GitHub Discussions 中手动创建

### Q3: 无法评论
**原因：** 用户需要登录 GitHub

**说明：**
- Giscus 使用 GitHub 账号进行身份验证
- 访客需要登录 GitHub 才能评论
- 这是 Giscus 的设计特点

### Q4: 主题不切换
**检查：**
1. 确认 `Comments.tsx` 中使用了 `resolvedTheme`
2. 确认导入了 `useTheme` from `next-themes`
3. 清除浏览器缓存并刷新

## 🔒 隐私和安全

- Giscus 是开源的，代码透明
- 评论数据存储在你的 GitHub 仓库中
- 你完全控制评论内容
- 可以在 GitHub Discussions 中管理评论

## 📚 更多资源

- [Giscus 官网](https://giscus.app/zh-CN)
- [Giscus GitHub](https://github.com/giscus/giscus)
- [GitHub Discussions 文档](https://docs.github.com/en/discussions)

## ✅ 配置完成检查清单

- [ ] GitHub 仓库已创建且为公开
- [ ] Discussions 功能已启用
- [ ] Giscus App 已安装
- [ ] 从 giscus.app 获取了配置信息
- [ ] 更新了 `components/Comments.tsx` 中的配置
- [ ] 重启了开发服务器
- [ ] 在文章页面能看到评论框
- [ ] 可以成功发表评论

## 🎉 完成！

配置完成后，你的博客就有了功能完整的评论系统！访客可以：
- 发表评论
- 回复评论
- 点赞/反应
- 使用 Markdown 格式
- 上传图片

所有评论都会保存在你的 GitHub 仓库的 Discussions 中，方便管理和备份。
