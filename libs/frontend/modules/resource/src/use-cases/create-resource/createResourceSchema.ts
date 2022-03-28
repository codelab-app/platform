import { AtomType, filterResourceType } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export type CreateResourceInput = {
  name: string
  type: AtomType
  url: string
  queryString: string
}

export const createResourceSchema: JSONSchemaType<CreateResourceInput> = {
  title: 'Create Resource',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    type: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
    queryString: {
      type: 'string',
    },
  },
  required: ['name', 'type', 'url'],
}
