import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IReactNodeTypeDto = Type.Composite([
  IBaseTypeDto(Type.Literal(`${ITypeKind.ReactNodeType}`)),
])

export type IReactNodeTypeDto = Static<typeof IReactNodeTypeDto>

export const IReactNodeType = IReactNodeTypeDto

export type IReactNodeType = Static<typeof IReactNodeType>
