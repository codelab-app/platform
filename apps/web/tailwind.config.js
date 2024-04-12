const tailwindConfig = require('../../tailwind.config.js')
const { join } = require('path')
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')

module.exports = {
  ...tailwindConfig,
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
}
