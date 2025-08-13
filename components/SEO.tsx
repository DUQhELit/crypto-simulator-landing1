import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
}

/**
 * SEO component injects meta tags and Open Graph/Twitter Card tags.
 * These tags enhance the appearance of links shared on social media and
 * search engine results.  Provide a unique title and description per page.
 */
const SEO: React.FC<SEOProps> = ({ title, description, canonical, image }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = canonical || siteUrl;
  const imageUrl = image || `${siteUrl}/images/mining/hero.png`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {/* OpenGraph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default SEO;