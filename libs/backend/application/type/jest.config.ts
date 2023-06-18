/* eslint-disable */
export default {
  displayName: 'backend-application-type',
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
  coverageDirectory: '../../../../coverage/libs/backend/application/type',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-application-type.xml',
      },
    ],
  ],
}
