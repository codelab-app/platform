/* eslint-disable */
export default {
  displayName: 'backend-infra-core',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/backend/infra/core',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-infra-core.xml',
      },
    ],
  ],
}
