import type { IUpdateTagDTO } from '@codelab/frontend/abstract/core'
import { idSchema } from '@codelab/frontend/shared/domain'
import type { JSONSchemaType } from 'ajv'

export type UpdateTagSchema = Omit<IUpdateTagDTO, 'parentTag'>

export const updateTagSchema: JSONSchemaType<UpdateTagSchema> = {
  title: 'Update Tag Input',
  type: 'object',
  properties: {
    ...idSchema,
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name'],
} as const
