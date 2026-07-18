export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: { xs: '375px' },
      colors: { ink:'#000000', bone:'#F4F1EA', paper:'#FFFFFF', navy:'#0A1A3A', carbon:'#0C0C0C' },
      fontFamily: { display:['Roboto','sans-serif'], body:['Roboto','sans-serif'], milk:['Roboto','sans-serif'] },
      letterSpacing: { tightest: '-0.045em' },
    },
  },
};