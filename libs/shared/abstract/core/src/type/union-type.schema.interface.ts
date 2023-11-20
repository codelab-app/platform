import type { JSONSchemaType } from 'ajv'
import { ITypeKind } from '../type-kind.enum'
import { baseTypeSchema } from './base-type.schema.interface'
import type { IUnionTypeDTO } from './union-type.dto.interface'

export const unionTypeSchema: JSONSchemaType<IUnionTypeDTO> = baseTypeSchema(
  ITypeKind.UnionType,
)
