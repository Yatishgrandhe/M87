import type { Metadata, Viewport } from 'next';
import {
  IBM_Plex_Mono,
  Sora,
  Source_Sans_3,
  Source_Serif_4,
  Space_Grotesk,
  Syne,
} from 'next/font/google';
import { SEO } from '@/lib/siteData';
import './globals.css';

const displayFont = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700', '800'],
  display: 'swap',
});

const bodyFont = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const uiFont = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-ui',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const spaceFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const headerFont = Sora({
  subsets: ['latin'],
  variable: '--font-header',
  weight: ['500', '600', '700'],
  display: 'swap',
});

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
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${uiFont.variable} ${monoFont.variable} ${spaceFont.variable} ${headerFont.variable}`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero-poster.webp"
          fetchPriority="high"
        />
        <link rel="preload" as="video" href="/hero.webm" type="video/webm" />
      </head>
      <body className="min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}
