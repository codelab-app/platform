import type { ICreateComponentData } from '@codelab/frontend/abstract/core'
import {
  idSchema,
  ownerSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import type { JSONSchemaType } from 'ajv'

export type CreateComponentSchema = Omit<
  ICreateComponentData,
  'api' | 'props' | 'rootElement' | 'store'
>

export const createComponentSchema: JSONSchemaType<CreateComponentSchema> = {
  properties: {
    ...idSchema,
    // api: {
    //   nullable: true,
    //   type: 'string',
    //   uniforms: {
    //     component: () => null,
    //   },
    // },
    childrenContainerElement: {
      properties: {
        id: {
          type: 'string',
          uniforms: {
            component: () => null,
          },
        },
      },
      required: ['id'],
      type: 'object',
    },
    ...ownerSchema,
    name: {
      type: 'string',
      autoFocus: true,
      ...titleCaseValidation,
    },
  },
  required: ['name', 'owner', 'childrenContainerElement'],
  title: 'Create Component Input',
  type: 'object',
}
