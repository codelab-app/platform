import type { IRef } from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import { idSchema } from '@codelab/frontend-presentation-components-form/schema'

export interface DeleteElementData {
  element: IRef
}

export const deleteElementSchema: JSONSchemaType<DeleteElementData> = {
  properties: {
    element: {
      properties: {
        ...idSchema(),
      },
      required: ['id'],
      type: 'object',
    },
  },
  required: ['element'],
  title: 'Delete Element',
  type: 'object',
}
