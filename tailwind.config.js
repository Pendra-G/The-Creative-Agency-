export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: { xs: '375px' },
      colors: {
        // Light world
        paper: '#FFFFFF',
        foreground: '#111111',
        surface: '#F1F0EE',
        surface2: '#E3E2DF',
        line: '#E6E5E2',
        muted: '#8D8D8D',
        subtle: '#B6B6B6',
        // Dark anchors (hero, showcase, work, footer)
        ink: '#0A0A0A',
        carbon: '#111111',
        // Single accent
        accent: '#B15F2C',
        'accent-from': '#CF8047',
        'accent-to': '#97501F',
        // Legacy alias: `bone` still reads as the light surface across the app.
        bone: '#F1F0EE',
      },
      fontFamily: { display: ['Onest', 'sans-serif'], body: ['Onest', 'sans-serif'] },
      letterSpacing: { tightest: '-0.02em' },
      borderRadius: { pill: '9999px', card: '2rem', 'card-sm': '1.25rem', control: '0.875rem' },
      maxWidth: { shell: '88rem' },
      fontSize: { watermark: '13rem' },
      transitionTimingFunction: {
        // The reference's spring feels, as curves.
        reveal: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        word: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
        snap: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
};
