/**
 * Dark editorial system.
 *
 * Structure, geometry and type discipline come from the Coinbase analysis:
 * one scarce accent, display at weight 400 with negative tracking, pill
 * interactives, 24px cards, 96px section rhythm, mono on every number.
 * The canvas is inverted — near-black floor, white type, purple as the single
 * voltage — so depth comes from elevation steps and hairlines, never shadow.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: { xs: '375px' },

      colors: {
        /* Surfaces — three steps, used as page rhythm */
        canvas: '#0A0B0D',        // page floor
        surface: '#101216',       // alternating band
        elevated: '#16181C',      // cards sitting on canvas or surface
        'surface-strong': '#1C1F24', // secondary buttons, icon plates, inline fills

        /* Hairlines — depth on dark is a 1px line, not a shadow */
        hairline: '#23262C',
        'hairline-soft': '#191C21',

        /* The single accent. #7C3AED carries white text at 5.7:1;
           #A78BFA is the text-on-dark cut at 7.2:1 on canvas. */
        accent: '#7C3AED',
        'accent-active': '#6D28D9',
        'accent-text': '#A78BFA',
        'accent-disabled': '#332A4A',

        /* Form feedback. Lightened from the source system's #05b169 / #cf202f,
           which are tuned for white canvas and fall under 4.5:1 on near-black.
           These read 11.3:1 and 7.1:1 on canvas. */
        'semantic-up': '#4ADE80',
        'semantic-down': '#F87171',

        /* Type */
        ink: '#0A0B0D',           // on inverted light surfaces
        'ink-body': '#5B616E',    // running text on the light card — 6.2:1 on white
        body: '#A8ACB3',          // default running text on dark — 8.6:1
        muted: '#7C828A',         // secondary — 5.1:1
        'muted-soft': '#5B616E',  // disabled only, never running text
      },

      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },

      /* The full scale, responsive at the token rather than per-component.
         Display runs at 700 — bolder than the source system's 400, at the
         owner's direction. Tracking tightens as weight and size climb so the
         big headings stay dense rather than gappy. */
      fontSize: {
        /* The floor is set by the hero headline, its only consumer: the longer
           of its two lines needs ~319px at 30px, and a 375px screen offers 343.
           Raising this floor wraps that line into four; if the headline ever
           gets shorter, this can go back up. */
        'display-mega': ['clamp(1.875rem, 7vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.035em', fontWeight: '700' }],
        'display-xl':   ['clamp(2.375rem, 5.5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.033em', fontWeight: '700' }],
        'display-lg':   ['clamp(2rem, 4.5vw, 3.25rem)', { lineHeight: '1.03', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-md':   ['clamp(1.75rem, 3.6vw, 2.75rem)', { lineHeight: '1.09', letterSpacing: '-0.028em', fontWeight: '700' }],
        'display-sm':   ['clamp(1.5rem, 2.8vw, 2.25rem)', { lineHeight: '1.12', letterSpacing: '-0.022em', fontWeight: '700' }],
        'title-lg':     ['clamp(1.375rem, 2.2vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.018em', fontWeight: '600' }],
        'title-md':     ['1.125rem', { lineHeight: '1.33', fontWeight: '600' }],
        'title-sm':     ['1rem', { lineHeight: '1.25', fontWeight: '600' }],
        'body-lg':      ['1.125rem', { lineHeight: '1.55' }],
        'body-md':      ['1rem', { lineHeight: '1.5' }],
        'body-sm':      ['0.875rem', { lineHeight: '1.5' }],
        caption:        ['0.8125rem', { lineHeight: '1.5' }],
        'caption-strong': ['0.75rem', { lineHeight: '1.5', fontWeight: '600' }],
        'number-lg':    ['clamp(2rem, 4vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '500' }],
        'number-md':    ['1.125rem', { lineHeight: '1.4', fontWeight: '500' }],
        button:         ['1rem', { lineHeight: '1.15', fontWeight: '600' }],
        'nav-link':     ['0.875rem', { lineHeight: '1.4', fontWeight: '500' }],
      },

      borderRadius: {
        pill: '100px',
        full: '9999px',
        xl: '1.5rem',   // cards, mockups, pricing tiers
        lg: '1rem',
        md: '0.75rem',  // inputs
        sm: '0.5rem',
      },

      spacing: { section: '6rem' },
      maxWidth: { shell: '75rem', measure: '38rem' },

      /* One tier. Real offset, soft blur, neutral — no colored halos. */
      boxShadow: { float: '0 24px 60px -24px rgba(0,0,0,0.8)' },

      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
};
