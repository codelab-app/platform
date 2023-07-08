/* eslint-disable */
export default {
  displayName: 'backend-domain-store',
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
  coverageDirectory: '../../../../coverage/libs/backend/domain/store',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-domain-store.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
