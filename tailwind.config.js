const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  // darkMode: 'class',
  purge: ['apps/web/pages/**/*.{ts,tsx}', 'libs/**/*.{ts,tsx}'],
  theme: {
    // extend: {
    //   colors,
    // },
  },
  variants: {},
  plugins: [],
  // xwind options
  xwind: {
    mode: 'objectstyles',
    // mode: 'classes',
  },
}
