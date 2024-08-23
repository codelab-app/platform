import type { StorybookConfig } from '@storybook/nextjs'

const storybookConfig: StorybookConfig = {
  addons: ['@storybook/addon-essentials', // 'storybook-css-modules',
  '@storybook/addon-interactions', '@chromatic-com/storybook'],

  babel: async (options) => ({
    ...options,
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
    presets: [...(options.presets || []), 'next/babel'],
  }),

  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        // Experimental but not working, instead we add babel config above for decorator
        // useSWC: true,
      },
    },
  },

  stories: ['../stories/**/*.@(mdx|stories.@(js|jsx|ts|tsx))', '../../../libs/frontend/application/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}

export default storybookConfig

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
