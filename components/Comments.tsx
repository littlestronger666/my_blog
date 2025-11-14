'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comments() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">评论</h3>
      <Giscus
        id="comments"
        repo="littlestronger666/my_blog"
        repoId="R_kgDOQVgM7Q"
        category="Announcements"
        categoryId="DIC_kwDOQVgM7c4CxyLj"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
