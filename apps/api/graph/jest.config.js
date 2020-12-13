module.exports = {
  displayName: 'api-graph',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'html'],
  coverageDirectory: '../../../coverage/apps/api/graph',
}
