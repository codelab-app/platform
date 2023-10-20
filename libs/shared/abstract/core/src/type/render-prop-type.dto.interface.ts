import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IBaseTypeDTO } from './base-type.dto.interface'

export const IRenderPropTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.RenderPropType}`)),
])

export type IRenderPropTypeDTO = Static<typeof IRenderPropTypeDTO>

export const IRenderPropType = Typebox.RequireTypename(IRenderPropTypeDTO)

export type IRenderPropType = Static<typeof IRenderPropType>
