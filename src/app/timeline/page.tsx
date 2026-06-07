import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import PageHero from '@/components/PageHero';
import SubpageContent from '@/components/SubpageContent';
import Footer from '@/components/Footer';
import { getSubpage } from '@/lib/siteData';

const page = getSubpage('timeline');

export const metadata: Metadata = {
  title: 'Discovery Timeline — Singularity',
  description: page?.subtitle,
};

export default function TimelinePage() {
  if (!page) return null;

  return (
    <>
      <NavBar />
      <main>
        <PageHero
          eyebrow={page.eyebrow}
          title={page.title}
          subtitle={page.subtitle}
          imageTopic={page.imageTopic}
        />
        <SubpageContent sections={page.sections} />
      </main>
      <Footer />
    </>
  );
}
