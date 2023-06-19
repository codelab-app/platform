/* eslint-disable */
export default {
  displayName: 'backend-application-store',
  preset: '../../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/backend/application/store',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-application-store.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
