import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: 'apps/web/next.config.js',
    },
  },
  stories: [
    '../**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../../../libs/frontend/presentation/components/interface-form/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  swc: {
    jsc: {
      experimental: {
        plugins: [['@swc/plugin-styled-components', {}]],
      },
      parser: {
        decorators: true,
        decoratorsBeforeExport: false,
        syntax: 'typescript',
      },
      transform: {
        decoratorMetadata: true,
        legacyDecorator: true,
      },
    },
  },
}

export default config

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
