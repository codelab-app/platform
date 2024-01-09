import type { JSONSchemaType } from 'ajv'
import { IPrimitiveTypeKind } from '../primitive-type.enum'
import { ITypeKind } from '../type-kind.enum'
import { baseTypeSchema } from './base-type.schema.interface'
import type { IPrimitiveTypeDTO } from './primitive-type.dto.interface'

export const primitiveTypeSchema: JSONSchemaType<IPrimitiveTypeDTO> =
  baseTypeSchema(ITypeKind.PrimitiveType)

/**
 * The above represents a single possible value, this represents the list of options
 */
export const primitiveTypeSelectionSchema: JSONSchemaType<{
  primitiveKind: IPrimitiveTypeKind
}> = {
  type: 'object',
  properties: {
    primitiveKind: {
      title: 'Primitive Kind',
      enum: Object.values(IPrimitiveTypeKind),
      type: 'string',
    },
  },
  required: ['primitiveKind'],
}
