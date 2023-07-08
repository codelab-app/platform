/* eslint-disable */
export default {
  displayName: 'frontend-domain-app',
  preset: '../../../../jest.preset.js',
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
  coverageDirectory: '../../../../coverage/libs/frontend/domain/app',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-domain-app.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
