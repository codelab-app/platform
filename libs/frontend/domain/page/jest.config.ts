/* eslint-disable */
module.exports = {
  displayName: 'frontend-domain-page',

  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/page',
  preset: '../../../../jest.preset.js',
};
