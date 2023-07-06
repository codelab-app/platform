/* eslint-disable */
export default {
  displayName: 'backend-application-component',
  preset: '../../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
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
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/backend/application/component',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-application-component.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
