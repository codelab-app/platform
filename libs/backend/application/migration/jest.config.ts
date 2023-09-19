/* eslint-disable */
export default {
  displayName: 'backend-application-migration',
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
  coverageDirectory: '../../../../coverage/libs/backend/application/migration',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-application-migration.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
