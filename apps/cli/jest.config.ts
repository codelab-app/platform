/* eslint-disable */
module.exports = {
  displayName: 'cli',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      babelConfig: '<rootDir>/.babelrc',
      // https://github.com/kentcdodds/babel-plugin-macros/issues/160
      useESM: true,
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
    // '^.+\\.[tj]sx?$': [
    //   'babel-jest',
    //   {
    //     configFile: path.resolve(__dirname, '.babelrc'),
    //   },
    // ],
    '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2|cypher|cyp)$':
      'jest-transform-stub',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/cli',
}
