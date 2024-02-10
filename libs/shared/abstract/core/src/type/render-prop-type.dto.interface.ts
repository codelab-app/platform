import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDTO } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IRenderPropTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.RenderPropType}`)),
])

export type IRenderPropTypeDTO = Static<typeof IRenderPropTypeDTO>

export const IRenderPropType = IRenderPropTypeDTO

export type IRenderPropType = Static<typeof IRenderPropType>
