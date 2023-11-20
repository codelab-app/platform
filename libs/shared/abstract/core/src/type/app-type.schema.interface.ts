import type { JSONSchemaType } from 'ajv'
import { ITypeKind } from '../type-kind.enum'
import type { IAppTypeDTO } from './app-type.dto.interface'
import { baseTypeSchema } from './base-type.schema.interface'

export const appTypeSchema: JSONSchemaType<IAppTypeDTO> = baseTypeSchema(
  ITypeKind.ActionType,
)
