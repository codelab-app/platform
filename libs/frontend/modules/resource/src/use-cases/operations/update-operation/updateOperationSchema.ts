import { IUpdateOperationDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { createOperationSchema } from '../create-operation'

export const updateOperationSchema: JSONSchemaType<IUpdateOperationDTO> = {
  ...createOperationSchema,
  title: 'Update Operation Input',
} as const
