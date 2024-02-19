import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IPageTypeDto = Type.Composite([
  IBaseTypeDto(Type.Literal(`${ITypeKind.PageType}`)),
])

export type IPageTypeDto = Static<typeof IPageTypeDto>

export const IPageType = IPageTypeDto

export type IPageType = Static<typeof IPageType>
