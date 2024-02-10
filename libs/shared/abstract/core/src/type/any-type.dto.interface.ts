import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IDiscriminatedRef } from '../model/node-type.interface'
import { IBaseTypeDTO } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IAnyBaseType = Type.Union([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.ActionType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.AppType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.ArrayType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.CodeMirrorType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.ElementType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.EnumType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.InterfaceType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.LambdaType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.PageType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.PrimitiveType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.ReactNodeType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.RenderPropType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.UnionType}`)),
])

export type IAnyBaseType = Static<typeof IAnyBaseType>

export const ITypeRef = Type.Union([
  IDiscriminatedRef(`${ITypeKind.ActionType}`),
  IDiscriminatedRef(`${ITypeKind.AppType}`),
  IDiscriminatedRef(`${ITypeKind.ArrayType}`),
  IDiscriminatedRef(`${ITypeKind.CodeMirrorType}`),
  IDiscriminatedRef(`${ITypeKind.ElementType}`),
  IDiscriminatedRef(`${ITypeKind.EnumType}`),
  IDiscriminatedRef(`${ITypeKind.InterfaceType}`),
  IDiscriminatedRef(`${ITypeKind.LambdaType}`),
  IDiscriminatedRef(`${ITypeKind.PageType}`),
  IDiscriminatedRef(`${ITypeKind.PrimitiveType}`),
  IDiscriminatedRef(`${ITypeKind.ReactNodeType}`),
  IDiscriminatedRef(`${ITypeKind.RenderPropType}`),
  IDiscriminatedRef(`${ITypeKind.UnionType}`),
])

export type ITypeRef = Static<typeof ITypeRef>

export const ITypeMaybeRef = Type.Union([
  IDiscriminatedRef(`${ITypeKind.ActionType}`),
  IDiscriminatedRef(`${ITypeKind.AppType}`),
  IDiscriminatedRef(`${ITypeKind.ArrayType}`),
  IDiscriminatedRef(`${ITypeKind.CodeMirrorType}`),
  IDiscriminatedRef(`${ITypeKind.ElementType}`),
  IDiscriminatedRef(`${ITypeKind.EnumType}`),
  IDiscriminatedRef(`${ITypeKind.InterfaceType}`),
  IDiscriminatedRef(`${ITypeKind.LambdaType}`),
  IDiscriminatedRef(`${ITypeKind.PageType}`),
  IDiscriminatedRef(`${ITypeKind.PrimitiveType}`),
  IDiscriminatedRef(`${ITypeKind.ReactNodeType}`),
  IDiscriminatedRef(`${ITypeKind.RenderPropType}`),
  IDiscriminatedRef(`${ITypeKind.UnionType}`),
])

export type ITypeMaybeRef = Static<typeof ITypeMaybeRef>
