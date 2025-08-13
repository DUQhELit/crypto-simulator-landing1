import path from 'path';
import fs from 'fs';

interface ArticleFrontMatter {
  title: string;
  description: string;
  slug: string;
  date: string;
  image: string;
}

function getArticles(): ArticleFrontMatter[] {
  const dir = path.join(process.cwd(), 'content', 'learn');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  const articles: ArticleFrontMatter[] = [];
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const mod = require(`../../content/learn/${slug}.mdx`);
    const { frontMatter } = mod;
    articles.push({
      title: frontMatter.title,
      description: frontMatter.description,
      slug: frontMatter.slug,
      date: frontMatter.date,
      image: frontMatter.image,
    });
  }
  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export default function LearnIndexPage() {
  const articles = getArticles();
  return (
    <main className="px-4 py-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-4">Learn About Cryptocurrency</h1>
      <p className="text-gray-400 mb-6">
        Explore our collection of original articles covering the fundamentals of crypto, mining, wallets, decentralised finance and more.
      </p>
      <div className="grid sm:grid-cols-2 gap-6">
        {articles.map((article) => (
          <a
            key={article.slug}
            href={`/learn/${article.slug}`}
            className="block bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{article.title}</h2>
              <p className="text-sm text-gray-400 mb-2">{new Date(article.date).toLocaleDateString()}</p>
              <p className="text-gray-300 text-sm">{article.description}</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}