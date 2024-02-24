import { ElementTypeKind } from '@codelab/shared/abstract/codegen'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IElementTypeDto = Type.Composite([
  IBaseTypeDto(Type.Literal(`${ITypeKind.ElementType}`)),
  Type.Object({
    elementKind: Type.Enum(ElementTypeKind),
  }),
])

export type IElementTypeDto = Static<typeof IElementTypeDto>

export const IElementType = IElementTypeDto

export type IElementType = Static<typeof IElementType>
