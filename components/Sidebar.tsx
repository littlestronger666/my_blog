'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SidebarProps {
  categories?: string[];
}

export default function Sidebar({ categories = [] }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* 搜索框 */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">搜索</h3>
        <input
          type="text"
          placeholder="搜索文章..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 个人简介 */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">关于我</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          热爱技术，喜欢分享。在这里记录学习和生活的点滴。
        </p>
        <Link href="/about" className="text-blue-600 dark:text-blue-400 text-sm mt-2 inline-block hover:underline">
          了解更多 →
        </Link>
      </div>

      {/* 分类 */}
      {categories.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">分类</h3>
          <ul className="space-y-2">
            {categories.filter(Boolean).map((category) => (
              <li key={category}>
                <Link
                  href={`/categories/${encodeURIComponent(category)}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* RSS 订阅 */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">订阅</h3>
        <a
          href="/rss.xml"
          className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
        >
          RSS 订阅
        </a>
      </div>
    </div>
  );
}
