/* eslint-disable */
export default {
  displayName: 'backend-application-field',
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
  coverageDirectory: '../../../../coverage/libs/backend/application/field',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-application-field.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
