/* eslint-disable */
module.exports = {
  displayName: 'frontend-domain-resource',

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      babelConfig: '<rootDir>/.babelrc',
      // https://github.com/kentcdodds/babel-plugin-macros/issues/160
      useESM: true,
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/resource',
  preset: '../../../../jest.preset.ts',
}
