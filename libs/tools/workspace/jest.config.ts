/* eslint-disable */
export default {
  displayName: 'tools-workspace',
  preset: '../../../jest.preset.js',
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
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/tools/workspace',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'tools-workspace.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
