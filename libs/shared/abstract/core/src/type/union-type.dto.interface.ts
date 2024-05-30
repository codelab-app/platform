import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeMaybeRef, TypeMaybeRefSchema } from './any-type.dto.interface'
import { BaseTypeDtoSchema } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const UnionTypeDtoSchema = Type.Composite([
  BaseTypeDtoSchema(`${ITypeKind.UnionType}`),
  Type.Object({
    typesOfUnionType: Type.Array(TypeMaybeRefSchema),
  }),
])

export type IUnionTypeDto = Static<typeof UnionTypeDtoSchema>

export const UnionTypeSchema = UnionTypeDtoSchema

export type IUnionType = Static<typeof UnionTypeSchema>
