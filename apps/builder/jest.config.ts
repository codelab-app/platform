// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      babelConfig: '<rootDir>/.babelrc',
      // https://github.com/kentcdodds/babel-plugin-macros/issues/160
      useESM: true,
    },
  },
  // testEnvironment: 'node',
  // Used with ts-jest
  transformIgnorePatterns: [
    'node_modules/(?!(stringify-object|is-regexp|is-obj)/)',
  ],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.(css|scss|sass|less)$': 'jest-preview/transforms/css',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      {
        presets: ['@nrwl/next/babel'],
        // https://github.com/facebook/jest/issues/9814#issuecomment-655164306
        // configFile: path.resolve(__dirname, 'babel.config.json'),
        plugins: [
          '@emotion',
          'macros',
          // For mobx-keystone
          [
            '@babel/plugin-proposal-decorators',
            {
              version: 'legacy',
            },
          ],
          // For mobx-keystone
          [
            '@babel/plugin-proposal-class-properties',
            {
              loose: true,
            },
          ],
          [
            '@babel/plugin-proposal-private-property-in-object',
            {
              loose: true,
            },
          ],
          // This imports antd into our app
          //    [
          //      "import",
          //      {
          //        "libraryName": "antd",
          //        "style": true
          //      }
          //    ]
        ],
        env: {
          development: {
            presets: [
              [
                '@nrwl/next/babel',
                {
                  'preset-react': {
                    runtime: 'automatic',
                    development: true,
                    importSource: '@welldone-software/why-did-you-render',
                  },
                },
              ],
            ],
          },
        },
      },
    ],
    // '^.+\\.[tj]sx?$': 'babel-jest',
    // Stub doesn't work with ts-jest
    '\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2|cypher|cyp)$':
      'jest-transform-stub',
    // '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2|cypher|cyp)$':
    //   '<rootDir>/specs/__mocks__/fileTransform.js',
  },
  moduleNameMapper: {},
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/apps/builder',
  displayName: 'builder',
  preset: '../../jest.preset.ts',
}
