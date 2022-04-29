module.exports = {
  displayName: 'cli',
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
    '^.+\\.[tj]s$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2|cypher|cyp)$':
      'jest-transform-stub',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/cli',
  preset: '../../jest.preset.ts',
}
