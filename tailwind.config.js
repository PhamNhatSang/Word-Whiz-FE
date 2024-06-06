/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],

});
