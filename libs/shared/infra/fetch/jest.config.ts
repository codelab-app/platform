export default {
  displayName: 'shared-infra-fetch',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest'],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/shared/infra/fetch',
}