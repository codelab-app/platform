import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeMaybeRef } from './any-type.dto.interface'
import { IBaseTypeDTO } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IUnionTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.UnionType}`)),
  Type.Object({
    typesOfUnionType: Type.Array(ITypeMaybeRef),
  }),
])

export type IUnionTypeDTO = Static<typeof IUnionTypeDTO>

export const IUnionType = IUnionTypeDTO

export type IUnionType = Static<typeof IUnionType>
