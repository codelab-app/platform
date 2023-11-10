import {
  interfaceTypeSchema,
  type ITypeDTO,
  ITypeKind,
  primitiveTypeSchema,
} from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createRjsfTypeSchema: JSONSchemaType<ITypeDTO> = {
  type: 'object',
  oneOf: [primitiveTypeSchema, interfaceTypeSchema],
}
