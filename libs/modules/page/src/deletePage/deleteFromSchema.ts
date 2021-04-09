import { JTDDataType } from 'ajv/dist/jtd'

export const DeletePageSchema = {
  title: 'Delete Page aaaaa',
  type: 'object',
  properties: {},
}

export type DeletePageInput = JTDDataType<typeof DeletePageSchema>
