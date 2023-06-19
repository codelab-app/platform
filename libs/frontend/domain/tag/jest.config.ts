/* eslint-disable */
export default {
  displayName: 'frontend-domain-tag',

  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/tag',
  preset: '../../../../jest.preset.js',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-domain-tag.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
