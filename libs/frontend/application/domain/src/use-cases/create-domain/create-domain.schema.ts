import type { ICreateDomainData } from '@codelab/frontend/abstract/domain'
import {
  appSchema,
  idSchema,
  nonEmptyString,
} from '@codelab/frontend-presentation-view/components'
import type { JSONSchemaType } from 'ajv'

export const createDomainSchema: JSONSchemaType<ICreateDomainData> = {
  properties: {
    ...idSchema(),
    ...appSchema,
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
