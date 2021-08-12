import { MonacoField } from '@codelab/frontend/view/components'
import { JSONSchemaType } from 'ajv'

export type CreateLambdaInput = {
  name: string
  body: string
}

export const createLambdaSchema: JSONSchemaType<CreateLambdaInput> = {
  title: 'Create Lambda Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    body: {
      type: 'string',
      uniforms: { component: MonacoField },
    },
  },
  required: ['name', 'body'],
}
