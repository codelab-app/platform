import type { ICreateDomainData } from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  nonEmptyString,
  refSchema,
} from '@codelab/frontend-presentation-components-form/schema'

export const createDomainSchema: JSONSchemaType<ICreateDomainData> = {
  properties: {
    ...idSchema,
    ...refSchema('app', 'App'),
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
