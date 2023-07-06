/* eslint-disable */
export default {
  displayName: 'backend-domain-resource',
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
  coverageDirectory: '../../../../coverage/libs/backend/domain/resource',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-domain-resource.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
