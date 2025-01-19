import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
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
    '../**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../../../libs/frontend/presentation/components/interface-form/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  /**
   * This is not picked up unless certain conditions are met
   *
   * https://github.com/storybookjs/storybook/discussions/26836
   */
  // swc: (config: Options, options: Options): Options => {
  //   return {
  //     ...config,
  //     // https://github.com/swc-project/swc/issues/2117
  //     jsc: {
  //       ...config.jsc,
  //       keepClassNames: true,
  //       parser: {
  //         decorators: true,
  //         syntax: 'typescript',
  //       },
  //       target: 'es2018',
  //       transform: {
  //         decoratorMetadata: true,
  //         legacyDecorator: true,
  //         useDefineForClassFields: false,
  //       },
  //     },
  //   }
  // },
  /**
   * https://github.com/storybookjs/storybook/issues/27175
   */
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    // reactDocgenTypescriptOptions: {
    //   tsconfigPath: resolve(__dirname, '../tsconfig.storybook.json'),
    // },
  },
  webpackFinal: async (config) => {
    // Modify webpack config
    if (config.module?.rules) {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'swc-loader',
            options: {
              jsc: {
                keepClassNames: true,
                parser: {
                  decorators: true,
                  syntax: 'typescript',
                },
                target: 'es2018',
                transform: {
                  decoratorMetadata: true,
                  legacyDecorator: true,
                  useDefineForClassFields: false,
                },
              },
            },
          },
        ],
      })
    }

    return config
  },
}

export default config

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
