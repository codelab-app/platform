import { JTDDataType } from 'ajv/dist/jtd'

export const editAppSchema = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}

export type EditAppInput = JTDDataType<typeof editAppSchema>
