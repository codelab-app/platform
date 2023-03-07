import type { ICreateDomainData } from '@codelab/frontend/abstract/core'
import {
  idSchema,
  nonEmptyString,
  showFieldOnDev,
} from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export const createDomainSchema: JSONSchemaType<ICreateDomainData> = {
  properties: {
    ...idSchema,
    app: {
      properties: {
        id: {
          disabled: true,
          type: 'string',
          ...showFieldOnDev(),
        },
      },
      required: ['id'],
      type: 'object',
    },
    name: {
      autoFocus: true,
      format: 'hostname',
      ...nonEmptyString,
    },
  },
  required: ['name'],
  title: 'Create Domain Input',
  type: 'object',
} as const
