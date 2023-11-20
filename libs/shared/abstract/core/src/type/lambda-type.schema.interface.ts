import type { JSONSchemaType } from 'ajv'
import { ITypeKind } from '../type-kind.enum'
import { baseTypeSchema } from './base-type.schema.interface'
import type { ILambdaTypeDTO } from './lambda-type.dto.interface'

export const lambdaTypeSchema: JSONSchemaType<ILambdaTypeDTO> = baseTypeSchema(
  ITypeKind.LambdaType,
)
