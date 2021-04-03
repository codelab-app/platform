import { JTDDataType } from 'ajv/dist/jtd'

export const createAtomSchema = {
  title: 'Create Atom Input',
  type: 'object',
  properties: {
    type: {
      type: 'string',
    },
  },
  required: ['type'],
}

export type CreateAtomInput = JTDDataType<typeof createAtomSchema>
