module.exports = {
  displayName: 'ui-d3',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      { cwd: __dirname, configFile: './babel-jest.config.json' },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/ui/d3',
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(d3)/)'],
}
