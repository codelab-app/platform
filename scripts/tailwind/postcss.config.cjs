/**
 * @type {import('postcss').Config}
 */
module.exports = {
  plugins: {
    // autoprefixer: {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    // tailwindcss: {
    //   config: join(__dirname, 'tailwind.config.js'),
    // },
    // // Required for @import for .css files
    // 'postcss-import': {},
    // // Required for scss like rules for .css files
  },
  // plugins: [require('tailwindcss'), require('tailwindcss/nesting')],
}
