/* eslint-disable */
module.exports = {
  displayName: 'frontend-domain-admin',
  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/admin',
  preset: '../../../../jest.preset.js',
};
