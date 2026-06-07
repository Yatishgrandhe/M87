import Link from 'next/link';
import { SITE_BRAND } from '@/lib/siteData';

interface SiteBrandProps {
  variant?: 'nav' | 'footer';
  showTagline?: boolean;
}

export default function SiteBrand({
  variant = 'nav',
  showTagline = variant === 'footer',
}: SiteBrandProps) {
  return (
    <Link
      href="/"
      className={`site-brand site-brand--${variant}`}
      aria-label={`${SITE_BRAND.name} home`}
    >
      <span className="site-brand__name">{SITE_BRAND.displayName}</span>
      {showTagline && (
        <span className="site-brand__tagline">{SITE_BRAND.tagline}</span>
      )}
    </Link>
  );
}
