import type { JSONSchemaType } from 'ajv'
import { ITypeKind } from '../type-kind.enum'
import { baseTypeSchema } from './base-type.schema.interface'
import type { IElementTypeDTO } from './element-type.dto.interface'

export const elementTypeSchema: JSONSchemaType<IElementTypeDTO> =
  baseTypeSchema(ITypeKind.ElementType)
