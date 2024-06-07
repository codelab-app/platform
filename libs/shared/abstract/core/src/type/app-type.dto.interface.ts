import type { Static } from '@sinclair/typebox'
import { BaseTypeDtoSchema } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const AppTypeDtoSchema = BaseTypeDtoSchema(`${ITypeKind.AppType}`)

export type IAppTypeDto = Static<typeof AppTypeDtoSchema>

export const AppTypeSchema = AppTypeDtoSchema

export type IAppType = Static<typeof AppTypeSchema>
