import type { IUpdateDomainDTO } from '@codelab/frontend/abstract/core'
import {
  hideField,
  nonEmptyString,
  showFieldOnDev,
} from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export const updateDomainSchema: JSONSchemaType<IUpdateDomainData> = {
  properties: {
    ...idSchema,
    app: {
      properties: {
        id: {
          type: 'string',
        },
      },
      type: 'object',
      ...showFieldOnDev(),
      disabled: true,
      required: ['id'],
    },
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
  },
  required: ['name', 'id'],
  title: 'Edit App Input',
  type: 'object',
} as const
