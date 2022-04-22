import { IUpdateActionDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { createActionSchema } from '../create-action'

export const updateActionSchema: JSONSchemaType<IUpdateActionDTO> = {
  ...createActionSchema,
  title: 'Update Action Input',
} as const
