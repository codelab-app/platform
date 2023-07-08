/* eslint-disable */
export default {
  displayName: 'backend-application-tag',
  preset: '../../../../jest.preset.js',
  globals: {},
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
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/backend/application/tag',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-application-tag.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
