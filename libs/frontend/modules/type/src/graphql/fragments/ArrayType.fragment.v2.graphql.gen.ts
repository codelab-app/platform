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
  itemType?: Array<
    | {
        ' $fragmentRefs': {
          TypeBase_AppType_Fragment: TypeBase_AppType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_ArrayType_Fragment: TypeBase_ArrayType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_ElementType_Fragment: TypeBase_ElementType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_EnumType_Fragment: TypeBase_EnumType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_InterfaceType_Fragment: TypeBase_InterfaceType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_LambdaType_Fragment: TypeBase_LambdaType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_MonacoType_Fragment: TypeBase_MonacoType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_PageType_Fragment: TypeBase_PageType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_PrimitiveType_Fragment: TypeBase_PrimitiveType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_ReactNodeType_Fragment: TypeBase_ReactNodeType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_RenderPropsType_Fragment: TypeBase_RenderPropsType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_UnionType_Fragment: TypeBase_UnionType_Fragment
        }
      }
  > | null
} & { ' $fragmentRefs': { ArrayTypeFragment: ArrayTypeFragment } }

export type ArrayTypeFragment = {
  ' $fragmentRefs': { TypeBase_ArrayType_Fragment: TypeBase_ArrayType_Fragment }
}

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
