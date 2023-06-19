/* eslint-disable */
export default {
  displayName: 'backend-domain-type',
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
  coverageDirectory: '../../../../coverage/libs/backend/domain/type',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-domain-type.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
