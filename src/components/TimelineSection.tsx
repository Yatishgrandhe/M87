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

function TimelineMilestone({
  children,
  delayMs = 0,
}: {
  children: ReactNode;
  delayMs?: number;
}) {
  const ref = useReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className="timeline-section__milestone reveal-v2"
      style={{ '--reveal-delay': `${delayMs}ms` } as CSSProperties}
    >
      {children}
    </li>
  );
}

export default function TimelineSection() {
  const headerRef = useReveal<HTMLDivElement>();
  const events = TIMELINE as TimelineItem[];

  return (
    <section
      id="timeline"
      className="timeline-section noise-overlay"
      aria-labelledby="timeline-heading"
    >
      <div className="site-shell timeline-section__shell">
        <header ref={headerRef} className="timeline-section__header reveal-v2">
          <p className="timeline-section__eyebrow">Observational History</p>
          <h2 id="timeline-heading">How Darkness Became Data</h2>
          <p className="timeline-section__lede">
            Three centuries of theory and instrumentation turned an invisible prediction
            into a photographed object, a gravitational-wave signal, and a living research
            frontier.
          </p>
          <Link href="/timeline" className="timeline-section__cta">
            View full timeline →
          </Link>
        </header>

        <ol className="timeline-section__grid" aria-label="Black hole discovery milestones">
          {events.map((event, index) => (
            <TimelineMilestone
              key={`${event.year}-${event.title}`}
              delayMs={index * 60}
            >
              <p className="timeline-section__year">{event.year}</p>
              <h3 className="timeline-section__title">{event.title}</h3>
              <p className="timeline-section__desc">
                {event.desc ?? event.description}
              </p>
            </TimelineMilestone>
          ))}
        </ol>
      </div>
    </section>
  );
}
