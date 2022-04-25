const {
  modifyJestConfig,
} = require('../../../../scripts/jest/modifyJestConfig')

module.exports = modifyJestConfig({
  displayName: 'tools-plugins-codelab',
  preset: '../../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/tools/plugins/codelab',
  testEnvironment: 'node',
})
