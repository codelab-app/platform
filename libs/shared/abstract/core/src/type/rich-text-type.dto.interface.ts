import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IRichTextTypeDto = Type.Composite([
  IBaseTypeDto(Type.Literal(`${ITypeKind.RichTextType}`)),
])

export type IRichTextTypeDto = Static<typeof IRichTextTypeDto>

export const IRichTextType = IRichTextTypeDto

export type IRichTextType = Static<typeof IRichTextType>
