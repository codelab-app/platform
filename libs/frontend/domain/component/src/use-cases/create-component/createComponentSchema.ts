import type { ICreateComponentDTO } from '@codelab/frontend/abstract/core'
import {
  nonEmptyString,
  showFieldOnDev,
} from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export type CreateComponentSchema = Omit<ICreateComponentData, 'rootElement'>

export const createComponentSchema: JSONSchemaType<CreateComponentSchema> = {
  properties: {
    ...idSchema,
    api: {
      nullable: true,
      type: 'string',
      uniforms: {
        component: () => null,
      },
    },
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
