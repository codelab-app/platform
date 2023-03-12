import type { IUpdateDomainData } from '@codelab/frontend/abstract/core'
import {
  appSchema,
  idSchema,
  nonEmptyString,
} from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export const updateDomainSchema: JSONSchemaType<IUpdateDomainData> = {
  properties: {
    ...idSchema,
    ...appSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
  },
  required: ['name', 'id'],
  title: 'Edit App Input',
  type: 'object',
} as const
