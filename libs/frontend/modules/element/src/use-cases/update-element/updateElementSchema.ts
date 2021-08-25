import { UpdateElementData } from '@codelab/shared/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export type UpdateElementSchemaType = Omit<UpdateElementData, 'css'>

// css property is handled by the CSS tab
export const updateElementSchema: JSONSchemaType<UpdateElementSchemaType> = {
  title: 'Update Element Input',
  type: 'object',
  properties: {
    atomId: {
      type: 'string',
      nullable: true,
    },
    componentId: {
      type: 'string',
      nullable: true,
    },
    name: {
      type: 'string',
      nullable: true,
    },
  },
  required: [],
} as const
