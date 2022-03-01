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
import { ArrayTypeFragment } from './ArrayType.fragment.v2.graphql.gen'
import { EnumTypeFragment } from './EnumType.fragment.v2.graphql.gen'
import { PrimitiveTypeFragment } from './PrimitiveType.fragment.v2.graphql.gen'
import { ElementTypeFragment } from './ElementType.fragment.v2.graphql.gen'
import { LambdaTypeFragment } from './LambdaType.fragment.v2.graphql.gen'
import { RenderPropsTypeFragment } from './RenderProps.fragment.v2.graphql.gen'
import {
  UnionTypeFragment,
  UnionTypeWithInnerTypesFragment,
} from './UnionType.fragment.v2.graphql.gen'
import { MonacoTypeFragment } from './MonacoType.fragment.v2.graphql.gen'
import { PageTypeFragment } from './PageType.fragment.v2.graphql.gen'
import { AppTypeFragment } from './AppType.fragment.v2.graphql.gen'
import { gql } from 'graphql-request'
import { TypeBaseFragmentDoc } from './TypeBase.fragment.v2.graphql.gen'
import { ArrayTypeFragmentDoc } from './ArrayType.fragment.v2.graphql.gen'
import { EnumTypeFragmentDoc } from './EnumType.fragment.v2.graphql.gen'
import { PrimitiveTypeFragmentDoc } from './PrimitiveType.fragment.v2.graphql.gen'
import { ElementTypeFragmentDoc } from './ElementType.fragment.v2.graphql.gen'
import { LambdaTypeFragmentDoc } from './LambdaType.fragment.v2.graphql.gen'
import { RenderPropsTypeFragmentDoc } from './RenderProps.fragment.v2.graphql.gen'
import {
  UnionTypeFragmentDoc,
  UnionTypeWithInnerTypesFragmentDoc,
} from './UnionType.fragment.v2.graphql.gen'
import { MonacoTypeFragmentDoc } from './MonacoType.fragment.v2.graphql.gen'
import { PageTypeFragmentDoc } from './PageType.fragment.v2.graphql.gen'
import { AppTypeFragmentDoc } from './AppType.fragment.v2.graphql.gen'
export type InterfaceTypeFragment = {
  ' $fragmentRefs': {
    TypeBase_InterfaceType_Fragment: TypeBase_InterfaceType_Fragment
  }
}

export type InterfaceTypeFieldEdgeFragment = {
  key: string
  description?: string | null
  cursor: string
  name?: string | null
  node:
    | {
        ' $fragmentRefs': {
          TypeBase_AppType_Fragment: TypeBase_AppType_Fragment
          AppTypeFragment: AppTypeFragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_ArrayType_Fragment: TypeBase_ArrayType_Fragment
          ArrayTypeFragment: ArrayTypeFragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_ElementType_Fragment: TypeBase_ElementType_Fragment
          ElementTypeFragment: ElementTypeFragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_EnumType_Fragment: TypeBase_EnumType_Fragment
          EnumTypeFragment: EnumTypeFragment
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
          LambdaTypeFragment: LambdaTypeFragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_MonacoType_Fragment: TypeBase_MonacoType_Fragment
          MonacoTypeFragment: MonacoTypeFragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_PageType_Fragment: TypeBase_PageType_Fragment
          PageTypeFragment: PageTypeFragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_PrimitiveType_Fragment: TypeBase_PrimitiveType_Fragment
          PrimitiveTypeFragment: PrimitiveTypeFragment
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
          RenderPropsTypeFragment: RenderPropsTypeFragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeBase_UnionType_Fragment: TypeBase_UnionType_Fragment
          UnionTypeFragment: UnionTypeFragment
        }
      }
}

export type InterfaceTypeWithFieldsFragment = {
  fieldsConnection: {
    totalCount: number
    edges: Array<{
      ' $fragmentRefs': {
        InterfaceTypeFieldEdgeFragment: InterfaceTypeFieldEdgeFragment
      }
    }>
  }
} & { ' $fragmentRefs': { InterfaceTypeFragment: InterfaceTypeFragment } }

export const InterfaceTypeFragmentDoc = gql`
  fragment InterfaceType on InterfaceType {
    ...TypeBase
  }
  ${TypeBaseFragmentDoc}
`
export const InterfaceTypeFieldEdgeFragmentDoc = gql`
  fragment InterfaceTypeFieldEdge on InterfaceTypeFieldsRelationship {
    key
    description
    cursor
    name
    node {
      ...TypeBase
      ...ArrayType
      ...EnumType
      ...PrimitiveType
      ...ElementType
      ...LambdaType
      ...RenderPropsType
      ...UnionType
      ...MonacoType
      ...PageType
      ...AppType
    }
  }
  ${TypeBaseFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const InterfaceTypeWithFieldsFragmentDoc = gql`
  fragment InterfaceTypeWithFields on InterfaceType {
    ...InterfaceType
    fieldsConnection {
      edges {
        ...InterfaceTypeFieldEdge
      }
      totalCount
    }
  }
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
`
