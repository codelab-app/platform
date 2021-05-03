import { JSONSchemaType } from 'ajv'
import { LongTextField } from 'uniforms-antd'

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
      uniforms: { component: LongTextField },
    },
  },
  required: ['name', 'body'],
}
