import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const staticPages = ['/', '/coins', '/tools/calculators/mining', '/tools/calculators/pnl', '/tools/calculators/risk', '/learn'];
  const learnDir = path.join(process.cwd(), 'content', 'learn');
  const learnFiles = fs.readdirSync(learnDir).filter((f) => f.endsWith('.mdx'));
  const learnPages = learnFiles.map((f) => `/learn/${f.replace(/\.mdx$/, '')}`);
  const allPages = [...staticPages, ...learnPages];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    allPages
      .map((page) => {
        return `<url><loc>${siteUrl}${page}</loc></url>`;
      })
      .join('') +
    `</urlset>`;
  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}