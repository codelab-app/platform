import { ElementTypeKind } from '@codelab/shared/abstract/codegen'
import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IBaseTypeDTO } from './base-type.dto.interface'

export const IElementTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.ElementType}`)),
  Type.Object({
    elementKind: Type.Enum(ElementTypeKind),
  }),
])

export type IElementTypeDTO = Static<typeof IElementTypeDTO>

export const IElementType = Typebox.RequireTypename(IElementTypeDTO)

export type IElementType = Static<typeof IElementType>
