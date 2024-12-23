import type { Static, TSchema } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { TypeRefSchema } from '../any-type.dto.interface'
import { BaseTypeDtoSchema } from '../base-type.dto.interface'
import { ITypeKind } from '../type-kind.enum'

export const UnionTypeDtoSchema = <T extends TSchema>(schema?: T) =>
  Type.Composite([
    BaseTypeDtoSchema(`${ITypeKind.UnionType}`),
    Type.Object({
      typesOfUnionType: Type.Array(TypeRefSchema(schema)),
    }),
    ...(schema ? [schema] : []),
  ])

export type IUnionTypeDto<T extends TSchema = never> = Static<
  ReturnType<typeof UnionTypeDtoSchema<T>>
>

export const UnionTypeSchema = UnionTypeDtoSchema

export type IUnionType<T extends TSchema = never> = Static<
  ReturnType<typeof UnionTypeSchema<T>>
>
