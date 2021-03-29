import { JTDDataType } from 'ajv/dist/jtd'

export const createAppSchema = {
  title: 'Create App Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}

export type CreateAppInput = JTDDataType<typeof createAppSchema>
