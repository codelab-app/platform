import { ElementTypeKind } from '@codelab/shared/abstract/codegen'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { BaseTypeDtoSchema } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const ElementTypeDtoSchema = Type.Composite([
  BaseTypeDtoSchema(`${ITypeKind.ElementType}`),
  Type.Object({
    elementKind: Type.Enum(ElementTypeKind),
  }),
])

export type IElementTypeDto = Static<typeof ElementTypeDtoSchema>

export const ElementTypeSchema = ElementTypeDtoSchema

export type IElementType = Static<typeof ElementTypeSchema>
