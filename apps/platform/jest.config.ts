/* eslint-disable */
export default {
  globals: {},
  // testEnvironment: 'node',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      {
        presets: ['@nx/next/babel'],
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
  coverageDirectory: '../../coverage/apps/platform',
  displayName: 'platform',
  preset: '../../jest.preset.js',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'platform.xml',
      },
    ],
  ],
}
