import type { JSONSchemaType } from 'ajv'
import type { IArrayTypeDTO } from './array-type.dto.interface'
import { baseTypeSchema } from './base-type.schema.interface'
import { ITypeKind } from './type-kind.enum'

export const arrayTypeSchema: JSONSchemaType<IArrayTypeDTO> = baseTypeSchema(
  ITypeKind.ArrayType,
)
