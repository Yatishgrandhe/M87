'use client';

import type { CSSProperties } from 'react';
import GlowCard from '@/components/GlowCard';
import { useReveal } from '@/hooks/useReveal';
import { CARDS, type CardData } from '@/lib/siteData';

type GridSpan = 'hero' | 'wide' | 'standard';

interface LayoutItem {
  cardId: string;
  span: GridSpan;
  delayMs: number;
}

const GRID_LAYOUT: LayoutItem[] = [
  { cardId: 'what-is', span: 'hero', delayMs: 0 },
  { cardId: 'event-horizon', span: 'standard', delayMs: 80 },
  { cardId: 'singularity', span: 'standard', delayMs: 160 },
  { cardId: 'hawking', span: 'standard', delayMs: 240 },
  { cardId: 'accretion', span: 'standard', delayMs: 320 },
  { cardId: 'time-dilation', span: 'standard', delayMs: 400 },
  { cardId: 'spaghettification', span: 'standard', delayMs: 480 },
  { cardId: 'types', span: 'wide', delayMs: 560 },
  { cardId: 'paradox', span: 'wide', delayMs: 640 },
];

const SPAN_CLASS: Record<GridSpan, string> = {
  hero: 'info-cards__cell--hero',
  wide: 'info-cards__cell--wide',
  standard: 'info-cards__cell--standard',
};

function TypesScale() {
  return (
    <div className="types-scale" aria-label="Black hole mass classes">
      <span>Stellar · 3–100 M☉</span>
      <span>Intermediate · 100–100k M☉</span>
      <span>Supermassive · 10⁶–10¹⁰ M☉</span>
      <span>Primordial · theoretical</span>
    </div>
  );
}

function CardExtra({ card }: { card: CardData }) {
  if (card.id === 'types') return <TypesScale />;
  return null;
}

function CardCell({ card, span, delayMs }: { card: CardData; span: GridSpan; delayMs: number }) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`info-cards__cell reveal-v2 ${SPAN_CLASS[span]}`}
      style={{ '--reveal-delay': `${delayMs}ms` } as CSSProperties}
    >
      <GlowCard
        tag={card.tag}
        title={card.title}
        body={card.body}
        href={card.href}
        imageTopic={card.imageTopic}
        imageSrc={card.imageSrc}
        imageAlt={card.imageAlt}
        featured={card.featured}
        accent={card.accent}
      >
        <CardExtra card={card} />
      </GlowCard>
    </div>
  );
}

export default function InfoCards() {
  const headerRef = useReveal<HTMLDivElement>();
  const cardMap = new Map(CARDS.map((card) => [card.id, card]));

  return (
    <section id="about" className="info-cards noise" aria-labelledby="info-heading">
      <div className="info-cards__shell">
        <header ref={headerRef} className="info-cards__header reveal-v2">
          <p className="info-cards__eyebrow">The Science</p>
          <h2 id="info-heading" className="info-cards__title">
            What We Know
          </h2>
          <p className="info-cards__subtitle">
            Explore the structures around a black hole — the visible math of gravity,
            heat, time, and quantum uncertainty. Each topic links to a full guide.
          </p>
        </header>

        <div className="info-cards__grid">
          {GRID_LAYOUT.map((item) => {
            const card = cardMap.get(item.cardId);
            if (!card) return null;

            return (
              <CardCell
                key={card.id}
                card={card}
                span={item.span}
                delayMs={item.delayMs}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
