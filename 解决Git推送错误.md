# 解决 Git 推送错误

## 🚨 错误信息

```
error: failed to push some refs to 'https://github.com/littlestronger666/my_blog.git'
hint: Updates were rejected because the remote contains work that you do not have locally.
```

## 🔍 原因

远程仓库（GitHub）有一些你本地没有的更改，通常是：
- GitHub Actions 自动生成的文件
- 在 GitHub 网页上直接编辑的文件
- 其他协作者的提交

## ✅ 解决方案

### 方案 1: 拉取并合并（推荐）

```bash
# 1. 拉取远程更改
git pull origin main --rebase

# 2. 如果有冲突，解决冲突后继续
# git add .
# git rebase --continue

# 3. 推送
git push origin main
```

### 方案 2: 强制拉取（如果方案1有问题）

```bash
# 1. 拉取远程更改
git pull origin main --allow-unrelated-histories

# 2. 推送
git push origin main
```

### 方案 3: 强制推送（⚠️ 谨慎使用）

**警告：这会覆盖远程的更改！**

```bash
git push origin main --force
```

## 📋 完整步骤

### 步骤 1: 拉取远程更改

```bash
git pull origin main --rebase
```

### 步骤 2: 检查状态

```bash
git status
```

### 步骤 3: 推送

```bash
git push origin main
```

## 🎯 针对你的情况

由于你使用自定义域名，`REPO_NAME` 应该保持为空字符串。

### 1. 确认配置正确

打开 `next.config.ts`，确认：

```typescript
const REPO_NAME = ''; // 👈 自定义域名应该是空字符串
```

### 2. 拉取并推送

```bash
# 拉取远程更改
git pull origin main --rebase

# 如果成功，推送
git push origin main
```

### 3. 如果拉取时有冲突

```bash
# 查看冲突文件
git status

# 解决冲突后
git add .
git rebase --continue

# 推送
git push origin main
```

## 🔧 自定义域名配置

既然你使用自定义域名，确保：

### 1. next.config.ts 配置

```typescript
const REPO_NAME = ''; // 空字符串
```

### 2. GitHub Pages 设置

1. 进入仓库 Settings → Pages
2. 确认 Custom domain 已设置
3. 确认 DNS 检查通过

### 3. CNAME 文件

确保 `public/CNAME` 文件存在，内容是你的域名：

```
yourdomain.com
```

## 📝 快速命令

```bash
# 一键解决（复制粘贴执行）
git pull origin main --rebase && git push origin main
```

## ⚠️ 如果还是失败

### 检查分支名

你的主分支可能叫 `master` 而不是 `main`：

```bash
# 查看当前分支
git branch

# 如果是 master，使用：
git pull origin master --rebase
git push origin master
```

### 查看远程仓库

```bash
# 查看远程仓库配置
git remote -v

# 应该显示：
# origin  https://github.com/littlestronger666/my_blog.git (fetch)
# origin  https://github.com/littlestronger666/my_blog.git (push)
```

## 🎉 成功后

推送成功后：

1. 等待 2-3 分钟让 GitHub Actions 完成
2. 访问你的自定义域名
3. 强制刷新浏览器（Ctrl+Shift+R）
4. 检查样式是否正常

## 💡 避免将来出现此问题

每次修改前先拉取：

```bash
git pull origin main
# 然后再进行修改
```

## 🆘 紧急方案

如果以上都不行，可以：

1. 备份你的本地更改
2. 删除本地仓库
3. 重新克隆
4. 应用你的更改
5. 推送

```bash
# 备份（在项目外的地方）
cp -r xiaodu-blog xiaodu-blog-backup

# 重新克隆
git clone https://github.com/littlestronger666/my_blog.git
cd my_blog

# 复制你的更改
# 然后提交推送
```
