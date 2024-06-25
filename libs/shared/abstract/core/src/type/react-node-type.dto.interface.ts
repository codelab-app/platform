import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { BaseTypeDtoSchema } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const ReactNodeTypeDtoSchema = Type.Composite([
  BaseTypeDtoSchema(`${ITypeKind.ReactNodeType}`),
])

export type IReactNodeTypeDto = Static<typeof ReactNodeTypeDtoSchema>

export const ReactNodeTypeSchema = ReactNodeTypeDtoSchema

export type IReactNodeType = Static<typeof ReactNodeTypeSchema>
