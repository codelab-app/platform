import type { JSONSchemaType } from 'ajv'
import { ITypeKind } from '../type-kind.enum'
import { baseTypeSchema } from './base-type.schema.interface'
import type { IEnumTypeDTO } from './enum-type.dto.interface'

export const enumTypeSchema: JSONSchemaType<IEnumTypeDTO> = baseTypeSchema(
  ITypeKind.EnumType,
)
