import { JSONSchemaType } from 'ajv'

export type CreateAtomInput = {
  type: string
  props: Array<string>
}

export const createAtomSchema: JSONSchemaType<CreateAtomInput> = {
  title: 'Create Atom Input',
  type: 'object',
  properties: {
    type: {
      type: 'string',
    },
    props: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['type', 'props'],
} as const
