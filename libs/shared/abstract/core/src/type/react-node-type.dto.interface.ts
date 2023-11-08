import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IBaseTypeDTO } from './base-type.dto.interface'

export const IReactNodeTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.ReactNodeType}`)),
])

export type IReactNodeTypeDTO = Static<typeof IReactNodeTypeDTO>

export const IReactNodeType = IReactNodeTypeDTO

export type IReactNodeType = Static<typeof IReactNodeType>
