/* eslint-disable */
export default {
  displayName: 'backend-domain-store',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/backend/domain/store',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-domain-store.xml',
      },
    ],
  ],
}
