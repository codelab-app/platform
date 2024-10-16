import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { BaseTypeDtoSchema } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const PageTypeDtoSchema = Type.Composite([
  BaseTypeDtoSchema(`${ITypeKind.PageType}`),
])

export type IPageTypeDto = Static<typeof PageTypeDtoSchema>

export const PageTypeSchema = PageTypeDtoSchema

export type IPageType = Static<typeof PageTypeSchema>
