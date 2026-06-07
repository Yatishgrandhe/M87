'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useReveal } from '@/hooks/useReveal';

export default function WormholeSection() {
  const contentRef = useReveal<HTMLDivElement>({ threshold: 0.28 });
  const ringCount = 16;

  return (
    <section id="research" className="wormhole-section" aria-labelledby="research-heading">
      <div className="wormhole-section__field" aria-hidden="true">
        {Array.from({ length: ringCount }, (_, index) => (
          <span
            key={index}
            style={
              {
                '--ring-size': `${120 + index * 64}px`,
                '--ring-delay': `${index * -0.42}s`,
                '--ring-alpha': Math.max(0.08, 0.58 - index * 0.03),
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div ref={contentRef} className="wormhole-section__content reveal-v2">
        <p className="wormhole-section__eyebrow">Research Frontier</p>
        <h2 id="research-heading">Beyond the Photon Sphere</h2>
        <p>
          The image of M87* answered one question and opened hundreds more. Event horizons,
          quantum information, gravitational waves, and spacetime itself remain active targets for
          the next generation of instruments.
        </p>
        <Link href="/research">Explore the Research</Link>
      </div>

      <style jsx>{`
        .wormhole-section {
          position: relative;
          display: grid;
          min-height: 86vh;
          overflow: hidden;
          place-items: center;
          background:
            radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--orange-core) 13%, transparent), transparent 22%),
            radial-gradient(circle at 50% 50%, var(--bg-card), var(--bg-section) 64%);
          padding: clamp(6rem, 12vw, 10rem) 1.25rem;
          isolation: isolate;
        }

        .wormhole-section__field {
          position: absolute;
          inset: 0;
          display: grid;
          perspective: 880px;
          place-items: center;
          z-index: -1;
        }

        .wormhole-section__field span {
          position: absolute;
          width: var(--ring-size);
          height: var(--ring-size);
          border: 1px solid color-mix(in srgb, var(--gold) 48%, transparent);
          border-radius: 999px;
          box-shadow:
            0 0 26px color-mix(in srgb, var(--orange-core) 14%, transparent),
            inset 0 0 18px color-mix(in srgb, var(--gold) 8%, transparent);
          opacity: var(--ring-alpha);
          transform: rotateX(72deg) rotateZ(0deg);
          animation: wormhole-drift 18s linear infinite;
          animation-delay: var(--ring-delay);
        }

        .wormhole-section__content {
          max-width: 760px;
          border: 1px solid var(--border-dim);
          border-radius: 32px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 90%, transparent), color-mix(in srgb, var(--bg-card) 78%, transparent)),
            radial-gradient(circle at top, color-mix(in srgb, var(--gold) 12%, transparent), transparent 54%);
          backdrop-filter: blur(22px);
          padding: clamp(2rem, 5vw, 4rem);
          text-align: center;
          box-shadow: 0 30px 120px color-mix(in srgb, var(--orange-core) 14%, transparent);
        }

        .wormhole-section__eyebrow {
          color: var(--gold);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.34em;
          text-transform: uppercase;
        }

        .wormhole-section h2 {
          margin-top: 0.9rem;
          color: var(--text-primary);
          font-family: var(--font-display), system-ui, sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 0.98;
        }

        .wormhole-section__content > p:last-of-type {
          margin: 1.35rem auto 0;
          max-width: 620px;
          color: var(--text-muted);
          font-family: var(--font-body), Georgia, serif;
          font-size: 1.05rem;
          line-height: 1.85;
        }

        .wormhole-section a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 2rem;
          border: 1px solid color-mix(in srgb, var(--gold) 55%, transparent);
          border-radius: 999px;
          background:
            linear-gradient(135deg, var(--gold), var(--orange-core)),
            var(--gold);
          color: var(--bg-section);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          padding: 0.95rem 1.35rem;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            box-shadow 220ms ease,
            transform 220ms ease;
        }

        .wormhole-section a:hover {
          box-shadow: 0 0 46px color-mix(in srgb, var(--orange-core) 42%, transparent);
          transform: translateY(-2px);
        }

        :global(.reveal-v2) {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 760ms ease,
            transform 760ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        :global(.reveal-v2.is-visible) {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes wormhole-drift {
          to {
            transform: rotateX(72deg) rotateZ(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wormhole-section__field span {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
