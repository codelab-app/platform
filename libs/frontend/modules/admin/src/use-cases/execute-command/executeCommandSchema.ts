import { JSONSchemaType } from 'ajv'

export interface ExecuteCommandInput {
  command: string
}

export const executeCommandSchema: JSONSchemaType<ExecuteCommandInput> = {
  title: 'Execute Command',
  type: 'object',
  properties: {
    command: {
      autoFocus: true,
      type: 'string',
    },
  },
  required: ['command'],
}
