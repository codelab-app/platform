/* eslint-disable */
export default {
  displayName: 'shared-data-seed',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/shared/data/seed',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'shared-data-seed.xml',
      },
    ],
  ],
}
