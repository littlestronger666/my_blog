import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_posts');
const pagesDirectory = path.join(process.cwd(), '_pages');

export interface PostData {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt?: string;
  contentHtml?: string;
}

// 获取所有文章（用于列表页）
export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const id = fileName.replace(/\.(md|mdx)$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return {
        id,
        title: matterResult.data.title || '',
        date: matterResult.data.date || '',
        category: matterResult.data.category || '',
        excerpt: matterResult.data.excerpt || '',
      };
    });
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 获取所有文章 ID
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.(md|mdx)$/, ''),
        },
      };
    });
}

// 获取单篇文章（用于详情页）
export async function getPostData(id: string): Promise<PostData> {
  // 尝试 .mdx 文件，如果不存在则尝试 .md 文件
  let fullPath = path.join(postsDirectory, `${id}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${id}.md`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  
  // 将相对路径的图片转换为绝对路径
  let content = matterResult.content;
  content = content.replace(/!\[([^\]]*)\]\(\.\/images\//g, '![$1](/images/');
  
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  
  return {
    id,
    contentHtml,
    title: matterResult.data.title || '',
    date: matterResult.data.date || '',
    category: matterResult.data.category || '',
    excerpt: matterResult.data.excerpt || '',
  };
}

// 获取所有分类
export function getAllCategories(): string[] {
  const posts = getSortedPostsData();
  const categories = posts.map(post => post.category);
  return Array.from(new Set(categories)).filter(Boolean);
}

// 根据分类获取文章
export function getPostsByCategory(category: string): PostData[] {
  const posts = getSortedPostsData();
  return posts.filter(post => post.category === category);
}

// 获取独立页面
export async function getPageData(slug: string) {
  const fullPath = path.join(pagesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();
  
  return {
    slug,
    contentHtml,
    title: matterResult.data.title || '',
  };
}

// 获取所有页面 ID
export function getAllPageIds() {
  const fileNames = fs.readdirSync(pagesDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
}
