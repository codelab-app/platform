export default {
  displayName: 'frontend-domain-type',
  preset: '../../../../jest.preset.js',
  // globals: {
  //   'ts-jest': {
  //     tsconfig: '<rootDir>/tsconfig.spec.json',
  //     babelConfig: '<rootDir>/.babelrc',
  //     // https://github.com/kentcdodds/babel-plugin-macros/issues/160
  //     useESM: true,
  //   },
  // },
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/type',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-domain-type.xml',
      },
    ],
  ],
}
