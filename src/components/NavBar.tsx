'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SiteBrand from '@/components/SiteBrand';
import { NAV_LINKS } from '@/lib/siteData';

export default function NavBar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`site-nav ${isScrolled ? 'site-nav--scrolled' : ''}`}
    >
      <nav className="site-shell site-nav__inner">
        <SiteBrand variant="nav" showTagline />

        <ul className="site-nav__links">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`site-nav__link ${isActive ? 'site-nav__link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
