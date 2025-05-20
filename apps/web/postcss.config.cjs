const rootPostCssConfig = require('../../postcss.config.cjs')

/**
 * @type {import('postcss').Config}
 */
const config = {
  ...rootPostCssConfig,
  // plugins: {
  //   tailwindcss: {},
  //   // autoprefixer: {},
  //   'tailwindcss/nesting': {},
  //   // tailwindcss: {
  //   //   config: join(__dirname, 'tailwind.config.js'),
  //   // },
  //   // // Required for @import for .css files
  //   // 'postcss-import': {},
  //   // // Required for scss like rules for .css files
  // },
}

module.exports = config
