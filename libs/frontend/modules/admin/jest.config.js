const {
  modifyJestConfig,
} = require('../../../../scripts/jest/modifyJestConfig')

module.exports = modifyJestConfig({
  displayName: 'frontend-modules-admin',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/modules/admin',
})
