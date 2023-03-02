import type { ICreateTagDTO } from '@codelab/frontend/abstract/core'
import {
  nonEmptyString,
  showFieldOnDev,
} from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export const createTagSchema: JSONSchemaType<ICreateTagDTO> = {
  title: 'Create Tag Input',
  type: 'object',
  properties: {
    name: {
      autoFocus: true,
      ...nonEmptyString,
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
