import type { JSONSchemaType } from 'ajv'
import { ITypeKind } from '../type-kind.enum'
import type { IArrayTypeDTO } from './array-type.dto.interface'
import { baseTypeSchema } from './base-type.schema.interface'

export const arrayTypeSchema: JSONSchemaType<IArrayTypeDTO> = baseTypeSchema(
  ITypeKind.ArrayType,
)
