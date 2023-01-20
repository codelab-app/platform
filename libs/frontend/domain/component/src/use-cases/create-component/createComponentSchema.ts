import type { ICreateComponentDTO } from '@codelab/frontend/abstract/core'
import { showFieldOnDev } from '@codelab/shared/utils'
import type { JSONSchemaType } from 'ajv'

export const createComponentSchema: JSONSchemaType<
  Omit<ICreateComponentDTO, 'rootElementId'>
> = {
  title: 'Create Component Input',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: () => null,
      },
    },
    api: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: () => null,
      },
    },
    childrenContainerElementId: {
      type: 'string',
      uniforms: {
        component: () => null,
      },
    },
    auth0Id: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
    name: {
      autoFocus: true,
      type: 'string',
    },
  },
  required: ['name', 'auth0Id'],
}
