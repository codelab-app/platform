import type { ICreateDomainData } from '@codelab/frontend/abstract/core'
import { idSchema } from '@codelab/frontend/shared/domain'
import {
  hideField,
  nonEmptyString,
  showFieldOnDev,
} from '@codelab/frontend/shared/utils'
import type { JSONSchemaType } from 'ajv'

export const createDomainSchema: JSONSchemaType<ICreateDomainData> = {
  title: 'Create Domain Input',
  type: 'object',
  properties: {
    ...idSchema,
    name: {
      autoFocus: true,
      format: 'hostname',
      ...nonEmptyString,
    },
    app: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          disabled: true,
          ...showFieldOnDev(),
        },
      },
      required: ['id'],
    },
  },
  required: ['name'],
} as const
