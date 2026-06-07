'use client';

import { useState } from 'react';
import { FALLBACK_PHOTO, getPhotoUrl, type UnsplashPhoto } from '@/lib/unsplash';

interface UnsplashImageProps {
  photo: UnsplashPhoto;
  width?: number;
  priority?: boolean;
  className?: string;
}

/**
 * Uses a native <img> so Unsplash URLs load directly without the Next.js
 * image optimizer (which often 400s on external Unsplash query strings).
 */
export default function UnsplashImage({
  photo,
  width = 1200,
  priority = false,
  className = '',
}: UnsplashImageProps) {
  const [activePhoto, setActivePhoto] = useState(photo);
  const src = getPhotoUrl(activePhoto, width);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={activePhoto.alt}
      width={width}
      height={Math.round(width * 0.5625)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      className={className}
      onError={() => {
        if (activePhoto.id !== FALLBACK_PHOTO.id) {
          setActivePhoto(FALLBACK_PHOTO);
        }
      }}
    />
  );
}
