const path = require('path')
const colors = require('tailwindcss/colors')
// const { breakpoints } = require('./.codelab.js')

/**
 * This only works if `tailwind.config.js` & `postcss.config.js` are at the project root
 */
module.exports = {
  // mode: 'jit',
  // darkMode: 'class',
  content: [
    path.resolve(process.cwd(), 'apps/landing/**/*.{ts,tsx}'),
    path.resolve(process.cwd(), 'apps/platform/**/*.{ts,tsx}'),
    path.resolve(process.cwd(), 'apps/websites/**/*.{ts,tsx}'),
    path.resolve(process.cwd(), 'libs/**/*.{ts,tsx}'),
  ],
  theme: {
    minWidth: {
      '1/2': '50%',
      '1/3': '33%',
      '2/3': '66%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '70%',
    },
    minHeight: {
      '0': '0px',
      'full': '100%',
      '1/2': '50%',
      '1/3': '33%',
      '2/3': '66%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '70%',
    },
    extend: {
      colors: {
        primary: colors.violet['700'],
      },
      // colors: ({ theme }) => ({
      //   primary: theme('colors.violet')
      // }),
      screens: {
        tablet: '0px',
        laptop: '768px',
        desktop: '1200px',
      },
    },
    fontFamily: {
      display: ['Montserrat'],
      body: ['Nunito'],
    },
    screens: {
      xs: '0px',
      sm: '576px',
      // => @media (min-width: 576px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '992px',
      // => @media (min-width: 992px) { ... }
      xl: '1200px',
      // => @media (min-width: 1200px) { ... }
      '2xl': '1600px',
      // => @media (min-width: 1600px) { ... }
    },
    container: {
      center: true,
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    // Reset adds `background:transparent`, which background-color can't override
    preflight: false,
  },
}
