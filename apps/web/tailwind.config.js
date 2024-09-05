const { join } = require('path')
const path = require('path')
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')

const resolvePath = (file) => path.resolve(__dirname, file)
const rootTailwindConfigPath = resolvePath('../../tailwind.config.js')

module.exports = {
  content: [
    resolvePath(
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [require(rootTailwindConfigPath)],
}
