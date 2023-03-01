import type { IUpdateDomainData } from '@codelab/frontend/abstract/core'
import { idSchema } from '@codelab/frontend/shared/domain'
import {
  hideField,
  nonEmptyString,
  showFieldOnDev,
} from '@codelab/frontend/shared/utils'
import type { JSONSchemaType } from 'ajv'

export const updateDomainSchema: JSONSchemaType<IUpdateDomainData> = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
    ...idSchema,
    app: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
      },
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
} as const
