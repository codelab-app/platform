import { type Static, Type } from '@sinclair/typebox'

import { BaseTypeDtoSchema } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const LambdaTypeDtoSchema = Type.Composite([
  BaseTypeDtoSchema(`${ITypeKind.LambdaType}`),
])

export type ILambdaTypeDto = Static<typeof LambdaTypeDtoSchema>

export const LambdaTypeSchema = LambdaTypeDtoSchema

export type ILambdaType = Static<typeof LambdaTypeSchema>
