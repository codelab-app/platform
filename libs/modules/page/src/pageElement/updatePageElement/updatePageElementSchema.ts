import { UpdatePageElementData } from '@codelab/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export type UpdatePageElementSchema = Omit<UpdatePageElementData, 'css'>

// css property is handled by the CSS tab
export const updatePageElementSchema: JSONSchemaType<UpdatePageElementSchema> =
  {
    title: 'Update Page Element Input',
    type: 'object',
    properties: {
      atomId: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
      },
    },
    required: ['name'],
  } as const
