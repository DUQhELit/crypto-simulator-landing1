import path from 'path';
import fs from 'fs';

interface Params {
  slug: string;
}

// Generate static params for all learn articles based on MDX files in content/learn
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content', 'learn');
  const files = fs.readdirSync(dir);
  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace(/\.mdx$/, '') }));
}

export default async function LearnArticlePage({ params }: { params: Params }) {
  const { slug } = params;
  const mdxModule = await import(`../../../content/learn/${slug}.mdx`);
  const { frontMatter } = mdxModule as any;
  const Content = (mdxModule as any).default;
  return (
    <main className="px-4 py-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-2">{frontMatter.title}</h1>
      <p className="text-gray-400 mb-6">{frontMatter.description}</p>
      <Content />
    </main>
  );
}