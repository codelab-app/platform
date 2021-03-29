import { JTDDataType } from 'ajv/dist/jtd'

export const UpdatePageSchema = {
  title: 'Update Page',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}

export type UpdatePageInput = JTDDataType<typeof UpdatePageSchema>
