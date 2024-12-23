import type { Static, TSchema } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { ITypeKind } from './type-kind.enum'

export const TypeRefSchema = <T extends TSchema>(schema?: T) =>
  Type.Union(
    [
      Typebox.DiscriminatedRef(`${ITypeKind.ActionType}`, schema),
      Typebox.DiscriminatedRef(`${ITypeKind.AppType}`, schema),
      Typebox.DiscriminatedRef(`${ITypeKind.ArrayType}`, schema),
      Typebox.DiscriminatedRef(`${ITypeKind.CodeMirrorType}`, schema),
      Typebox.DiscriminatedRef(`${ITypeKind.ElementType}`, schema),
      Typebox.DiscriminatedRef(`${ITypeKind.EnumType}`, schema),
      Typebox.DiscriminatedRef(`${ITypeKind.InterfaceType}`, schema),
      Typebox.DiscriminatedRef(`${ITypeKind.LambdaType}`, schema),
      Typebox.DiscriminatedRef(`${ITypeKind.PageType}`, schema),
      Typebox.DiscriminatedRef(`${ITypeKind.PrimitiveType}`, schema),
      Typebox.DiscriminatedRef(`${ITypeKind.ReactNodeType}`, schema),
      Typebox.DiscriminatedRef(`${ITypeKind.RenderPropType}`, schema),
      Typebox.DiscriminatedRef(`${ITypeKind.RichTextType}`, schema),
      Typebox.DiscriminatedRef(`${ITypeKind.UnionType}`, schema),
    ],
    { discriminantKey: '__typename', errorMessage: 'Unknown type' },
  )

export type ITypeRef<T extends TSchema = never> = Static<
  ReturnType<typeof TypeRefSchema<T>>
>
