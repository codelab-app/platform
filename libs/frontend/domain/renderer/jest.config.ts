/* eslint-disable */
export default {
  displayName: 'frontend-domain-renderer',
  preset: '../../../../jest.preset.js',
  // globals: {
  //   'ts-jest': {
  //     tsconfig: '<rootDir>/tsconfig.spec.json',
  //     babelConfig: '<rootDir>/.babelrc',
  //     // https://github.com/kentcdodds/babel-plugin-macros/issues/160
  //     useESM: true,
  //   },
  // },
  transform: {
    '^.+.[tj]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript', tsx: true, decorators: true },
          transform: {
            decoratorMetadata: true,
            react: { runtime: 'automatic' },
          },
        },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/renderer',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-domain-renderer.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
