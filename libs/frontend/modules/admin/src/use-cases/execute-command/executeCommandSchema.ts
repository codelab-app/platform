import { ExecuteCommandInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

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
