import { ICreateTagDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const createTagSchema: JSONSchemaType<ICreateTagDTO> = {
  title: 'Create Tag Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    parentTagId: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['name'],
} as const
