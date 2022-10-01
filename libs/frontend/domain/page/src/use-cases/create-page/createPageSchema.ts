import { ICreatePageDTO } from '@codelab/frontend/abstract/core'
import { hideField } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<ICreatePageDTO> = {
  title: 'Create Page Input',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: true,
      ...hideField,
    },
    auth0Id: {
      type: 'string',
      nullable: true,
      ...hideField,
    },
    rootElementId: {
      type: 'string',
      nullable: true,
      ...hideField,
    },
    name: {
      type: 'string',
      autoFocus: true,
    },
    slug: {
      type: 'string',
    },
    appId: {
      type: 'string',
    },
  },
  required: ['name', 'slug'],
} as const
