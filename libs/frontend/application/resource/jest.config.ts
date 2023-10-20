/* eslint-disable */
export default {
  displayName: 'frontend-application-resource',
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
  coverageDirectory: '../../../../coverage/libs/frontend/application/resource',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-application-resource.xml',
        reportTestSuiteErrors: true,
        titleTemplate: '{classname} > {title}',
        ancestorSeparator: ' › ',
        classNameTemplate: (vars: any) => {
          return `frontend-application-resource > ${vars.classname}`
        },
      },
    ],
  ],
}
