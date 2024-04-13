/* eslint-disable */
export default {
  displayName: 'backend-infra-adapter-cli',
  preset: '../../../../../jest.preset.ts',
  testEnvironment: 'node',
  transform: {
    '^.+.[tj]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript', tsx: true, decorators: true },
          transform: {
            decoratorMetadata: true,
            react: { runtime: 'automatic' },
          },
        },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../../coverage/libs/backend/infra/adapter/cli',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-infra-adapter-cli.xml',
        reportTestSuiteErrors: true,
        titleTemplate: '{classname} > {title}',
        ancestorSeparator: ' › ',
        classNameTemplate: '{displayName} > {filename}',
      },
    ],
  ],
}
