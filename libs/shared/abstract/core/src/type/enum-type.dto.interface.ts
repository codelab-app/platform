import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDTO } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IEnumTypeValueDTO = Type.Object({
  id: Type.String(),
  key: Type.String(),
  value: Type.String(),
})

export type IEnumTypeValueDTO = Static<typeof IEnumTypeValueDTO>

export const IEnumTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.EnumType}`)),
  Type.Object({
    allowedValues: Type.Array(IEnumTypeValueDTO),
  }),
])

export type IEnumTypeDTO = Static<typeof IEnumTypeDTO>

export const IEnumType = IEnumTypeDTO

export type IEnumType = Static<typeof IEnumType>
