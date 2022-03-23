import { AtomType, filterResourceType } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export type CreateResourceInput = {
  name: string
  type: AtomType
}

export const createResourceSchema: JSONSchemaType<CreateResourceInput> = {
  title: 'Create Resource',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    type: {
      type: 'string',
      enum: Object.keys(AtomType).filter(
        filterResourceType
      ) as Array<AtomType>,
    },
  },
  required: ['name', 'type'],
}
