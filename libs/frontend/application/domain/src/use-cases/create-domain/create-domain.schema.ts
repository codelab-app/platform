import type { ICreateDomainData } from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import {
  appSchema,
  idSchema,
  nonEmptyString,
} from '@codelab/frontend-presentation-components-form/schema'

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
