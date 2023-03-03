import type { ICreateDomainDTO } from '@codelab/frontend/abstract/core'
import {
  hideField,
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
