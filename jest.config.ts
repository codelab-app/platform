export default {
  displayName: 'codelab',
  preset: './jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': '@swc/jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: './coverage/codelab',
  testMatch: [
    '<rootDir>/.husky/**/*.spec.ts',
  ],
}
