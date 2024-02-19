import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeMaybeRef } from './any-type.dto.interface'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IUnionTypeDto = Type.Composite([
  IBaseTypeDto(Type.Literal(`${ITypeKind.UnionType}`)),
  Type.Object({
    typesOfUnionType: Type.Array(ITypeMaybeRef),
  }),
])

export type IUnionTypeDto = Static<typeof IUnionTypeDto>

export const IUnionType = IUnionTypeDto

export type IUnionType = Static<typeof IUnionType>
