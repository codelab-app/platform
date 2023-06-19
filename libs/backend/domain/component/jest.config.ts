/* eslint-disable */
export default {
  displayName: 'backend-domain-component',
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
  coverageDirectory: '../../../../coverage/libs/backend/domain/component',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-domain-component.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
