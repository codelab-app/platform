import type { IEntity } from '@codelab/shared/abstract/types'
import type { JSONSchemaType } from 'ajv'

export interface DeleteElementData {
  element: IEntity
}

export const deleteElementSchema: JSONSchemaType<DeleteElementData> = {
  properties: {
    element: {
      properties: {
        id: {
          disabled: true,
          type: 'string',
        },
      },
      required: ['id'],
      type: 'object',
    },
  },
  required: ['element'],
  title: 'Delete Element',
  type: 'object',
}
