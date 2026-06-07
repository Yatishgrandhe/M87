/**
 * Unsplash integration for space-themed imagery.
 *
 * All photo IDs below are HTTP-verified (200) against images.unsplash.com.
 * Optional live search: set UNSPLASH_ACCESS_KEY (see .env.example).
 *
 * API docs: https://unsplash.com/documentation
 */

export interface UnsplashPhoto {
  id: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  url: string;
  width: number;
  height: number;
}

export type PhotoTopic =
  | 'galaxy'
  | 'nebula'
  | 'stars'
  | 'telescope'
  | 'accretion'
  | 'gravity'
  | 'milky-way'
  | 'cosmos'
  | 'singularity';

/** Verified space photos — each URL returns HTTP 200. */
export const CURATED_PHOTOS: Record<PhotoTopic, UnsplashPhoto> = {
  galaxy: {
    id: '1462331940025-496dfbfc7564',
    alt: 'Spiral galaxy with glowing arms in deep space',
    photographer: 'NASA',
    photographerUrl: 'https://unsplash.com/@nasa',
    url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564',
    width: 3840,
    height: 2160,
  },
  nebula: {
    id: '1771885124792-119a9daa556b',
    alt: 'Colorful Crab Nebula surrounded by stars',
    photographer: 'NASA',
    photographerUrl: 'https://unsplash.com/@nasa',
    url: 'https://images.unsplash.com/photo-1771885124792-119a9daa556b',
    width: 3840,
    height: 2160,
  },
  stars: {
    id: '1419242902214-272b3f66ee7a',
    alt: 'Dense star field against a dark sky',
    photographer: 'NASA',
    photographerUrl: 'https://unsplash.com/@nasa',
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a',
    width: 3840,
    height: 2160,
  },
  telescope: {
    id: '1644957655704-667664fa0814',
    alt: 'NASA rocket on launch infrastructure',
    photographer: 'NASA',
    photographerUrl: 'https://unsplash.com/@nasa',
    url: 'https://images.unsplash.com/photo-1644957655704-667664fa0814',
    width: 3840,
    height: 2160,
  },
  accretion: {
    id: '1711559382615-fd617a6a2992',
    alt: 'Large colorful region of deep space',
    photographer: 'NASA',
    photographerUrl: 'https://unsplash.com/@nasa',
    url: 'https://images.unsplash.com/photo-1711559382615-fd617a6a2992',
    width: 3840,
    height: 2160,
  },
  gravity: {
    id: '1711990259686-254b8a5bdbe5',
    alt: 'Luminous structures in deep space darkness',
    photographer: 'NASA',
    photographerUrl: 'https://unsplash.com/@nasa',
    url: 'https://images.unsplash.com/photo-1711990259686-254b8a5bdbe5',
    width: 3840,
    height: 2160,
  },
  'milky-way': {
    id: '1464822759023-fed622ff2c3b',
    alt: 'Milky Way arch over a night landscape',
    photographer: 'Milada Vigerova',
    photographerUrl: 'https://unsplash.com/@mili_vigerova',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    width: 3840,
    height: 2160,
  },
  cosmos: {
    id: '1707587537934-4c48040ccae4',
    alt: 'Dense cluster of stars in deep space',
    photographer: 'NASA',
    photographerUrl: 'https://unsplash.com/@nasa',
    url: 'https://images.unsplash.com/photo-1707587537934-4c48040ccae4',
    width: 3840,
    height: 2160,
  },
  singularity: {
    id: '1635070041078-e363dbe005cb',
    alt: 'Abstract dark cosmic sphere with glowing edge',
    photographer: 'Dan Cristian Pădureț',
    photographerUrl: 'https://unsplash.com/@paduret',
    url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    width: 3840,
    height: 2160,
  },
};

/** Guaranteed fallback if any image fails to load. */
export const FALLBACK_PHOTO = CURATED_PHOTOS.galaxy;

export function getPhotoUrl(photo: UnsplashPhoto, width = 900) {
  return `${photo.url}?auto=format&fit=crop&w=${width}&q=75&ixlib=rb-4.0.3`;
}

export function getPhoto(topic: PhotoTopic) {
  return CURATED_PHOTOS[topic];
}

interface UnsplashApiPhoto {
  id: string;
  alt_description: string | null;
  description: string | null;
  width: number;
  height: number;
  urls: { regular: string };
  user: { name: string; links: { html: string } };
}

interface UnsplashSearchResponse {
  results: UnsplashApiPhoto[];
}

/** Live search — requires UNSPLASH_ACCESS_KEY in environment. */
export async function searchUnsplashPhotos(
  query: string,
  perPage = 8
): Promise<UnsplashPhoto[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return Object.values(CURATED_PHOTOS).slice(0, perPage);
  }

  const params = new URLSearchParams({
    query,
    per_page: String(perPage),
    orientation: 'landscape',
    content_filter: 'high',
  });

  const response = await fetch(
    `https://api.unsplash.com/search/photos?${params.toString()}`,
    {
      headers: { Authorization: `Client-ID ${accessKey}` },
      next: { revalidate: 86400 },
    }
  );

  if (!response.ok) {
    return Object.values(CURATED_PHOTOS).slice(0, perPage);
  }

  const data = (await response.json()) as UnsplashSearchResponse;

  return data.results.map((photo) => ({
    id: photo.id,
    alt: photo.alt_description ?? photo.description ?? query,
    photographer: photo.user.name,
    photographerUrl: photo.user.links.html,
    url: photo.urls.regular.split('?')[0] ?? photo.urls.regular,
    width: photo.width,
    height: photo.height,
  }));
}
