/* eslint-disable */
export default {
  displayName: 'backend-domain-element',
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
  coverageDirectory: '../../../../coverage/libs/backend/domain/element',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-domain-element.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
