import * as Types from '@codelab/shared/abstract/codegen'

import { fetchParams } from '@codelab/shared/config'
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
} from './base-type.fragment.graphql.gen'
import { BaseTypeFragmentDoc } from './base-type.fragment.graphql.gen'
export type UnionTypeFragment = {
  typesOfUnionType: Array<
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
  >
} & BaseType_UnionType_Fragment

export const UnionTypeFragmentDoc = `
    fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
    ${BaseTypeFragmentDoc}`
