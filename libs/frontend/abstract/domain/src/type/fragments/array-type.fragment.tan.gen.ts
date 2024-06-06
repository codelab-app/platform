import * as Types from '@codelab/shared/abstract/codegen'

import {
  BaseType_ActionType_Fragment,
  BaseType_AppType_Fragment,
  BaseType_ArrayType_Fragment,
  BaseType_CodeMirrorType_Fragment,
  BaseType_ElementType_Fragment,
  BaseType_EnumType_Fragment,
  BaseType_InterfaceType_Fragment,
  BaseType_LambdaType_Fragment,
  BaseType_PageType_Fragment,
  BaseType_PrimitiveType_Fragment,
  BaseType_ReactNodeType_Fragment,
  BaseType_RenderPropType_Fragment,
  BaseType_RichTextType_Fragment,
  BaseType_UnionType_Fragment,
} from './base-type.fragment.tan.gen'
import { BaseTypeFragmentDoc } from './base-type.fragment.tan.gen'
export type ArrayTypeFragment = {
  itemType:
    | { id: string; kind: Types.TypeKind; name: string }
    | { id: string; kind: Types.TypeKind; name: string }
    | { id: string; kind: Types.TypeKind; name: string }
    | { id: string; kind: Types.TypeKind; name: string }
    | { id: string; kind: Types.TypeKind; name: string }
    | { id: string; kind: Types.TypeKind; name: string }
    | { id: string; kind: Types.TypeKind; name: string }
    | { id: string; kind: Types.TypeKind; name: string }
    | { id: string; kind: Types.TypeKind; name: string }
    | { id: string; kind: Types.TypeKind; name: string }
    | { id: string; kind: Types.TypeKind; name: string }
    | { id: string; kind: Types.TypeKind; name: string }
    | { id: string; kind: Types.TypeKind; name: string }
    | { id: string; kind: Types.TypeKind; name: string }
} & BaseType_ArrayType_Fragment

export const ArrayTypeFragmentDoc = `
    fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
    ${BaseTypeFragmentDoc}`