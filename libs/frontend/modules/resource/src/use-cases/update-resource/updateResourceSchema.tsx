import { AtomType, filterResourceType } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export type UpdateResourceInput = {
  name: string
  type: AtomType
}

export const updateResourceSchema: JSONSchemaType<UpdateResourceInput> = {
  title: 'Update Resource',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    type: {
      type: 'string',
      enum: Object.keys(AtomType).filter(filterResourceType) as Array<AtomType>,
    },
  },
  required: ['name', 'type'],
}
