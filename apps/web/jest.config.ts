module.exports = {
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
    // '^.+\\.[tj]sx?$': 'ts-jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
    // Stub doesn't work with ts-jest
    '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2|cypher|cyp)$':
      'jest-transform-stub',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/apps/web',
  displayName: 'web',
  preset: '../../jest.preset.ts',
}
