import { ICreatePageDTO } from '@codelab/shared/abstract/core'
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
    rootElementId: {
      type: 'string',
      nullable: true,
      ...hideField,
    },
    name: {
      type: 'string',
      autoFocus: true,
    },
    appId: {
      type: 'string',
    },
  },
  required: ['name'],
} as const
