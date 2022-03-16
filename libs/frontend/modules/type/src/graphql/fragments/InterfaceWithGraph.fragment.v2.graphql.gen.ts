import * as Types from '@codelab/shared/abstract/codegen-v2'

import {
  InterfaceTypeFragment,
  InterfaceTypeWithFieldsFragment,
  InterfaceTypeFieldEdgeFragment,
} from './Interface.fragment.v2.graphql.gen'
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
import {
  TypeGraphFragment,
  TypeEdge_Edge_Fragment,
  TypeEdge_InterfaceTypeEdge_Fragment,
} from './TypeGraph.fragment.v2.graphql.gen'
import {
  Field_InterfaceTypeEdge_Fragment,
  Field_InterfaceTypeFieldsRelationship_Fragment,
} from './Field.fragment.v2.graphql.gen'
import {
  TypeNonRecursive_AppType_Fragment,
  TypeNonRecursive_ArrayType_Fragment,
  TypeNonRecursive_ElementType_Fragment,
  TypeNonRecursive_EnumType_Fragment,
  TypeNonRecursive_InterfaceType_Fragment,
  TypeNonRecursive_LambdaType_Fragment,
  TypeNonRecursive_MonacoType_Fragment,
  TypeNonRecursive_PageType_Fragment,
  TypeNonRecursive_PrimitiveType_Fragment,
  TypeNonRecursive_ReactNodeType_Fragment,
  TypeNonRecursive_RenderPropsType_Fragment,
  TypeNonRecursive_UnionType_Fragment,
} from './Type.fragment.v2.graphql.gen'
import { ArrayTypeFragment } from './ArrayType.fragment.v2.graphql.gen'
import { EnumTypeFragment } from './EnumType.fragment.v2.graphql.gen'
import { EnumTypeValueFragment } from './EnumTypeValue.fragment.v2.graphql.gen'
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
import {
  InterfaceTypeFragmentDoc,
  InterfaceTypeWithFieldsFragmentDoc,
  InterfaceTypeFieldEdgeFragmentDoc,
} from './Interface.fragment.v2.graphql.gen'
import { TypeBaseFragmentDoc } from './TypeBase.fragment.v2.graphql.gen'
import {
  TypeGraphFragmentDoc,
  TypeEdgeFragmentDoc,
} from './TypeGraph.fragment.v2.graphql.gen'
import { FieldFragmentDoc } from './Field.fragment.v2.graphql.gen'
import { TypeNonRecursiveFragmentDoc } from './Type.fragment.v2.graphql.gen'
import { ArrayTypeFragmentDoc } from './ArrayType.fragment.v2.graphql.gen'
import { EnumTypeFragmentDoc } from './EnumType.fragment.v2.graphql.gen'
import { EnumTypeValueFragmentDoc } from './EnumTypeValue.fragment.v2.graphql.gen'
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
export type InterfaceTypeWithGraphFragment = {
  graph: TypeGraphFragment
} & InterfaceTypeFragment

export const InterfaceTypeWithGraphFragmentDoc = gql`
  fragment InterfaceTypeWithGraph on InterfaceType {
    ...InterfaceType
    graph {
      ...TypeGraph
    }
  }
`
