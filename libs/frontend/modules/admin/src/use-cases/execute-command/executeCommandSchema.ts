import { IExecuteCommandDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const executeCommandSchema: JSONSchemaType<IExecuteCommandDTO> = {
  title: 'Execute Command input',
  type: 'object',
  properties: {
    command: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['command'],
} as const
