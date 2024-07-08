// This is workspace root
import path from 'path'

const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')

const workspaceRootTailwindConfig = path.resolve(
  __dirname,
  '../../../../../../tailwind.config.js',
)

const tailwindConfig = require(workspaceRootTailwindConfig)

module.exports = {
  ...tailwindConfig,
  content: [
    path.resolve(__dirname, '../src/**/*.stories.tsx'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
}
