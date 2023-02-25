import type { IEntity } from '@codelab/shared/abstract/types'
import type { JSONSchemaType } from 'ajv'

export interface DeleteElementData {
  element: IEntity
}

export const deleteElementSchema: JSONSchemaType<DeleteElementData> = {
  title: 'Delete Element',
  type: 'object',
  properties: {
    element: {
      type: 'object',
      id: {
        type: 'string',
        disabled: true,
      },
      required: ['id']
    },
  },
  required: ['element'],
}
