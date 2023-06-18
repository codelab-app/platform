/* eslint-disable */
export default {
  displayName: 'shared-utils',
  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/shared/utils',
  preset: '../../../jest.preset.js',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'shared-utils.xml',
      },
    ],
  ],
}
