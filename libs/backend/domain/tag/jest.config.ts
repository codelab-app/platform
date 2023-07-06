/* eslint-disable */
export default {
  displayName: 'backend-domain-tag',
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
  coverageDirectory: '../../../../coverage/libs/backend/domain/tag',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-domain-tag.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
