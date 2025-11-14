export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} 小强大的普通日子. All rights reserved.</p>
          <p className="mt-2">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
