import type { Static, TSchema } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { TypeRefSchema } from '../any-type.dto.interface'
import { BaseTypeDtoSchema } from '../base-type.dto.interface'
import { ITypeKind } from '../type-kind.enum'

export const ArrayTypeDtoSchema = Type.Composite([
  BaseTypeDtoSchema(`${ITypeKind.ArrayType}`),
  Type.Object({
    itemType: Type.Optional(TypeRefSchema),
  }),
])

export type IArrayTypeDto = Static<typeof ArrayTypeDtoSchema>
