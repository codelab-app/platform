/* eslint-disable */
export default {
  displayName: 'frontend-application-store',
  preset: '../../../../jest.preset.js',
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
  coverageDirectory: '../../../../coverage/libs/frontend/application/store',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-application-store.xml',
        reportTestSuiteErrors: true,
        titleTemplate: '{suitename} > {classname} > {title}',
        ancestorSeparator: ' › ',
        classNameTemplate: '{displayName} - {filename}',
      },
    ],
  ],
}
