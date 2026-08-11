export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: { xs: '375px' },
      colors: {
        ink: '#010101',
        carbon: '#0B0B0C',
        line: '#1F1F22',
        // Purple carries every accent and gradient on the site.
        accent: '#A78BFA',
        'accent-mid': '#8B5CF6',
        'accent-deep': '#5B21B6',
      },
      fontFamily: { display: ['Archivo', 'sans-serif'], body: ['Archivo', 'sans-serif'] },
      letterSpacing: { tightest: '-0.05em', tighter: '-0.03em' },
      borderRadius: { pill: '9999px', card: '1.25rem', control: '0.75rem' },
      maxWidth: { shell: '96rem' },
      backgroundImage: {
        'accent-grad': 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 45%, #5B21B6 100%)',
        'accent-glow': 'radial-gradient(60% 60% at 50% 40%, rgba(139,92,246,0.35) 0%, rgba(1,1,1,0) 70%)',
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
        snap: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
};
