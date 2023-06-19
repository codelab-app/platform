/* eslint-disable */
export default {
  displayName: 'frontend-domain-domain',
  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        babelConfig: '<rootDir>/.babelrc',
        // https://github.com/kentcdodds/babel-plugin-macros/issues/160
        useESM: true,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/domain',
  preset: '../../../../jest.preset.js',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-domain-domain.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
