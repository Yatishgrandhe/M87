'use client';

import type { CSSProperties } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { useReveal } from '@/hooks/useReveal';
import { STATS } from '@/lib/siteData';

interface StatData {
  id?: string;
  label: string;
  value?: number;
  suffix?: string;
  prefix?: string;
  display?: string;
  unit?: string;
  decimals?: number;
}

function formatNumber(value: number, decimals: number) {
  return value.toLocaleString('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

function StatCard({ stat, index }: { stat: StatData; index: number }) {
  const target = stat.value ?? 0.0;
  const decimals = stat.decimals ?? (Number.isInteger(target) ? 0 : 1);
  const { value, ref } = useCountUp({ end: target, decimals });
  const revealRef = useReveal<HTMLDivElement>();
  const symbolicDisplay = stat.display ?? stat.prefix;
  const displayValue = target === 0.0 && symbolicDisplay ? symbolicDisplay : formatNumber(value, decimals);

  return (
    <div
      ref={revealRef}
      className="stats-section__card reveal-v2"
      style={{ '--reveal-delay': `${index * 75}ms` } as CSSProperties}
    >
      <div ref={ref} className="stats-section__counter">
        {stat.prefix && target !== 0.0 && <span>{stat.prefix}</span>}
        {displayValue}
        {stat.suffix && <small>{stat.suffix}</small>}
      </div>
      <p className="stats-section__label">{stat.label}</p>
      {stat.unit && <p className="stats-section__unit">{stat.unit}</p>}
    </div>
  );
}

export default function StatsSection() {
  const headerRef = useReveal<HTMLDivElement>();
  const stats = (STATS as StatData[]).slice(0, 6);

  return (
    <section id="physics" className="stats-section noise-overlay" aria-labelledby="stats-heading">
      <div className="stats-section__grid-bg" aria-hidden="true" />
      <div className="stats-section__shell">
        <div ref={headerRef} className="stats-section__header reveal-v2">
          <p className="stats-section__eyebrow">Quantified Extremes</p>
          <h2 id="stats-heading">Physics at the Limit</h2>
          <p>
            Black holes turn familiar quantities into impossible scales: light-speed escape
            velocities, galaxy-scale mass, and time stretched to the edge of observation.
          </p>
        </div>

        <div className="stats-section__grid">
          {stats.map((stat, index) => (
            <StatCard key={stat.id ?? stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .stats-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--gold) 10%, transparent), transparent 36%),
            var(--bg-section);
          padding: clamp(5.5rem, 10vw, 8.5rem) 1.25rem;
        }

        .stats-section__grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(color-mix(in srgb, var(--border-dim) 80%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--border-dim) 80%, transparent) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(circle at center, #000, transparent 72%);
          opacity: 0.34;
        }

        .stats-section__shell {
          position: relative;
          margin: 0 auto;
          max-width: 1160px;
        }

        .stats-section__header {
          margin: 0 auto clamp(2.5rem, 6vw, 4rem);
          max-width: 720px;
          text-align: center;
        }

        .stats-section__eyebrow {
          color: var(--gold);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.34em;
          text-transform: uppercase;
        }

        .stats-section h2 {
          margin-top: 0.85rem;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: clamp(2.1rem, 5vw, 4.4rem);
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 1;
        }

        .stats-section__header p:last-child {
          margin-top: 1.15rem;
          color: var(--text-muted);
          font-family: var(--font-body);
          font-size: 0.95rem;
          line-height: 1.8;
        }

        .stats-section__grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }

        .stats-section__card {
          min-height: 190px;
          border: 1px solid var(--border-dim);
          border-radius: 24px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 92%, white 3%), var(--bg-card)),
            radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--orange-core) 14%, transparent), transparent 58%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(1.3rem, 3vw, 2rem);
          text-align: center;
        }

        .stats-section__counter {
          color: var(--gold);
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5vw, 4.3rem);
          font-weight: 700;
          letter-spacing: -0.055em;
          line-height: 0.95;
          text-shadow: 0 0 34px color-mix(in srgb, var(--orange-core) 35%, transparent);
        }

        .stats-section__counter span {
          margin-right: 0.35rem;
        }

        .stats-section__counter small {
          display: block;
          margin-top: 0.6rem;
          color: var(--orange-core);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .stats-section__label {
          margin: 1rem auto 0;
          max-width: 13rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          line-height: 1.55;
          text-transform: uppercase;
        }

        .stats-section__unit {
          margin: 0.45rem auto 0;
          max-width: 14rem;
          color: color-mix(in srgb, var(--text-muted) 72%, transparent);
          font-family: var(--font-body);
          font-size: 0.76rem;
          line-height: 1.55;
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

        @media (max-width: 880px) {
          .stats-section__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 620px) {
          .stats-section__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
