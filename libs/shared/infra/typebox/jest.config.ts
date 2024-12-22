export default {
  displayName: 'shared-infra-typebox',
  preset: '../../../../jest.preset.js',
  coverageDirectory: '../../../../coverage/libs/shared/infra/typebox',
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
}
