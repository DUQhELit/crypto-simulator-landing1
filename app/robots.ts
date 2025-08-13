export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const content = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml`;
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}