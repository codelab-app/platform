import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { BaseTypeDtoSchema } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const RenderPropTypeDtoSchema = Type.Composite([
  BaseTypeDtoSchema(`${ITypeKind.RenderPropType}`),
])

export type IRenderPropTypeDto = Static<typeof RenderPropTypeDtoSchema>

export const RenderPropTypeSchema = RenderPropTypeDtoSchema

export type IRenderPropType = Static<typeof RenderPropTypeSchema>
