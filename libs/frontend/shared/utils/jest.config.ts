/* eslint-disable */
module.exports = {
  displayName: 'frontend-shared-utils',
  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/shared/utils',
  preset: '../../../../jest.preset.js',
}
