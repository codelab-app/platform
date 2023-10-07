/* eslint-disable */
export default {
  displayName: 'frontend-application-vercel',
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
  coverageDirectory: '../../../../coverage/libs/frontend/application/vercel',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'frontend-application-vercel.xml',
        reportTestSuiteErrors: true,
        titleTemplate: '{classname} > {title}',
        ancestorSeparator: ' › ',
        classNameTemplate: (vars: any) => {
          return `frontend-application-vercel > ${vars.classname}`
        },
      },
    ],
  ],
}
