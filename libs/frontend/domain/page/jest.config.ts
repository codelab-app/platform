/* eslint-disable */
export default {
  displayName: 'frontend-domain-page',

  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/page',
  preset: '../../../../jest.preset.js',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-domain-page.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
