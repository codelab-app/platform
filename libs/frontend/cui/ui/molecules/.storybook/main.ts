import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'
import tailwindcss from 'tailwindcss'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-themes',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
  ],

  docs: {},

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  viteFinal: async (finalConfig) => {
    const tailwindConfig = path.resolve(__dirname, './tailwind.config.js')

    return mergeConfig(finalConfig, {
      css: {
        //   // postcss: require('../../../../../../postcss.config.js'),
        postcss: {
          plugins: [
            // This is picking the workspace root tailwind
            tailwindcss({
              config: tailwindConfig,
            }),
          ],
        },
      },
      plugins: [nxViteTsPaths()],
    })
  },
}

export default config

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
