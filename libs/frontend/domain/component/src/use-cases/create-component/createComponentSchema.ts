import type { ICreateComponentData } from '@codelab/frontend/abstract/core'
import { idSchema, ownerSchema } from '@codelab/frontend/shared/domain'
import { nonEmptyString, showFieldOnDev } from '@codelab/frontend/shared/utils'
import type { JSONSchemaType } from 'ajv'

export type CreateComponentSchema = Omit<ICreateComponentData, 'rootElement'>

export const createComponentSchema: JSONSchemaType<CreateComponentSchema> = {
  title: 'Create Component Input',
  type: 'object',
  properties: {
    ...idSchema,
    api: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: () => null,
      },
    },
    childrenContainerElement: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          uniforms: {
            component: () => null,
          },
        },
      },
      required: ['id'],
    },
    ...ownerSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
  },
  required: ['name', 'owner', 'childrenContainerElement'],
}
