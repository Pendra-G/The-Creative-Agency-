export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: { xs: '375px' },
      colors: {
        // Near-black page, cream type, one gold accent. Not pure white/black —
        // the warmth is what stops it reading as a default dark theme.
        ink: '#010101',
        carbon: '#0C0C0C',
        cream: '#FEF9E7',
        gold: '#F5C518',
        // legacy aliases so nothing half-migrated explodes mid-build
        paper: '#FEF9E7',
        foreground: '#FEF9E7',
        surface: '#0C0C0C',
        line: '#242424',
      },
      fontFamily: { display: ['Archivo', 'sans-serif'], body: ['Archivo', 'sans-serif'] },
      letterSpacing: { tightest: '-0.05em', tighter: '-0.03em' },
      borderRadius: { pill: '9999px', card: '1.25rem', control: '0.75rem' },
      maxWidth: { shell: '96rem' },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
        snap: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
};
