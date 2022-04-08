import { JSONSchemaType } from 'ajv'

export type CreateTagData = {
  name: string
  parentTagId?: string
}

export const createTagSchema: JSONSchemaType<CreateTagData> = {
  title: 'Create Tag Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    parentTagId: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['name'],
} as const
