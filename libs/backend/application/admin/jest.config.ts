/* eslint-disable */
export default {
  displayName: 'backend-application-admin',
  preset: '../../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/backend/application/admin',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-application-admin.xml',
      },
    ],
  ],
}
