import type { StorybookConfig } from '@storybook/nextjs'

const storybookConfig: StorybookConfig = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // 'storybook-css-modules',
  ],
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
  stories: [
    '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../../libs/frontend/application/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
}

export default storybookConfig

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
