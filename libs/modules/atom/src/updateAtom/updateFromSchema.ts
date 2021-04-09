import { JSONSchemaType } from 'ajv'

export type UpdateAtomInput = {
  type: string
}

export const UpdateAtomSchema: JSONSchemaType<UpdateAtomInput> = {
  title: 'Update Atom',
  type: 'object',
  properties: {
    type: {
      type: 'string',
    },
  },
  required: ['type'],
}
