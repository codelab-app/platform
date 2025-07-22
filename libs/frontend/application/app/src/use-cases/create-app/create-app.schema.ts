'use client'

import type { IAppCreateFormData } from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'
import {
  minLengthMsg,
  requiredMsg,
  titleCasePatternMsg,
} from '@codelab/frontend-shared-utils'

export const createAppSchema: JSONSchemaType<IAppCreateFormData> = {
  properties: {
    ...idSchema(),
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
  },
  errors: {
    name: {
      required: requiredMsg('App name'),
      minLength: minLengthMsg('App name', 1),
      pattern: titleCasePatternMsg('App name'),
    },
  },
  required: ['name', 'id'],
  title: 'Create App Input',
  type: 'object',
} as const
