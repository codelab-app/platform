/* eslint-disable */
export default {
  displayName: 'renderer',
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
  coverageDirectory: '../../../../coverage/libs/frontend/domain/renderer',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-domain-renderer.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
