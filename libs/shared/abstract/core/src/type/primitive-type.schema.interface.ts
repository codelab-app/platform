import type { JSONSchemaType } from 'ajv'
import { ITypeKind } from '../type-kind.enum'
import { baseTypeSchema } from './base-type.schema.interface'
import type { IPrimitiveTypeDTO } from './primitive-type.dto.interface'

export const primitiveTypeSchema: JSONSchemaType<IPrimitiveTypeDTO> =
  baseTypeSchema(ITypeKind.PrimitiveType)
