import { JTDDataType } from 'ajv/dist/jtd'

export const UpdateAtomSchema = {
  title: 'Update Atom',
  type: 'object',
  properties: {
    type: {
      type: 'string',
    },
  },
  required: ['type'],
}

export type UpdateAtomInput = JTDDataType<typeof UpdateAtomSchema>
