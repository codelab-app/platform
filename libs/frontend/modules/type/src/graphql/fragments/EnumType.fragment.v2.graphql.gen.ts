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
import { EnumTypeValueFragment } from './EnumTypeValue.fragment.v2.graphql.gen'
import { gql } from '@apollo/client'
import { TypeBaseFragmentDoc } from './TypeBase.fragment.v2.graphql.gen'
import { EnumTypeValueFragmentDoc } from './EnumTypeValue.fragment.v2.graphql.gen'
export type EnumTypeFragment = {
  allowedValues?: Array<{
    ' $fragmentRefs': { EnumTypeValueFragment: EnumTypeValueFragment }
  }> | null
} & {
  ' $fragmentRefs': { TypeBase_EnumType_Fragment: TypeBase_EnumType_Fragment }
}

export const EnumTypeFragmentDoc = gql`
  fragment EnumType on EnumType {
    ...TypeBase
    allowedValues {
      ...EnumTypeValue
    }
  }
  ${TypeBaseFragmentDoc}
  ${EnumTypeValueFragmentDoc}
`
