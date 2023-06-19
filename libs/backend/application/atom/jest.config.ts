/* eslint-disable */
export default {
  displayName: 'backend-application-atom',
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
  coverageDirectory: '../../../../coverage/libs/backend/application/atom',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-application-atom.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
