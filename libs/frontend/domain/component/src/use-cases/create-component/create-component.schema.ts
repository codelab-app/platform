import type { ICreateComponentData } from '@codelab/frontend/abstract/core'
import {
  idSchema,
  nonEmptyString,
  ownerSchema,
} from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export type CreateComponentSchema = Omit<
  ICreateComponentData,
  'rootElement' | 'props' | 'api'
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
      autoFocus: true,
      ...nonEmptyString,
    },
  },
  required: ['name', 'owner', 'childrenContainerElement'],
  title: 'Create Component Input',
  type: 'object',
}
