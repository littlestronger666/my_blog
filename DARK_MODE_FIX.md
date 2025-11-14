# 亮/暗模式修复说明

## 已修复的问题

亮/暗模式不工作的问题已经修复。主要修改如下：

### 1. 创建了 Tailwind 配置文件

创建了 `tailwind.config.ts` 文件，并设置了 `darkMode: 'class'`：

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // 关键配置：使用 class 策略
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
```

### 2. 更新了全局样式文件

修改了 `app/globals.css`，使用标准的 Tailwind directives：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}

body {
  background: var(--background);
  color: var(--foreground);
}
```

## 工作原理

1. **ThemeProvider** (`next-themes`) 会在 `<html>` 标签上添加或移除 `dark` class
2. **Tailwind CSS** 通过 `darkMode: 'class'` 配置，会在有 `dark` class 时应用 dark mode 样式
3. **ThemeSwitcher** 组件通过 `setTheme()` 切换主题

## 如何使用

### 在组件中使用 dark mode 样式

```tsx
// 文本颜色
<p className="text-gray-900 dark:text-white">文本</p>

// 背景颜色
<div className="bg-white dark:bg-gray-900">内容</div>

// 边框颜色
<div className="border-gray-200 dark:border-gray-700">内容</div>
```

### 测试亮/暗模式

1. 启动开发服务器：`npm run dev`
2. 访问 http://localhost:3000
3. 点击右上角的主题切换按钮（太阳/月亮图标）
4. 观察页面颜色变化

## 验证

运行以下命令确保构建正常：

```bash
npm run build
```

构建成功后，所有页面都应该支持亮/暗模式切换。

## 注意事项

- 确保所有使用颜色的地方都添加了 `dark:` 前缀的样式
- 主题状态会保存在 localStorage 中，刷新页面后会保持
- 如果用户没有选择主题，会使用系统默认主题（`defaultTheme="system"`）
