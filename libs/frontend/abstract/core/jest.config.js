const {
  modifyJestConfig,
} = require('../../../../scripts/jest/modifyJestConfig')

module.exports = modifyJestConfig({
  displayName: 'frontend-abstract-core',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/abstract/core',
})
