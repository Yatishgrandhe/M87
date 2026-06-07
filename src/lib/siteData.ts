import type { PhotoTopic } from '@/lib/unsplash';

export const SITE_BRAND = {
  name: 'Singularity',
  displayName: 'SINGULARITY',
  tagline: 'Event Horizon Archive',
} as const;

export interface CardData {
  id: string;
  tag: string;
  title: string;
  body: string;
  featured?: boolean;
  accent?: boolean;
  href: string;
  imageTopic: PhotoTopic;
  imageSrc?: string;
  imageAlt?: string;
}

export interface StatData {
  label: string;
  value: number;
  suffix: string;
  unit: string;
  decimals?: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

export interface PageSection {
  id?: string;
  heading: string;
  body: string;
}

export interface SubpageData {
  slug: string;
  path: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  imageTopic: PhotoTopic;
  sections: PageSection[];
}

export const NAV_LINKS = [
  { label: 'Physics', href: '/physics' },
  { label: 'Types', href: '/types' },
  { label: 'Timeline', href: '/timeline' },
  { label: 'Research', href: '/research' },
] as const;

export const CARDS: CardData[] = [
  {
    id: 'what-is',
    tag: 'FUNDAMENTALS',
    title: 'What Is a Black Hole?',
    featured: true,
    accent: true,
    href: '/physics',
    imageTopic: 'singularity',
    body: `A region where gravity is so extreme that nothing — not light — escapes past the event horizon. They form from collapsing massive stars and grow to billions of solar masses at galaxy centers.`,
  },
  {
    id: 'event-horizon',
    tag: 'BOUNDARY',
    title: 'Event Horizon',
    href: '/physics#event-horizon',
    imageTopic: 'gravity',
    body: `The mathematical boundary where escape velocity exceeds light speed. Objects appear frozen and redshifted from outside; inside, all paths lead inward.`,
  },
  {
    id: 'singularity',
    tag: 'CORE',
    title: 'The Singularity',
    href: '/physics#singularity',
    imageTopic: 'cosmos',
    body: `General relativity predicts infinite density at the center — likely a breakdown of our models. Quantum gravity theories aim to replace it with something finite.`,
  },
  {
    id: 'hawking',
    tag: 'QUANTUM EFFECT',
    title: 'Hawking Radiation',
    href: '/research#hawking',
    imageTopic: 'nebula',
    body: `Black holes may emit thermal radiation via quantum effects near the horizon, slowly evaporating over timescales longer than the age of the universe for stellar-mass holes.`,
  },
  {
    id: 'accretion',
    tag: 'STRUCTURE',
    title: 'Accretion Disk',
    accent: true,
    href: '/physics#accretion',
    imageTopic: 'accretion',
    imageSrc: '/frames/25.png',
    imageAlt: 'Glowing accretion disk around a black hole event horizon',
    body: `Infalling matter spirals into a superheated plasma disk, glowing in X-rays. The M87* photon ring is light bent around the hole, not the disk itself.`,
  },
  {
    id: 'time-dilation',
    tag: 'RELATIVITY',
    title: 'Gravitational Time Dilation',
    href: '/physics#time-dilation',
    imageTopic: 'telescope',
    body: `Time runs slower in strong gravity — confirmed by GPS and atomic clocks. Near a black hole the effect becomes extreme, stretching seconds into days.`,
  },
  {
    id: 'spaghettification',
    tag: 'TIDAL FORCES',
    title: 'Spaghettification',
    href: '/physics#spaghettification',
    imageTopic: 'stars',
    body: `Tidal forces stretch objects into thin strands. Stellar-mass holes tear apart far outside the horizon; supermassive ones are gentler at the boundary.`,
  },
  {
    id: 'paradox',
    tag: 'UNSOLVED',
    title: 'The Information Paradox',
    href: '/research#paradox',
    imageTopic: 'galaxy',
    body: `Quantum mechanics says information cannot be destroyed, yet black holes seem to erase it. Resolving this requires a theory of quantum gravity.`,
  },
  {
    id: 'types',
    tag: 'CLASSIFICATION',
    title: 'Four Types of Black Holes',
    href: '/types',
    imageTopic: 'milky-way',
    body: `From stellar-mass remnants to supermassive galaxy cores and theoretical primordial seeds — each class raises distinct observational puzzles.`,
  },
];

export const STATS: StatData[] = [
  { label: 'SOLAR MASSES', value: 6.5, suffix: ' Billion', unit: 'M87* Black Hole Mass', decimals: 1 },
  { label: 'LIGHT YEARS', value: 26000, suffix: '', unit: 'Distance to Sgr A*' },
  { label: 'KM / SECOND', value: 299792, suffix: '', unit: 'Escape Velocity at Horizon' },
  { label: 'SOLAR MASSES', value: 4, suffix: ' Million', unit: 'Milky Way Central Black Hole' },
  { label: 'YEAR', value: 1974, suffix: '', unit: 'Hawking Radiation Proposed' },
  { label: 'KNOWN OBJECTS', value: 10000, suffix: '+', unit: 'Black Holes Catalogued' },
];

export const TIMELINE: TimelineEvent[] = [
  { year: '1687', title: 'Principia Published', desc: 'Newton mathematically describes gravity — the foundation for predicting dark stars.' },
  { year: '1783', title: 'Dark Stars Proposed', desc: 'John Michell suggests stars massive enough that light cannot escape their surface.' },
  { year: '1915', title: 'General Relativity', desc: "Einstein's field equations describe gravity as spacetime curvature. Schwarzschild solves them weeks later." },
  { year: '1939', title: 'Oppenheimer Predicts Collapse', desc: 'J. Robert Oppenheimer & Hartland Snyder show massive stars must collapse to a point.' },
  { year: '1967', title: '"Black Hole" Coined', desc: 'John Wheeler popularizes the term at a New York lecture.' },
  { year: '1974', title: 'Hawking Radiation', desc: 'Stephen Hawking predicts quantum effects cause black holes to emit thermal radiation and slowly evaporate.' },
  { year: '2015', title: 'Gravitational Waves Detected', desc: 'LIGO hears two black holes merge 1.3 billion light years away.' },
  { year: '2019', title: 'M87* Photographed', desc: "Event Horizon Telescope releases the first direct image of a black hole's shadow and photon ring." },
  { year: '2022', title: 'Sgr A* Photographed', desc: "Our galaxy's central black hole imaged for the first time." },
];

export const SUBPAGES: SubpageData[] = [
  {
    slug: 'physics',
    path: '/physics',
    eyebrow: 'General Relativity',
    title: 'Black Hole Physics',
    subtitle: 'Event horizons, spacetime curvature, tidal forces, and the structures we can observe around the most extreme objects in the universe.',
    imageTopic: 'gravity',
    sections: [
      {
        heading: 'What Is a Black Hole?',
        body: `A black hole is a region of spacetime where gravity is so strong that nothing — not particles, not light — can escape once it crosses the event horizon. They are not cosmic vacuum cleaners; they obey the same gravitational rules as any massive object, but concentrate an extraordinary amount of mass into a tiny volume.`,
      },
      {
        id: 'event-horizon',
        heading: 'Event Horizon',
        body: `The event horizon is a boundary, not a physical surface. At the Schwarzschild radius rs = 2GM/c², the escape velocity equals the speed of light. From a distant observer's perspective, infalling matter appears to slow and redshift without ever crossing. Inside the horizon, all future-directed paths point toward the singularity.`,
      },
      {
        id: 'singularity',
        heading: 'The Singularity',
        body: `Classical general relativity predicts a point of infinite density at the center. Physicists treat this as a signal that the theory breaks down. Loop quantum gravity, string theory, and other approaches replace the singularity with a quantum structure — a "bounce," a fuzzball, or something entirely new.`,
      },
      {
        id: 'accretion',
        heading: 'Accretion Disks',
        body: `Matter with angular momentum cannot fall straight in. It forms a disk heated to millions of degrees by friction, emitting X-rays detectable across the cosmos. Active galactic nuclei — powered by supermassive black holes — are among the brightest persistent sources in the universe.`,
      },
      {
        id: 'time-dilation',
        heading: 'Gravitational Time Dilation',
        body: `Clocks run slower in stronger gravitational fields. GPS satellites must account for Earth's weaker effect. Near a black hole, one second for a hovering observer can equal hours or years for someone far away — a real consequence of curved spacetime, not metaphor.`,
      },
      {
        id: 'spaghettification',
        heading: 'Spaghettification',
        body: `Tidal forces — the difference in gravity across an object — stretch anything that falls in. For a 10-solar-mass black hole, spaghettification begins well outside the horizon. Supermassive black holes like M87* have horizons so large that tidal forces at the boundary are surprisingly mild.`,
      },
    ],
  },
  {
    slug: 'types',
    path: '/types',
    eyebrow: 'Classification',
    title: 'Types of Black Holes',
    subtitle: 'From stellar remnants to galaxy-scale engines — how mass, origin, and environment define four distinct classes.',
    imageTopic: 'milky-way',
    sections: [
      {
        heading: 'Stellar-Mass Black Holes (3–100 M☉)',
        body: `Form when a star roughly 20+ times the mass of the Sun exhausts its nuclear fuel and its core collapses. Detected via X-ray binaries — a black hole siphoning matter from a companion star — and since 2015, via gravitational-wave mergers observed by LIGO and Virgo.`,
      },
      {
        heading: 'Intermediate-Mass Black Holes (100–100,000 M☉)',
        body: `The rare "missing link" between stellar and supermassive classes. Candidates have been found in dense star clusters. They may form from runaway stellar collisions or represent the seeds that grew into supermassive black holes.`,
      },
      {
        heading: 'Supermassive Black Holes (10⁶–10¹⁰ M☉)',
        body: `Found at the center of nearly every large galaxy. Sagittarius A* at the Milky Way's core weighs 4 million solar masses. M87* weighs 6.5 billion. How they formed and grew so large so early in cosmic history remains one of astrophysics' great puzzles.`,
      },
      {
        heading: 'Primordial Black Holes (Theoretical)',
        body: `Hypothetical objects that could have formed in the first fraction of a second after the Big Bang from density fluctuations. If they exist at the right mass range, they are a candidate for dark matter — though observational constraints have ruled out most mass ranges.`,
      },
    ],
  },
  {
    slug: 'timeline',
    path: '/timeline',
    eyebrow: 'Observational History',
    title: 'Discovery Timeline',
    subtitle: 'Three centuries from Newtonian "dark stars" to photographed event horizons and gravitational-wave astronomy.',
    imageTopic: 'telescope',
    sections: [
      {
        heading: 'From Theory to Prediction',
        body: `Michell (1783) and Laplace imagined "dark stars" within Newtonian gravity. Einstein's general relativity (1915) reframed gravity as geometry. Karl Schwarzschild found the first exact solution weeks later — describing a mass concentrated at a point, though the term "black hole" would not arrive for half a century.`,
      },
      {
        heading: 'Acceptance and Naming',
        body: `Oppenheimer and Snyder (1939) showed stellar collapse was inevitable for sufficiently massive stars. For decades the idea was treated as mathematical curiosity. John Wheeler coined "black hole" in 1967, and the discovery of pulsars and quasars made collapsed objects impossible to ignore.`,
      },
      {
        id: 'imaging',
        heading: 'The Golden Age of Observation',
        body: `X-ray satellites revealed accreting black holes in binary systems. The Hubble Space Telescope measured stars orbiting invisible masses at galaxy centers. LIGO's 2015 detection of GW150914 proved stellar-mass mergers directly. In 2019 and 2022, the Event Horizon Telescope imaged M87* and Sgr A*.`,
      },
    ],
  },
  {
    slug: 'research',
    path: '/research',
    eyebrow: 'Open Questions',
    title: 'Active Research',
    subtitle: 'Hawking radiation, the information paradox, quantum gravity, and the next generation of observatories.',
    imageTopic: 'nebula',
    sections: [
      {
        id: 'hawking',
        heading: 'Hawking Radiation',
        body: `Stephen Hawking showed in 1974 that quantum effects near the event horizon should cause black holes to emit thermal radiation and lose mass. The effect is negligible for astrophysical black holes but profound theoretically — it links gravity, thermodynamics, and quantum mechanics in one problem.`,
      },
      {
        id: 'paradox',
        heading: 'The Information Paradox',
        body: `If a black hole evaporates into pure thermal radiation, what happened to the quantum information of everything that fell in? This violates unitarity in quantum mechanics. Proposed resolutions include holography, firewalls, remnant scenarios, and soft hair on the horizon — none yet universally accepted.`,
      },
      {
        heading: 'Next-Generation Instruments',
        body: `The Event Horizon Telescope continues to refine images and polarisation maps. LISA, a space-based gravitational-wave observatory, will probe supermassive mergers. JWST and future X-ray missions will trace black hole growth across cosmic time. Each instrument tests general relativity and quantum gravity in new regimes.`,
      },
    ],
  },
];

export const FOOTER_EXPLORE = [
  { label: 'Physics', href: '/physics' },
  { label: 'Types', href: '/types' },
  { label: 'Timeline', href: '/timeline' },
  { label: 'Research', href: '/research' },
] as const;

export const FOOTER_TOPICS = [
  { label: 'Event Horizon', href: '/physics#event-horizon' },
  { label: 'Hawking Radiation', href: '/research#hawking' },
  { label: 'Information Paradox', href: '/research#paradox' },
  { label: 'M87* & Sgr A*', href: '/timeline#imaging' },
] as const;

export const FOOTER_EXTERNAL = [
  { label: 'NASA Black Holes', href: 'https://science.nasa.gov/universe/black-holes/' },
  { label: 'Event Horizon Telescope', href: 'https://eventhorizontelescope.org/' },
  { label: 'LIGO', href: 'https://www.ligo.org/' },
] as const;

export const SEO = {
  title: 'Into the Singularity — Black Hole Science',
  description:
    'Explore black hole physics, types, discovery history, and open research questions. Event horizons, Hawking radiation, M87*, and the unsolved paradoxes of modern astrophysics.',
  keywords: 'black hole, event horizon, singularity, M87, Hawking radiation, general relativity, astrophysics',
};

export function getSubpage(slug: string) {
  return SUBPAGES.find((page) => page.slug === slug);
}
