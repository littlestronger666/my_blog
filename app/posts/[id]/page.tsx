import { getAllPostIds, getPostData, getAllCategories } from '@/lib/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import Comments from '@/components/Comments';
import Link from 'next/link';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => path.params);
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postData = await getPostData(id);
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <main className="w-full md:w-3/4">
            <article>
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{postData.title}</h1>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <time>{postData.date}</time>
                  {postData.category && (
                    <>
                      <span>·</span>
                      <Link href={`/categories/${encodeURIComponent(postData.category)}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                        {postData.category}
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div 
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-gray-900 dark:prose-code:text-gray-100 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-img:rounded-lg prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} 
              />
            </article>
            
            {/* 评论区 */}
            <Comments />
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
