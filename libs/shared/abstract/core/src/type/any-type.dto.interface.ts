import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IDiscriminatedRef } from '../model/ref.interface'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IAnyBaseType = Type.Union([
  IBaseTypeDto(Type.Literal(`${ITypeKind.ActionType}`)),
  IBaseTypeDto(Type.Literal(`${ITypeKind.AppType}`)),
  IBaseTypeDto(Type.Literal(`${ITypeKind.ArrayType}`)),
  IBaseTypeDto(Type.Literal(`${ITypeKind.CodeMirrorType}`)),
  IBaseTypeDto(Type.Literal(`${ITypeKind.ElementType}`)),
  IBaseTypeDto(Type.Literal(`${ITypeKind.EnumType}`)),
  IBaseTypeDto(Type.Literal(`${ITypeKind.InterfaceType}`)),
  IBaseTypeDto(Type.Literal(`${ITypeKind.LambdaType}`)),
  IBaseTypeDto(Type.Literal(`${ITypeKind.PageType}`)),
  IBaseTypeDto(Type.Literal(`${ITypeKind.PrimitiveType}`)),
  IBaseTypeDto(Type.Literal(`${ITypeKind.ReactNodeType}`)),
  IBaseTypeDto(Type.Literal(`${ITypeKind.RenderPropType}`)),
  IBaseTypeDto(Type.Literal(`${ITypeKind.RichTextType}`)),
  IBaseTypeDto(Type.Literal(`${ITypeKind.UnionType}`)),
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
  IDiscriminatedRef(`${ITypeKind.RichTextType}`),
  IDiscriminatedRef(`${ITypeKind.UnionType}`),
])

export type ITypeRef = Static<typeof ITypeRef>

export const ITypeMaybeRef = Type.Union([
  IDiscriminatedRef(ITypeKind.ActionType),
  IDiscriminatedRef(ITypeKind.AppType),
  IDiscriminatedRef(ITypeKind.ArrayType),
  IDiscriminatedRef(ITypeKind.CodeMirrorType),
  IDiscriminatedRef(ITypeKind.ElementType),
  IDiscriminatedRef(ITypeKind.EnumType),
  IDiscriminatedRef(ITypeKind.InterfaceType),
  IDiscriminatedRef(ITypeKind.LambdaType),
  IDiscriminatedRef(ITypeKind.PageType),
  IDiscriminatedRef(ITypeKind.PrimitiveType),
  IDiscriminatedRef(ITypeKind.ReactNodeType),
  IDiscriminatedRef(ITypeKind.RenderPropType),
  IDiscriminatedRef(ITypeKind.RichTextType),
  IDiscriminatedRef(ITypeKind.UnionType),
])

export type ITypeMaybeRef = Static<typeof ITypeMaybeRef>
