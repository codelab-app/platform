import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/ref.interface'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IArrayTypeDto = Type.Composite([
  IBaseTypeDto(Type.Literal(`${ITypeKind.ArrayType}`)),
  Type.Object({
    itemType: Type.Optional(IRef),
  }),
])

export type IArrayTypeDto = Static<typeof IArrayTypeDto>

export const IArrayType = IArrayTypeDto

export type IArrayType = Static<typeof IArrayType>
