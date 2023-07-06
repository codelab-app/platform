/* eslint-disable */
export default {
  displayName: 'backend-infra-core',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
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
  coverageDirectory: '../../../../coverage/libs/backend/infra/core',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-infra-core.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
