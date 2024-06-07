import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { BaseTypeDtoSchema } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const ArrayTypeDtoSchema = Type.Composite([
  BaseTypeDtoSchema(`${ITypeKind.ArrayType}`),
  Type.Object({
    itemType: Type.Optional(Typebox.Ref),
  }),
])

export type IArrayTypeDto = Static<typeof ArrayTypeDtoSchema>

export const ArrayTypeSchema = ArrayTypeDtoSchema

export type IArrayType = Static<typeof ArrayTypeSchema>
