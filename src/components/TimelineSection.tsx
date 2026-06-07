'use client';

import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { TIMELINE } from '@/lib/siteData';

interface TimelineItem {
  year: number | string;
  title: string;
  desc?: string;
  description?: string;
}

function RevealItem({
  children,
  delayMs = 0,
}: {
  children: ReactNode;
  delayMs?: number;
}) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="timeline-section__event reveal-v2"
      style={{ '--reveal-delay': `${delayMs}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export default function TimelineSection() {
  const headerRef = useReveal<HTMLDivElement>();
  const events = TIMELINE as TimelineItem[];

  return (
    <section id="timeline" className="timeline-section noise-overlay" aria-labelledby="timeline-heading">
      <div className="timeline-section__shell">
        <div ref={headerRef} className="timeline-section__header reveal-v2">
          <p className="timeline-section__eyebrow">Observational History</p>
          <h2 id="timeline-heading">How Darkness Became Data</h2>
          <p>
            Three centuries of theory and instrumentation turned an invisible prediction into a
            photographed object, a gravitational-wave signal, and a living research frontier.
          </p>
          <Link href="/timeline" className="timeline-section__cta">
            View full timeline →
          </Link>
        </div>

        <div className="timeline-section__sticky">
          <div className="timeline-section__scroller" aria-label="Black hole discovery timeline">
            <div className="timeline-section__track" aria-hidden="true" />
            <div className="timeline-section__row">
              {events.map((event, index) => (
                <RevealItem key={`${event.year}-${event.title}`} delayMs={index * 70}>
                  <span className="timeline-section__node" aria-hidden="true" />
                  <p className="timeline-section__year">{event.year}</p>
                  <h3>{event.title}</h3>
                  <p>{event.desc ?? event.description}</p>
                </RevealItem>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeline-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 82% 14%, color-mix(in srgb, var(--orange-core) 12%, transparent), transparent 35%),
            var(--bg-section);
          padding: clamp(6rem, 11vw, 9rem) 0;
        }

        .timeline-section__shell {
          margin: 0 auto;
          max-width: 1220px;
          padding: 0 1.25rem;
        }

        .timeline-section__header {
          margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
          max-width: 760px;
        }

        .timeline-section__eyebrow {
          color: var(--gold);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.34em;
          text-transform: uppercase;
        }

        .timeline-section h2 {
          margin-top: 0.85rem;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: clamp(2.25rem, 6vw, 5rem);
          font-weight: 700;
          letter-spacing: -0.055em;
          line-height: 0.95;
        }

        .timeline-section__header > p:last-of-type {
          margin-top: 1.2rem;
          max-width: 660px;
          color: var(--text-muted);
          font-family: var(--font-body);
          font-size: 0.95rem;
          line-height: 1.8;
        }

        .timeline-section__cta {
          display: inline-block;
          margin-top: 1.25rem;
          color: var(--gold);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .timeline-section__cta:hover {
          color: var(--orange-core);
        }

        .timeline-section__sticky {
          position: sticky;
          top: 4rem;
        }

        .timeline-section__scroller {
          position: relative;
          overflow-x: auto;
          padding: 2rem 0 1rem;
          scrollbar-color: var(--orange-core) transparent;
          scrollbar-width: thin;
        }

        .timeline-section__track {
          position: absolute;
          top: 2.35rem;
          left: 2rem;
          width: max(100%, 2060px);
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-glow), var(--gold), transparent);
          opacity: 0.72;
        }

        .timeline-section__row {
          display: flex;
          min-width: max-content;
          gap: 1rem;
          padding-right: 1.25rem;
        }

        .timeline-section__event {
          position: relative;
          width: clamp(240px, 28vw, 320px);
          flex: 0 0 auto;
          border: 1px solid var(--border-dim);
          border-radius: 22px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 94%, white 4%), var(--bg-card)),
            radial-gradient(circle at top, color-mix(in srgb, var(--gold) 12%, transparent), transparent 52%);
          margin-top: 2.2rem;
          min-height: 240px;
          padding: 1.5rem;
        }

        .timeline-section__node {
          position: absolute;
          top: -2.6rem;
          left: 1.5rem;
          width: 13px;
          height: 13px;
          border: 2px solid var(--bg-section);
          border-radius: 999px;
          background: var(--gold);
          box-shadow: 0 0 26px color-mix(in srgb, var(--orange-core) 55%, transparent);
        }

        .timeline-section__year {
          color: var(--gold);
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3.3rem);
          font-weight: 700;
          letter-spacing: -0.06em;
          line-height: 1;
        }

        .timeline-section__event h3 {
          margin-top: 1rem;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 1.05rem;
          letter-spacing: 0.02em;
          line-height: 1.25;
        }

        .timeline-section__event p:last-child {
          margin-top: 0.85rem;
          color: var(--text-muted);
          font-family: var(--font-body);
          font-size: 0.82rem;
          line-height: 1.75;
        }

        :global(.reveal-v2) {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 760ms ease,
            transform 760ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--reveal-delay, 0ms);
        }

        :global(.reveal-v2.is-visible) {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 720px) {
          .timeline-section__sticky {
            position: relative;
            top: auto;
          }

          .timeline-section__scroller {
            overflow-x: visible;
            padding-top: 0;
          }

          .timeline-section__track {
            bottom: 0;
            left: 0.45rem;
            top: 0;
            width: 1px;
            height: auto;
            background: linear-gradient(var(--gold), transparent);
          }

          .timeline-section__row {
            display: grid;
            gap: 1rem;
            min-width: 0;
            padding-left: 1.5rem;
            padding-right: 0;
          }

          .timeline-section__event {
            width: auto;
            min-height: 0;
            margin-top: 0;
          }

          .timeline-section__node {
            left: -1.45rem;
            top: 1.55rem;
          }
        }
      `}</style>
    </section>
  );
}
