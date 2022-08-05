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
    path.resolve(process.cwd(), 'apps/builder/**/*.{ts,tsx}'),
    path.resolve(process.cwd(), 'libs/**/*.{ts,tsx}'),
  ],
  theme: {
    extend: {
      // colors: {
      //   // purple: '#8344ff',
      // },
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
  },
  variants: {},
  plugins: [],
  corePlugins: {
    // Disable preflight styles in twin
    preflight: false,
  },
}
