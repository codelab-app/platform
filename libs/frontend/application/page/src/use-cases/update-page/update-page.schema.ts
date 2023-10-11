import type { IUpdatePageData } from '@codelab/frontend/abstract/domain'
import { SelectAuthGuard } from '@codelab/frontend/application/type'
import {
  appSchema,
  idSchema,
  nonEmptyString,
  pageUrlSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import type { JSONSchemaType } from 'ajv'

export type UpdatePageSchema = Omit<IUpdatePageData, 'pageContentContainer'>

export const updatePageSchema: JSONSchemaType<UpdatePageSchema> = {
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
    ...pageUrlSchema,
  },
  required: ['name', 'app'],
  title: 'Update Page Input',
  type: 'object',
} as const
