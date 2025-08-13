import type { ReactNode } from 'react';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Simulated Crypto',
    template: '%s | Simulated Crypto',
  },
  description: 'Educational portal with live crypto data, calculators and original articles about cryptocurrency.',
  openGraph: {
    type: 'website',
    title: 'Simulated Crypto',
    description: 'Educational portal with live crypto data, calculators and original articles about cryptocurrency.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/mining/hero.png`,
        width: 1200,
        height: 630,
        alt: 'Simulated Crypto Hero Image',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}