import { MonacoField } from '@codelab/frontend/view/components'
import { JSONSchemaType } from 'ajv'

export type UpdateLambdaInput = {
  id: string
  name: string
  body: string
}

export const updateLambdaSchema: JSONSchemaType<UpdateLambdaInput> = {
  title: 'Update Lambda Input',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      disabled: true,
    },
    name: {
      type: 'string',
    },
    body: {
      type: 'string',
      uniforms: { component: MonacoField },
    },
  },
  required: ['id', 'name', 'body'],
}
