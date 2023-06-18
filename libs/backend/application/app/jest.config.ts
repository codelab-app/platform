/* eslint-disable */
export default {
  displayName: 'backend-application-app',
  preset: '../../../../jest.preset.js',
  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/backend/application/app',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-application-app.xml',
      },
    ],
  ],
}
