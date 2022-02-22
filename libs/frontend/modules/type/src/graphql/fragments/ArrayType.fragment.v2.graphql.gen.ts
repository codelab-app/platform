import * as Types from '@codelab/shared/abstract/codegen-v2'

import {
  TypeBase_AppType_Fragment,
  TypeBase_ArrayType_Fragment,
  TypeBase_ElementType_Fragment,
  TypeBase_EnumType_Fragment,
  TypeBase_InterfaceType_Fragment,
  TypeBase_LambdaType_Fragment,
  TypeBase_MonacoType_Fragment,
  TypeBase_PageType_Fragment,
  TypeBase_PrimitiveType_Fragment,
  TypeBase_ReactNodeType_Fragment,
  TypeBase_RenderPropsType_Fragment,
  TypeBase_UnionType_Fragment,
} from './TypeBase.fragment.v2.graphql.gen'
import { gql } from '@apollo/client'
import { TypeBaseFragmentDoc } from './TypeBase.fragment.v2.graphql.gen'
export type ArrayTypeWithItemTypeFragment = {
  itemType?:
    | Array<
        | TypeBase_AppType_Fragment
        | TypeBase_ArrayType_Fragment
        | TypeBase_ElementType_Fragment
        | TypeBase_EnumType_Fragment
        | TypeBase_InterfaceType_Fragment
        | TypeBase_LambdaType_Fragment
        | TypeBase_MonacoType_Fragment
        | TypeBase_PageType_Fragment
        | TypeBase_PrimitiveType_Fragment
        | TypeBase_ReactNodeType_Fragment
        | TypeBase_RenderPropsType_Fragment
        | TypeBase_UnionType_Fragment
      >
    | null
    | undefined
} & ArrayTypeFragment

export type ArrayTypeFragment = TypeBase_ArrayType_Fragment

export const ArrayTypeFragmentDoc = gql`
  fragment ArrayType on ArrayType {
    ...TypeBase
  }
  ${TypeBaseFragmentDoc}
`
export const ArrayTypeWithItemTypeFragmentDoc = gql`
  fragment ArrayTypeWithItemType on ArrayType {
    ...ArrayType
    itemType {
      ... on TypeBase {
        ...TypeBase
      }
    }
  }
  ${ArrayTypeFragmentDoc}
  ${TypeBaseFragmentDoc}
`
