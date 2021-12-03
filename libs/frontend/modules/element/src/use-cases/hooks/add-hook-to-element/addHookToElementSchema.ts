import { SelectAtomTypeHook } from '@codelab/frontend/modules/type'
import { JSONSchemaType } from 'ajv'
import { AddHookToElementMutationInput } from './types'

export const addHookToElementSchema: JSONSchemaType<AddHookToElementMutationInput> =
  {
    title: 'Add hook to element input',
    type: 'object',
    properties: {
      typeId: {
        type: 'string',
        uniforms: {
          component: SelectAtomTypeHook,
        },
      },
    },
    required: ['typeId'],
  }
