import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IBaseTypeDTO } from './base-type.dto.interface'

export const IActionTypeDTO = IBaseTypeDTO(
  Type.Literal(`${ITypeKind.ActionType}`),
)

export type IActionTypeDTO = Static<typeof IActionTypeDTO>
