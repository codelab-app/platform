import { JSONSchemaType } from 'ajv'

export type CreatePropTypeCInput = {
  label: string
  library: string
}

export const createPropTypeCSchema: JSONSchemaType<CreatePropTypeCInput> = {
  title: 'Create PropType Collection',
  type: 'object',
  properties: {
    label: {
      type: 'string',
    },
    library: {
      type: 'string',
    },
  },
  required: ['label', 'library'],
} as const
