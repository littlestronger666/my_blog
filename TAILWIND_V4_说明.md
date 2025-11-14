# Tailwind CSS v4 配置说明

## 重要提示

本项目使用的是 **Tailwind CSS v4**（最新版本），配置方式与 v3 完全不同。

## Tailwind v4 的主要变化

### 1. CSS 配置方式
不再使用 `@tailwind` directives，改用 `@import` 和 `@theme`：

**app/globals.css**:
```css
@import "tailwindcss";

@theme {
  --color-background: #ffffff;
  --color-foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: #0a0a0a;
    --color-foreground: #ededed;
  }
}
```

### 2. 配置文件简化
**tailwind.config.js**:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
}
```

v4 中大部分配置都通过 CSS 完成，不再需要复杂的 JS 配置文件。

### 3. Dark Mode
- 仍然支持 `darkMode: 'class'` 配置
- 在组件中使用 `dark:` 前缀的类名
- `next-themes` 会在 `<html>` 标签添加/移除 `dark` class

## 当前配置

### PostCSS 配置
**postcss.config.mjs**:
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### 依赖版本
```json
{
  "tailwindcss": "^4",
  "@tailwindcss/postcss": "^4"
}
```

## 使用方式

### 在组件中使用
使用方式与 v3 相同：

```tsx
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">标题</h1>
  <p className="text-gray-600 dark:text-gray-400">内容</p>
</div>
```

### 响应式设计
```tsx
<div className="w-full md:w-3/4 lg:w-1/2">
  内容
</div>
```

### 状态变化
```tsx
<button className="hover:bg-blue-600 active:bg-blue-700">
  按钮
</button>
```

## 常见问题

### Q: 为什么删除了 tailwind.config.ts？
A: Tailwind v4 推荐使用 `.js` 配置文件，并且大部分配置移到了 CSS 中。

### Q: 样式不生效怎么办？
A: 
1. 确保使用了 `@import "tailwindcss"` 而不是 `@tailwind` directives
2. 清除 `.next` 目录并重新构建
3. 检查 PostCSS 配置是否正确

### Q: Dark mode 不工作？
A: 
1. 确保 `tailwind.config.js` 中有 `darkMode: 'class'`
2. 确保 `next-themes` 的 `attribute="class"` 配置正确
3. 检查浏览器控制台是否有错误

## 迁移注意事项

如果从 Tailwind v3 迁移到 v4：

1. ✅ 更新 `globals.css` 使用新的 `@import` 语法
2. ✅ 简化 `tailwind.config.js`
3. ✅ 移除不必要的自定义配置
4. ✅ 测试所有页面的样式

## 参考资源

- [Tailwind CSS v4 文档](https://tailwindcss.com/docs)
- [Tailwind CSS v4 升级指南](https://tailwindcss.com/docs/upgrade-guide)
- [next-themes 文档](https://github.com/pacocoursey/next-themes)

## 测试清单

- ✅ 页面布局正常（双栏布局）
- ✅ 响应式设计工作（移动端/桌面端）
- ✅ 亮/暗模式切换正常
- ✅ 所有颜色和样式正确显示
- ✅ 构建成功无错误
