import Link from 'next/link';
import type { ReactNode } from 'react';
import UnsplashImage from '@/components/UnsplashImage';
import { getPhoto, type PhotoTopic } from '@/lib/unsplash';

interface GlowCardProps {
  tag?: string;
  title: string;
  body: string;
  href: string;
  imageTopic: PhotoTopic;
  imageSrc?: string;
  imageAlt?: string;
  featured?: boolean;
  accent?: boolean;
  children?: ReactNode;
}

export default function GlowCard({
  tag,
  title,
  body,
  href,
  imageTopic,
  imageSrc,
  imageAlt,
  featured = false,
  accent = false,
  children,
}: GlowCardProps) {
  const photo = getPhoto(imageTopic);
  const classNames = [
    'glow-card-v2',
    featured ? 'glow-card-v2--featured' : '',
    accent ? 'glow-card-v2--accent' : '',
    imageSrc ? 'glow-card-v2--local-media' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link href={href} className={classNames}>
      <div className="glow-card-v2__media">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={imageAlt ?? title}
            className="glow-card-v2__img"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <UnsplashImage
            photo={photo}
            width={featured ? 1100 : 640}
            priority={featured}
            className="glow-card-v2__img"
          />
        )}
        <div className="glow-card-v2__media-fade" aria-hidden="true" />
      </div>
      <div className="glow-card-v2__content">
        {tag && <p className="glow-card-v2__tag">{tag}</p>}
        <h3 className="glow-card-v2__title">{title}</h3>
        <p className="glow-card-v2__body">{body}</p>
        {children && <div className="glow-card-v2__extra">{children}</div>}
        <span className="glow-card-v2__cta">Read more →</span>
      </div>
    </Link>
  );
}
