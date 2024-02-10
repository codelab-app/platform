import { ElementTypeKind } from '@codelab/shared/abstract/codegen'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDTO } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IElementTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.ElementType}`)),
  Type.Object({
    elementKind: Type.Enum(ElementTypeKind),
  }),
])

export type IElementTypeDTO = Static<typeof IElementTypeDTO>

export const IElementType = IElementTypeDTO

export type IElementType = Static<typeof IElementType>
