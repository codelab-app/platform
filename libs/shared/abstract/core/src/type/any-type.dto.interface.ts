import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { BaseTypeDtoSchema } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const AnyBaseTypeSchema = Type.Union([
  BaseTypeDtoSchema(`${ITypeKind.ActionType}`),
  BaseTypeDtoSchema(`${ITypeKind.AppType}`),
  BaseTypeDtoSchema(`${ITypeKind.ArrayType}`),
  BaseTypeDtoSchema(`${ITypeKind.CodeMirrorType}`),
  BaseTypeDtoSchema(`${ITypeKind.ElementType}`),
  BaseTypeDtoSchema(`${ITypeKind.EnumType}`),
  BaseTypeDtoSchema(`${ITypeKind.InterfaceType}`),
  BaseTypeDtoSchema(`${ITypeKind.LambdaType}`),
  BaseTypeDtoSchema(`${ITypeKind.PageType}`),
  BaseTypeDtoSchema(`${ITypeKind.PrimitiveType}`),
  BaseTypeDtoSchema(`${ITypeKind.ReactNodeType}`),
  BaseTypeDtoSchema(`${ITypeKind.RenderPropType}`),
  BaseTypeDtoSchema(`${ITypeKind.RichTextType}`),
  BaseTypeDtoSchema(`${ITypeKind.UnionType}`),
])

export type IAnyBaseType = Static<typeof AnyBaseTypeSchema>

export const TypeRefSchema = Type.Union(
  [
    Typebox.DiscriminatedRef(`${ITypeKind.ActionType}`),
    Typebox.DiscriminatedRef(`${ITypeKind.AppType}`),
    Typebox.DiscriminatedRef(`${ITypeKind.ArrayType}`),
    Typebox.DiscriminatedRef(`${ITypeKind.CodeMirrorType}`),
    Typebox.DiscriminatedRef(`${ITypeKind.ElementType}`),
    Typebox.DiscriminatedRef(`${ITypeKind.EnumType}`),
    Typebox.DiscriminatedRef(`${ITypeKind.InterfaceType}`),
    Typebox.DiscriminatedRef(`${ITypeKind.LambdaType}`),
    Typebox.DiscriminatedRef(`${ITypeKind.PageType}`),
    Typebox.DiscriminatedRef(`${ITypeKind.PrimitiveType}`),
    Typebox.DiscriminatedRef(`${ITypeKind.ReactNodeType}`),
    Typebox.DiscriminatedRef(`${ITypeKind.RenderPropType}`),
    Typebox.DiscriminatedRef(`${ITypeKind.RichTextType}`),
    Typebox.DiscriminatedRef(`${ITypeKind.UnionType}`),
  ],
  { discriminantKey: '__typename', errorMessage: 'Unknown type' },
)

export type ITypeRef = Static<typeof TypeRefSchema>

export const TypeMaybeRefSchema = Type.Union(
  [
    Typebox.DiscriminatedRef(ITypeKind.ActionType),
    Typebox.DiscriminatedRef(ITypeKind.AppType),
    Typebox.DiscriminatedRef(ITypeKind.ArrayType),
    Typebox.DiscriminatedRef(ITypeKind.CodeMirrorType),
    Typebox.DiscriminatedRef(ITypeKind.ElementType),
    Typebox.DiscriminatedRef(ITypeKind.EnumType),
    Typebox.DiscriminatedRef(ITypeKind.InterfaceType),
    Typebox.DiscriminatedRef(ITypeKind.LambdaType),
    Typebox.DiscriminatedRef(ITypeKind.PageType),
    Typebox.DiscriminatedRef(ITypeKind.PrimitiveType),
    Typebox.DiscriminatedRef(ITypeKind.ReactNodeType),
    Typebox.DiscriminatedRef(ITypeKind.RenderPropType),
    Typebox.DiscriminatedRef(ITypeKind.RichTextType),
    Typebox.DiscriminatedRef(ITypeKind.UnionType),
  ],
  { discriminantKey: '__typename', errorMessage: 'Unknown type' },
)

export type ITypeMaybeRef = Static<typeof TypeMaybeRefSchema>
