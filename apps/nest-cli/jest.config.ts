/* eslint-disable */
export default {
  displayName: 'nest-cli',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/nest-cli',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'nest-cli.xml',
      },
    ],
  ],
}
