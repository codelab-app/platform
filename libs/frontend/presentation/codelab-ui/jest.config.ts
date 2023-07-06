/* eslint-disable */
export default {
  displayName: 'frontend-presentation--codelab-ui',
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
  coverageDirectory:
    '../../../../coverage/libs/frontend/presentation/codelab-ui',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-presentation--codelab-ui.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
