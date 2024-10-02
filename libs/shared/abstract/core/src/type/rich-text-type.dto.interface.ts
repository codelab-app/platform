import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { BaseTypeDtoSchema } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const RichTextTypeDtoSchema = Type.Composite([
  BaseTypeDtoSchema(`${ITypeKind.RichTextType}`),
])

export type IRichTextTypeDto = Static<typeof RichTextTypeDtoSchema>

export const RichTextTypeSchema = RichTextTypeDtoSchema

export type IRichTextType = Static<typeof RichTextTypeSchema>
