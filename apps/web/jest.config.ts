/* eslint-disable */
export default {
  globals: {},
  // testEnvironment: 'node',
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
  moduleNameMapper: {},
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/apps/web',
  displayName: 'web',
  preset: '../../jest.preset.js',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'web.xml',
        reportTestSuiteErrors: true,
        titleTemplate: '{classname} > {title}',
        ancestorSeparator: ' › ',
        classNameTemplate: '{displayName} > {filename}',
      },
    ],
  ],
}
