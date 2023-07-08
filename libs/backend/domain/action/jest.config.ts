/* eslint-disable */
export default {
  displayName: 'backend-domain-action',
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
  coverageDirectory: '../../../../coverage/libs/backend/domain/action',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-domain-action.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
