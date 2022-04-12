import { IUpdateTypeDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { baseTypeMutationSchemaProperties } from '../../../shared'

export const updateTypeSchema: JSONSchemaType<IUpdateTypeDTO> = {
  title: 'Update Type Input',
  type: 'object',
  properties: {
    ...(baseTypeMutationSchemaProperties as any),
  },
  required: ['name'],
}
