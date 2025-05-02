export default {
  coverageDirectory: '../../coverage/apps/web',
  displayName: 'web',
  globals: {},
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  moduleNameMapper: {},
  preset: '../../jest.preset.js',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        ancestorSeparator: ' › ',
        classNameTemplate: '{displayName} > {filename}',
        outputName: 'web.xml',
        reportTestSuiteErrors: true,
        titleTemplate: '{classname} > {title}',
      },
    ],
  ],
  // testEnvironment: 'node',
  transform: {
    '^.+.[tj]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { decorators: true, syntax: 'typescript', tsx: true },
          transform: {
            decoratorMetadata: true,
            react: { runtime: 'automatic' },
          },
        },
      },
    ],
  },
}
