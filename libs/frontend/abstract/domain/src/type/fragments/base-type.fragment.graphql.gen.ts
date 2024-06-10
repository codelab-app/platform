import * as Types from '@codelab/shared/abstract/codegen'

import { fetchParams } from '@codelab/shared/config'
export type BaseType_ActionType_Fragment = {
  __typename: 'ActionType'
  id: string
  kind: Types.TypeKind
  name: string
}

export type BaseType_AppType_Fragment = {
  __typename: 'AppType'
  id: string
  kind: Types.TypeKind
  name: string
}

export type BaseType_ArrayType_Fragment = {
  __typename: 'ArrayType'
  id: string
  kind: Types.TypeKind
  name: string
}

export type BaseType_CodeMirrorType_Fragment = {
  __typename: 'CodeMirrorType'
  id: string
  kind: Types.TypeKind
  name: string
}

export type BaseType_ElementType_Fragment = {
  __typename: 'ElementType'
  id: string
  kind: Types.TypeKind
  name: string
}

export type BaseType_EnumType_Fragment = {
  __typename: 'EnumType'
  id: string
  kind: Types.TypeKind
  name: string
}

export type BaseType_InterfaceType_Fragment = {
  __typename: 'InterfaceType'
  id: string
  kind: Types.TypeKind
  name: string
}

export type BaseType_LambdaType_Fragment = {
  __typename: 'LambdaType'
  id: string
  kind: Types.TypeKind
  name: string
}

export type BaseType_PageType_Fragment = {
  __typename: 'PageType'
  id: string
  kind: Types.TypeKind
  name: string
}

export type BaseType_PrimitiveType_Fragment = {
  __typename: 'PrimitiveType'
  id: string
  kind: Types.TypeKind
  name: string
}

export type BaseType_ReactNodeType_Fragment = {
  __typename: 'ReactNodeType'
  id: string
  kind: Types.TypeKind
  name: string
}

export type BaseType_RenderPropType_Fragment = {
  __typename: 'RenderPropType'
  id: string
  kind: Types.TypeKind
  name: string
}

export type BaseType_RichTextType_Fragment = {
  __typename: 'RichTextType'
  id: string
  kind: Types.TypeKind
  name: string
}

export type BaseType_UnionType_Fragment = {
  __typename: 'UnionType'
  id: string
  kind: Types.TypeKind
  name: string
}

export type BaseTypeFragment =
  | BaseType_ActionType_Fragment
  | BaseType_AppType_Fragment
  | BaseType_ArrayType_Fragment
  | BaseType_CodeMirrorType_Fragment
  | BaseType_ElementType_Fragment
  | BaseType_EnumType_Fragment
  | BaseType_InterfaceType_Fragment
  | BaseType_LambdaType_Fragment
  | BaseType_PageType_Fragment
  | BaseType_PrimitiveType_Fragment
  | BaseType_ReactNodeType_Fragment
  | BaseType_RenderPropType_Fragment
  | BaseType_RichTextType_Fragment
  | BaseType_UnionType_Fragment

export const BaseTypeFragmentDoc = `
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
}
    `
