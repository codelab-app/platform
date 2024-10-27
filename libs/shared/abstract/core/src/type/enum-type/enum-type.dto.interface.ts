import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { BaseTypeDtoSchema } from '../base-type.dto.interface'
import { ITypeKind } from '../type-kind.enum'

export const EnumTypeValueDtoSchema = Type.Object({
  id: Type.String(),
  key: Type.String(),
  value: Type.String(),
})

export type IEnumTypeValueDto = Static<typeof EnumTypeValueDtoSchema>

export const EnumTypeDtoSchema = Type.Composite([
  BaseTypeDtoSchema(`${ITypeKind.EnumType}`),
  Type.Object({
    allowedValues: Type.Array(EnumTypeValueDtoSchema),
  }),
])

export type IEnumTypeDto = Static<typeof EnumTypeDtoSchema>

export const EnumTypeSchema = EnumTypeDtoSchema

export type IEnumType = Static<typeof EnumTypeSchema>
