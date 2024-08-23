import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],

  viteFinal: async (conf) =>
    mergeConfig(conf, {
      plugins: [nxViteTsPaths()],
    }),

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}

export default config

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
