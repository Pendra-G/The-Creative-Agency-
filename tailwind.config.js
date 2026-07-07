export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { ink:'#000000', bone:'#F4F1EA', paper:'#FFFFFF', navy:'#0A1A3A', carbon:'#0C0C0C' },
      fontFamily: { display:['"Space Grotesk"','sans-serif'], body:['Inter','sans-serif'], milk:['"Lilita One"','"Space Grotesk"','sans-serif'] },
      letterSpacing: { tightest: '-0.045em' },
    },
  },
};