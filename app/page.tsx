import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { getSortedPostsData, getAllCategories } from '@/lib/posts';

export default function Home() {
  const allPostsData = getSortedPostsData();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <main className="w-full md:w-3/4">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">最新文章</h1>
            <div className="space-y-6">
              {allPostsData.map((post) => (
                <article key={post.id} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <Link href={`/posts/${post.id}`}>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <time>{post.date}</time>
                    {post.category && (
                      <>
                        <span>·</span>
                        <Link href={`/categories/${encodeURIComponent(post.category)}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                          {post.category}
                        </Link>
                      </>
                    )}
                  </div>
                  {post.excerpt && (
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>
                  )}
                  <Link href={`/posts/${post.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    阅读更多 →
                  </Link>
                </article>
              ))}
            </div>
          </main>
          <aside className="w-full md:w-1/4">
            <Sidebar categories={categories} />
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
