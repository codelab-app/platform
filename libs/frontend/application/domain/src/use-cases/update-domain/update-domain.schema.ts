import type { IUpdateDomainData } from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  nonEmptyString,
  refSchema,
} from '@codelab/frontend-presentation-components-form/schema'

export const updateDomainSchema: JSONSchemaType<IUpdateDomainData> = {
  properties: {
    ...idSchema,
    ...refSchema('app', 'App'),
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
  },
  required: ['name', 'id'],
  title: 'Edit App Input',
  type: 'object',
} as const
