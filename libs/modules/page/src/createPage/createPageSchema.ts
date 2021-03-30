import { JTDDataType } from 'ajv/dist/jtd'

export const createPageSchema = {
  title: 'Create Page Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}

export type CreatePageInput = JTDDataType<typeof createPageSchema>
