module.exports = {
  displayName: 'ddd-modules-users',
  preset: '../../../../jest.preset.js',
  // transform: {
  //   '^.+\\.[tj]sx?$': [
  //     'babel-jest',
  //     { cwd: __dirname, configFile: './babel-jest.config.json' },
  //     // { cwd: __dirname, configFile: './.babelrc' },
  //   ],
  // },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/ddd/modules/users',
}
