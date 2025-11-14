# 暗色模式配置说明

## 当前状态

✅ 项目已配置暗色模式支持
✅ 使用 Tailwind CSS v4 + next-themes
✅ ThemeSwitcher 组件已添加调试日志

## 快速测试

### 1. 启动项目
```bash
npm run dev
```

### 2. 打开浏览器
访问 http://localhost:3000

### 3. 打开开发者工具（F12）
切换到 Console 标签查看日志

### 4. 点击主题切换按钮
位于页面右上角的月亮/太阳图标

### 5. 观察变化
- 页面颜色应该立即改变
- 控制台应该显示切换日志
- `<html>` 标签应该添加/移除 `dark` class

## 配置文件

### tailwind.config.js
```javascript
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

### app/globals.css
```css
@import "tailwindcss";
```

### app/layout.tsx
```tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

## 使用方法

在组件中使用 `dark:` 前缀：

```tsx
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">标题</h1>
  <p className="text-gray-600 dark:text-gray-400">内容</p>
</div>
```

## 调试工具

### 1. 测试页面
打开 `测试暗色模式.html` 进行独立测试

### 2. 控制台命令
```javascript
// 手动切换暗色模式
document.documentElement.classList.toggle('dark')

// 检查当前主题
localStorage.getItem('theme')

// 查看 HTML class
document.documentElement.className
```

### 3. 查看日志
ThemeSwitcher 组件会输出：
- 组件挂载时的主题状态
- 切换主题时的操作
- 切换后的 HTML class

## 故障排除

### 问题：点击按钮没反应
1. 检查控制台是否有错误
2. 确认 next-themes 已安装
3. 清除浏览器缓存

### 问题：主题切换了但样式没变
1. 确认组件使用了 `dark:` 前缀
2. 检查 tailwind.config.js 配置
3. 重新构建项目

### 问题：刷新后主题丢失
1. 检查 localStorage 是否可用
2. 确认 ThemeProvider 配置正确
3. 查看浏览器隐私设置

## 相关文档

- `最终修复指南.md` - 详细的故障排除步骤
- `亮暗模式故障排除.md` - 常见问题解答
- `TAILWIND_V4_说明.md` - Tailwind v4 配置说明

## 技术栈

- Next.js 16
- Tailwind CSS v4
- next-themes 0.4.x
- React 19

## 注意事项

1. Tailwind v4 使用新的配置方式
2. 必须使用 `@import "tailwindcss"` 而不是 `@tailwind` directives
3. darkMode 配置必须是 `['class']` 数组格式
4. ThemeSwitcher 必须是 'use client' 组件

## 预期效果

### 亮模式
- 白色背景
- 深色文字
- 浅灰色卡片

### 暗模式
- 深色背景
- 浅色文字
- 深灰色卡片

## 下一步

如果暗色模式正常工作：
1. 移除 ThemeSwitcher 中的调试日志（可选）
2. 测试所有页面的暗色模式效果
3. 根据需要调整颜色方案
4. 部署到生产环境

如果还是不工作：
1. 查看 `最终修复指南.md`
2. 使用 `测试暗色模式.html` 进行独立测试
3. 检查浏览器控制台的详细错误信息
