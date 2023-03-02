/* eslint-disable */
module.exports = {
  displayName: 'frontend-domain-builder',
  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/builder',
  preset: '../../../../jest.preset.js',
}
