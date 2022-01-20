import { DeleteElementInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const deleteElementSchema: JSONSchemaType<DeleteElementInput> = {
  title: 'Delete Element',
  type: 'object',
  properties: {
    elementId: {
      type: 'string',
    },
  },
  required: ['elementId'],
}
