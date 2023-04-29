/* eslint-disable */
module.exports = {
  displayName: 'frontend-domain-tag',

  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/tag',
  preset: '../../../../jest.preset.js',
};
