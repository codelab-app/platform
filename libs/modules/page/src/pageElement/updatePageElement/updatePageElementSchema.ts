import { UpdatePageElementData } from '@codelab/codegen/graphql'
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
    css: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['name'],
} as const
