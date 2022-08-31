/* eslint-disable */
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
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      {
        presets: ['@nrwl/next/babel'],
        // https://github.com/facebook/jest/issues/9814#issuecomment-655164306
        // configFile: path.resolve(__dirname, 'babel.config.json'),
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
