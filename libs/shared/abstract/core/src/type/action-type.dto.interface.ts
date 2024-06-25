import type { Static } from '@sinclair/typebox'
import { BaseTypeDtoSchema } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const ActionTypeDtoSchema = BaseTypeDtoSchema(`${ITypeKind.ActionType}`)

export type IActionTypeDto = Static<typeof ActionTypeDtoSchema>

export const ActionTypeSchema = ActionTypeDtoSchema

export type IActionType = Static<typeof ActionTypeSchema>
