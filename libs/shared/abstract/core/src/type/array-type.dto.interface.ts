import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/node-type.interface'
import { IBaseTypeDTO } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IArrayTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.ArrayType}`)),
  Type.Object({
    itemType: Type.Optional(IRef),
  }),
])

export type IArrayTypeDTO = Static<typeof IArrayTypeDTO>

export const IArrayType = IArrayTypeDTO

export type IArrayType = Static<typeof IArrayType>
