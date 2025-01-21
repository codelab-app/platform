import type { StorybookConfig } from '@storybook/nextjs'
import type { Options } from '@swc/core'

import { resolve } from 'path'
import React from 'react'

const storybookConfig: StorybookConfig = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // Required to enable `swc` config below
    '@storybook/addon-webpack5-compiler-swc',
    // 'storybook-css-modules',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  staticDirs: ['../public'],
  stories: [
    // '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../../libs/frontend/presentation/components/interface-form/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    // '../../../libs/frontend/application/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  /**
   * This is not picked up unless certain conditions are met
   *
   * https://github.com/storybookjs/storybook/discussions/26836
   */
  swc: (config: Options): Options => {
    console.log('config', config)

    return {
      ...config,
      jsc: {
        ...config.jsc,
        // keepClassNames: true,
        parser: {
          decorators: true,
          syntax: 'typescript',
          tsx: true,
        },
        transform: {
          decoratorMetadata: true,
          // decoratorVersion: '2022-03',
          legacyDecorator: true,
          // useDefineForClassFields: false,
          react: {
            runtime: 'automatic',
          },
        },
      },
    }
  },
  /**
   * https://github.com/storybookjs/storybook/issues/27175
   */
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: resolve(__dirname, '../tsconfig.storybook.json'),
    },
  },
}

export default storybookConfig

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
