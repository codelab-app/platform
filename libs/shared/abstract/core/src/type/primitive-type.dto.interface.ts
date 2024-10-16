import type { Static } from '@sinclair/typebox'

import { PrimitiveTypeKind } from '@codelab/shared/infra/gql'
import { Type } from '@sinclair/typebox'

import { BaseTypeDtoSchema } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const PrimitiveTypeDtoSchema = Type.Composite([
  BaseTypeDtoSchema(`${ITypeKind.PrimitiveType}`),
  Type.Object({
    primitiveKind: Type.Enum(PrimitiveTypeKind),
  }),
])

export type IPrimitiveTypeDto = Static<typeof PrimitiveTypeDtoSchema>

export const PrimitiveTypeSchema = PrimitiveTypeDtoSchema

export type IPrimitiveType = Static<typeof PrimitiveTypeSchema>
