/* eslint-disable */
export default {
  displayName: 'frontend-domain-app',
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
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/app',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-domain-app.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
