import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import PageHero from '@/components/PageHero';
import SubpageContent from '@/components/SubpageContent';
import Footer from '@/components/Footer';
import { getSubpage } from '@/lib/siteData';

const page = getSubpage('research');

export const metadata: Metadata = {
  title: 'Active Research — Singularity',
  description: page?.subtitle,
};

export default function ResearchPage() {
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
