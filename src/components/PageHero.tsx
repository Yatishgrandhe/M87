import Link from 'next/link';
import UnsplashImage from '@/components/UnsplashImage';
import { getPhoto, type PhotoTopic } from '@/lib/unsplash';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  imageTopic: PhotoTopic;
}

export default function PageHero({ eyebrow, title, subtitle, imageTopic }: PageHeroProps) {
  const photo = getPhoto(imageTopic);

  return (
    <section className="page-hero">
      <div className="page-hero__media">
        <UnsplashImage
          photo={photo}
          width={1920}
          priority
          className="page-hero__img"
        />
        <div className="page-hero__overlay" aria-hidden="true" />
      </div>

      <div className="site-shell page-hero__content">
        <Link href="/" className="page-hero__back">
          ← Back to home
        </Link>
        <p className="page-hero__eyebrow">{eyebrow}</p>
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__subtitle">{subtitle}</p>
        <p className="page-hero__credit">
          Photo by{' '}
          <a href={photo.photographerUrl} target="_blank" rel="noopener noreferrer">
            {photo.photographer}
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
            Unsplash
          </a>
        </p>
      </div>
    </section>
  );
}
