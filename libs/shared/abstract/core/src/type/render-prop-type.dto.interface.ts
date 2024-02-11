import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IRenderPropTypeDto = Type.Composite([
  IBaseTypeDto(Type.Literal(`${ITypeKind.RenderPropType}`)),
])

export type IRenderPropTypeDto = Static<typeof IRenderPropTypeDto>

export const IRenderPropType = IRenderPropTypeDto

export type IRenderPropType = Static<typeof IRenderPropType>
