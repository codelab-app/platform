import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDTO } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IActionTypeDTO = IBaseTypeDTO(
  Type.Literal(`${ITypeKind.ActionType}`),
)

export type IActionTypeDTO = Static<typeof IActionTypeDTO>

export const IActionType = IActionTypeDTO

export type IActionType = Static<typeof IActionType>
