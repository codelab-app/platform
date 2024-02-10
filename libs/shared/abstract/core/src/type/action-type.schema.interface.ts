import type { JSONSchemaType } from 'ajv'
import type { IActionTypeDTO } from './action-type.dto.interface'
import { baseTypeSchema } from './base-type.schema.interface'
import { ITypeKind } from './type-kind.enum'

export const actionTypeSchema: JSONSchemaType<IActionTypeDTO> = baseTypeSchema(
  ITypeKind.ActionType,
)
