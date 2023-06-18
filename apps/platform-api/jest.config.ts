/* eslint-disable */
export default {
  displayName: 'platform-api',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/platform-api',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'platform-api.xml',
      },
    ],
  ],
}
