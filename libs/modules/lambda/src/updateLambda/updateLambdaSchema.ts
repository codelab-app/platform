import { JSONSchemaType } from 'ajv'
import { LongTextField } from 'uniforms-antd'

export type UpdateLambdaInput = {
  name: string
  body: string
}

export const updateLambdaSchema: JSONSchemaType<UpdateLambdaInput> = {
  title: 'Update Lambda Input',
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
