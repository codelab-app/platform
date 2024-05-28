import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IActionTypeDto = IBaseTypeDto(Type.Literal(ITypeKind.ActionType))

export type IActionTypeDto = Static<typeof IActionTypeDto>

export const IActionType = IActionTypeDto

export type IActionType = Static<typeof IActionType>
