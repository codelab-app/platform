import type { Static, TSchema } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { TypeRefSchema } from '../any-type.dto.interface'
import { BaseTypeDtoSchema } from '../base-type.dto.interface'
import { ITypeKind } from '../type-kind.enum'

export const ArrayTypeDtoSchema = <T extends TSchema>(schema?: T) =>
  Type.Composite([
    BaseTypeDtoSchema(`${ITypeKind.ArrayType}`),
    Type.Object({
      itemType: Type.Optional(TypeRefSchema(schema)),
    }),
    ...(schema ? [schema] : []),
  ])

export type IArrayTypeDto<T extends TSchema = never> = Static<
  ReturnType<typeof ArrayTypeDtoSchema<T>>
>
