import { getPageData, getAllCategories } from '@/lib/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

export default async function About() {
  const pageData = await getPageData('about');
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <main className="w-full md:w-3/4">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <div 
                className="prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
                dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} 
              />
            </article>
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
