/* eslint-disable */
module.exports = {
  displayName: 'frontend-domain-prop',

  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/prop',
  preset: '../../../../jest.preset.js',
}
