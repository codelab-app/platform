import type { JSONSchemaType } from 'ajv'

import type { IArrayTypeDto } from './array-type.dto.interface'

import { baseTypeSchema } from '../base-type.schema.interface'
import { ITypeKind } from '../type-kind.enum'

export const arrayTypeSchema: JSONSchemaType<IArrayTypeDto> = baseTypeSchema(
  ITypeKind.ArrayType,
) as JSONSchemaType<IArrayTypeDto>
