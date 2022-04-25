const {
  modifyJestConfig,
} = require('../../../../scripts/jest/modifyJestConfig')

module.exports = modifyJestConfig({
  displayName: 'frontend-shared-utils',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/shared/utils',
})
