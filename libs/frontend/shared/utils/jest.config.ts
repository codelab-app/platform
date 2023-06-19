/* eslint-disable */
export default {
  displayName: 'frontend-shared-utils',
  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/shared/utils',
  preset: '../../../../jest.preset.js',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-shared-utils.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
