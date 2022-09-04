/* eslint-disable */
export default {
  displayName: 'frontend-modules-renderer',
  preset: '../../../../jest.preset.ts',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      babelConfig: '<rootDir>/.babelrc',
      // https://github.com/kentcdodds/babel-plugin-macros/issues/160
      useESM: true,
    },
  },
  // Used with ts-jest
  transformIgnorePatterns: [
    'node_modules/(?!(stringify-object|is-regexp|is-obj|cheerio)/)',
  ],
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest'],
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/modules/renderer',
}
