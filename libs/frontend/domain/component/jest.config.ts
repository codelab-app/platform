/* eslint-disable */
module.exports = {
  displayName: 'frontend-domain-component',

  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/component',
  preset: '../../../../jest.preset.js',
};
