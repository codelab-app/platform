/* eslint-disable */
export default {
  displayName: 'frontend-domain-prop',

  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/prop',
  preset: '../../../../jest.preset.js',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-domain-prop.xml',
      },
    ],
  ],
}
