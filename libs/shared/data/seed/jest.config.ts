/* eslint-disable */
export default {
  displayName: 'shared-data-seed',
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
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/shared/data/seed',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'shared-data-seed.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
