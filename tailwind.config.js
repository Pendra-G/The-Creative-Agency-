export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: { xs: '375px' },
      colors: { ink:'#000000', bone:'#F4F1EA', paper:'#FFFFFF', navy:'#0A1A3A', carbon:'#0C0C0C' },
      // Poppins carries the display headings (rounder, geometric); Roboto stays
      // on body copy where its neutrality is an asset.
      fontFamily: { display:['Poppins','sans-serif'], body:['Roboto','sans-serif'], milk:['Poppins','sans-serif'] },
      letterSpacing: { tightest: '-0.045em' },
    },
  },
};