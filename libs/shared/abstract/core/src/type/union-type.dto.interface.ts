import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IAnyBaseType } from './any-type.dto.interface'
import { IBaseTypeDTO } from './base-type.dto.interface'

export const IUnionTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.UnionType}`)),
  Type.Object({
    typesOfUnionType: Type.Array(IAnyBaseType),
  }),
])

export type IUnionTypeDTO = Static<typeof IUnionTypeDTO>
