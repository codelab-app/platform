import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IEnumTypeValueDto = Type.Object({
  id: Type.String(),
  key: Type.String(),
  value: Type.String(),
})

export type IEnumTypeValueDto = Static<typeof IEnumTypeValueDto>

export const IEnumTypeDto = Type.Composite([
  IBaseTypeDto(Type.Literal(`${ITypeKind.EnumType}`)),
  Type.Object({
    allowedValues: Type.Array(IEnumTypeValueDto),
  }),
])

export type IEnumTypeDto = Static<typeof IEnumTypeDto>

export const IEnumType = IEnumTypeDto

export type IEnumType = Static<typeof IEnumType>
