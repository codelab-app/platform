import { JSONSchemaType } from 'ajv'

export type UpdatePropTypeCInput = {
  label: string
}

export const UpdatePropTypeCSchema: JSONSchemaType<UpdatePropTypeCInput> = {
  title: 'Update PropTypeC',
  type: 'object',
  properties: {
    label: {
      type: 'string',
    },
  },
  required: ['label'],
}
