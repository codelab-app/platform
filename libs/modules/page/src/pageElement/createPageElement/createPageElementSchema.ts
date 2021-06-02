import { CreatePageElementInput } from '@codelab/graphql'
import { JSONSchemaType } from 'ajv'

export const createPageElementSchema: JSONSchemaType<CreatePageElementInput> = {
  title: 'Create Page Element Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    atomId: {
      type: 'string',
      nullable: true,
    },
    parentPageElementId: {
      type: 'string',
    },
    order: {
      type: 'integer',
      nullable: true,
    },
  },
  required: ['name', 'parentPageElementId'],
}
