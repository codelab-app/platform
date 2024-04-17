/* eslint-disable */
export default {
  displayName: 'frontend-domain-auth-guard',

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
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/frontend/domain/auth-guard',
  preset: '../../../../jest.preset.ts',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-domain-auth-guard.xml',
        reportTestSuiteErrors: true,
        titleTemplate: '{classname} > {title}',
        ancestorSeparator: ' › ',
        classNameTemplate: '{displayName} > {filename}',
      },
    ],
  ],
}
