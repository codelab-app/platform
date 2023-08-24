import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IBaseTypeDTO } from './base-type.dto.interface'

export const IPageTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.PageType}`)),
])

export type IPageTypeDTO = Static<typeof IPageTypeDTO>
