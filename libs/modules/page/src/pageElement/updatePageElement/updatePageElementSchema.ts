import { UpdatePageElementData } from '@codelab/graphql'
import { JSONSchemaType } from 'ajv'

export const updatePageElementSchema: JSONSchemaType<UpdatePageElementData> = {
  title: 'Update Page Element Input',
  type: 'object',
  properties: {
    atomId: {
      type: 'string',
      nullable: true,
    },
    name: {
      type: 'string',
    },
  },
  required: ['name'],
} as const
