/* eslint-disable */
export default {
  displayName: 'backend-domain-user',
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
  coverageDirectory: '../../../../coverage/libs/backend/domain/user',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-domain-user.xml',
      },
    ],
  ],
}
