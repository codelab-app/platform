import { AtomType, filterResourceType } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export type CreateResourceInput = {
  name: string
  type: AtomType
  url: string
  queryString: string
  header: string
}

export const initialResourceSchema: JSONSchemaType<CreateResourceInput> = {
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
    header: {
      type: 'string',
    },
  },
  required: ['name', 'type', 'url'],
}
