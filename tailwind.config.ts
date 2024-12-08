const colors = require('tailwindcss/colors')
const path = require('path')
import type { Config } from 'tailwindcss'
// const { breakpoints } = require('./.codelab.js')

import shadcnTailwindConfig from './scripts/tailwind/shadcn.tailwind.config'

/**
 * This only works if `tailwind.config.js` & `postcss.config.js` are at the project root
 */
const config: Config = {
  content: [],
  presets: [shadcnTailwindConfig],
  plugins: [],
  theme: {
    extend: {
      minHeight: {
        '1/2': '50%',
        '1/3': '33%',
        '2/3': '66%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '70%',
      },
      minWidth: {
        '1/2': '50%',
        '1/3': '33%',
        '2/3': '66%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '70%',
      },
      colors: {},
      // colors: ({ theme }) => {
      //   console.log(theme.colors)
      //   // return {
      //   //   ...theme('colors'),
      //   // }
      // },
      screens: {
        laptop: '768px',
        tablet: '0px',
        desktop: '1200px',
      },
    },
    fontFamily: {
      body: ['Nunito'],
      display: ['Montserrat'],
      mono: ['ui-monospace', 'SFMono-Regular'],
    },
    container: {
      center: true,
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
}

export default config
