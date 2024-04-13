/* eslint-disable */
export default {
  displayName: 'backend-application-redirect',
  preset: '../../../../jest.preset.ts',
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
  moduleFileExtensions: ['ts', 'js', 'html', 'node'],
  coverageDirectory: '../../../../coverage/libs/backend/application/redirect',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-application-redirect.xml',
        reportTestSuiteErrors: true,
        titleTemplate: '{classname} > {title}',
        ancestorSeparator: ' › ',
        classNameTemplate: '{displayName} > {filename}',
      },
    ],
  ],
}
