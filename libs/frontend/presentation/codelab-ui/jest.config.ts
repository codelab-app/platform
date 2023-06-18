/* eslint-disable */
export default {
  displayName: 'frontend-presentation--codelab-ui',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../coverage/libs/frontend/presentation/codelab-ui',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-presentation--codelab-ui.xml',
      },
    ],
  ],
}
