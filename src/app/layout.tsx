import type { Metadata, Viewport } from 'next';
import { SEO } from '@/lib/siteData';
import './globals.css';

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  keywords: SEO.keywords,
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero-poster.webp"
          fetchPriority="high"
        />
        <link rel="preload" as="video" href="/hero.webm" type="video/webm" />
      </head>
      <body className="min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)] antialiased">{children}</body>
    </html>
  );
}
