/* eslint-disable */
export default {
  displayName: 'shared-utils',
  globals: {},
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
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/shared/utils',
  preset: '../../../jest.preset.ts',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'shared-utils.xml',
        reportTestSuiteErrors: true,
        titleTemplate: '{classname} > {title}',
        ancestorSeparator: ' › ',
        classNameTemplate: '{displayName} > {filename}',
      },
    ],
  ],
}
