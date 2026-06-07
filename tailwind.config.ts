import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        ui: ['var(--font-ui)'],
        mono: ['var(--font-body)'],
      },
      transitionDuration: {
        '400': '400ms',
      },
      colors: {
        black: 'var(--black)',
        void: 'var(--void)',
        'deep-space': 'var(--deep-space)',
        'nebula-blue': 'var(--nebula-blue)',
        singularity: 'var(--singularity)',
        'accretion-amber': 'var(--accretion-amber)',
        'accretion-orange': 'var(--accretion-orange)',
        'accretion-bright': 'var(--accretion-bright)',
        'accretion-warm': 'var(--accretion-warm)',
        'event-horizon': 'var(--event-horizon)',
        'hawking-glow': 'var(--hawking-glow)',
        'accretion-gold': 'var(--accretion-gold)',
        'plasma-white': 'var(--plasma-white)',
        'ghost-grey': 'var(--ghost-grey)',
        'ghost-muted': 'var(--ghost-muted)',
      },
    },
  },
  plugins: [],
};

export default config;
