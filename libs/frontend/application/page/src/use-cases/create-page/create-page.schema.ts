import type { ICreatePageData } from '@codelab/frontend/abstract/domain'
import { SelectAuthGuard } from '@codelab/frontend/application/type'
import {
  appSchema,
  idSchema,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import type { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<Omit<ICreatePageData, 'kind'>> = {
  properties: {
    ...idSchema(),
    ...appSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    authGuard: {
      nullable: true,
      properties: {
        id: {
          type: 'string',
          label: '',
          uniforms: {
            component: SelectAuthGuard,
          },
        },
      },
      required: ['id'],
      type: 'object',
    },
    url: {
      type: 'string',
      label: 'Deployed Page URL',
      help: 'Leave blank to autogenerate value',
    },
  },
  required: ['name'],
  title: 'Create Page Input',
  type: 'object',
} as const
