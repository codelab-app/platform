import { ICreateComponentDTO } from '@codelab/shared/abstract/core'
import { showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'

export const createComponentSchema: JSONSchemaType<ICreateComponentDTO> = {
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
