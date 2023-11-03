const tailwindConfig = require('../../tailwind.config.js')
const { join } = require('path')
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')

console.log(__dirname)

module.exports = {
  ...tailwindConfig,
  content: [
    join(__dirname, '{src,pages}/**/*.{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
}
