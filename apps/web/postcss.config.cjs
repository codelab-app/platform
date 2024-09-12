/**
 * `process.cwd()` points to `apps/web`
 */

// const rootPostCssConfigPath = path.resolve(
//   process.cwd(),
//   '../../scripts/tailwind/postcss.config.cjs',
// )

// console.log({
//   rootPostCssConfigPath,
// })

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const rootPostCssConfig = require(rootPostCssConfigPath)

// console.log(rootPostCssConfig)
/**
 * @type {import('postcss').Config}
 */
const config = {
  plugins: {
    tailwindcss: {},
    // autoprefixer: {},
    'tailwindcss/nesting': {},
    // tailwindcss: {
    //   config: join(__dirname, 'tailwind.config.js'),
    // },
    // // Required for @import for .css files
    // 'postcss-import': {},
    // // Required for scss like rules for .css files
  },
  // ...rootPostCssConfig,
}

module.exports = config
