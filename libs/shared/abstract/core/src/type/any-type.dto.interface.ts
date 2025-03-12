import type { Static, TSchema } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { ITypeKind } from './type-kind.enum'

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
