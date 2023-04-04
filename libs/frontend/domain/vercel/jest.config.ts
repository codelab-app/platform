/* eslint-disable */
export default {
  displayName: 'frontend-domain-vercel',
  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        babelConfig: '<rootDir>/.babelrc',
        // https://github.com/kentcdodds/babel-plugin-macros/issues/160
        useESM: true,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/vercel',
  preset: '../../../../jest.preset.js',
}
