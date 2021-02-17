import { CustomKey } from '@tsed/schema'

export const JsonSchemaQuickJumperDependencies = () => {
  return CustomKey('dependencies', {
    showQuickJumper: {
      oneOf: [
        {
          type: 'object',
          properties: {
            showQuickJumper: {
              enum: [false],
            },
          },
        },
        {
          type: 'object',
          properties: {
            showQuickJumper: {
              enum: [true],
            },
            goButton: {
              type: 'string',
            },
          },
        },
      ],
    },
  })
}
