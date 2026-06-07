import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import PageHero from '@/components/PageHero';
import SubpageContent from '@/components/SubpageContent';
import Footer from '@/components/Footer';
import { getSubpage } from '@/lib/siteData';

const page = getSubpage('types');

export const metadata: Metadata = {
  title: 'Types of Black Holes — Singularity',
  description: page?.subtitle,
};

export default function TypesPage() {
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
