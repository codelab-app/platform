export default {
  displayName: 'shared-infra-fetch-server',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest'],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/shared/infra/fetch-server',
}
