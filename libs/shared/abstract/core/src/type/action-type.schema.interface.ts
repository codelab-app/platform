import type { JSONSchemaType } from 'ajv'
import { ITypeKind } from '../type-kind.enum'
import type { IActionTypeDTO } from './action-type.dto.interface'
import { baseTypeSchema } from './base-type.schema.interface'

export const actionTypeSchema: JSONSchemaType<IActionTypeDTO> = baseTypeSchema(
  ITypeKind.ActionType,
)
