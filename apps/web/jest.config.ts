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
    // 'babel-jest': {
    //   babelrcFile: '<rootDir>/.babelrc',
    // },
  },
  // testEnvironment: 'node',
  // Used with ts-jest
  // transformIgnorePatterns: [".+\\.(cypher|cyp)$'"],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
    // '^.+\\.[tj]sx?$': 'ts-jest',
    // Stub doesn't work with ts-jest
    '\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2|cypher|cyp)$':
      'jest-transform-stub',
    // '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2|cypher|cyp)$':
    //   '<rootDir>/specs/__mocks__/fileTransform.js',
  },
  moduleNameMapper: {},
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/apps/web',
  displayName: 'web',
  preset: '../../jest.preset.ts',
}
