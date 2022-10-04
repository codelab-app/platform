import { ICreateTagDTO } from '@codelab/frontend/abstract/core'
import { showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'

export const createTagSchema: JSONSchemaType<ICreateTagDTO> = {
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
    auth0Id: {
      type: 'string',
      nullable: true,
      disabled: true,
      ...showFieldOnDev(),
    },
  },
  required: ['name'],
} as const
