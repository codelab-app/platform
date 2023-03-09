import type { ICreatePageData } from '@codelab/frontend/abstract/core'
import {
  idSchema,
  nonEmptyString,
  ownerSchema,
  showFieldOnDev,
  titleCaseValidation,
} from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<ICreatePageData> = {
  properties: {
    ...idSchema,
    ...ownerSchema,
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
      ...nonEmptyString,
      ...titleCaseValidation,
    },
  },
  required: ['name'],
  title: 'Create Page Input',
  type: 'object',
} as const
