import Link from 'next/link';
import SiteBrand from '@/components/SiteBrand';
import { FOOTER_EXPLORE, FOOTER_EXTERNAL, FOOTER_TOPICS, SITE_BRAND } from '@/lib/siteData';

export default function Footer() {
  return (
    <footer className="site-footer noise">
      <div className="site-footer__glow" aria-hidden="true" />

      <div className="site-shell site-footer__shell">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <SiteBrand variant="footer" showTagline />
            <p className="site-footer__description">
              An educational archive of black hole physics — from event horizons to
              open research frontiers.
            </p>
          </div>

          <div className="site-footer__columns">
            <div>
              <p className="site-footer__col-title">Explore</p>
              <ul className="site-footer__links">
                {FOOTER_EXPLORE.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="site-footer__col-title">Topics</p>
              <ul className="site-footer__links">
                {FOOTER_TOPICS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="site-footer__col-title">Resources</p>
              <ul className="site-footer__links">
                {FOOTER_EXTERNAL.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {new Date().getFullYear()} {SITE_BRAND.tagline} · Educational astrophysics
          </p>
          <p>
            Space imagery via{' '}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
