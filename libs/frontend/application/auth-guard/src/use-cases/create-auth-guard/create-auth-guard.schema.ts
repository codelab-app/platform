import type { ICreateAuthGuardData } from '@codelab/frontend/abstract/domain'
import { SelectResource } from '@codelab/frontend/application/type'
import {
  idSchema,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import type { JSONSchemaType } from 'ajv'

export const createAuthGuardSchema: JSONSchemaType<ICreateAuthGuardData> = {
  properties: {
    ...idSchema(),
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    resource: {
      nullable: true,
      properties: {
        id: {
          type: 'string',
          label: '',
          uniforms: {
            component: SelectResource,
          },
        },
      },
      required: ['id'],
      type: 'object',
    },
  },
  required: ['name', ''],
  title: 'Create Auth Guard',
  type: 'object',
} as const
