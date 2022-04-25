const {
  modifyJestConfig,
} = require('../../../../scripts/jest/modifyJestConfig')

module.exports = modifyJestConfig({
  displayName: 'frontend-modules-builder',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  ...modifyJestConfig(),
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/modules/builder',
})
