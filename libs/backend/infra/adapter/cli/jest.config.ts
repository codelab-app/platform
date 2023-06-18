/* eslint-disable */
export default {
  displayName: 'backend-infra-adapter-cli',
  preset: '../../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../../coverage/libs/backend/infra/adapter/cli',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-infra-adapter-cli.xml',
      },
    ],
  ],
}
