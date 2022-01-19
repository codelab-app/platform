import * as Types from '@codelab/frontend/abstract/codegen'

import { TypeGraphFragment } from './TypeGraph.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TypeGraphFragmentDoc } from './TypeGraph.fragment.graphql.gen'
export type Export__Types_AppType_Fragment = {
  id: string
  name: string
  typeKind: Types.TypeKind
  typeGraph: TypeGraphFragment
}

export type Export__Types_ArrayType_Fragment = {
  id: string
  name: string
  typeKind: Types.TypeKind
  typeGraph: TypeGraphFragment
}

export type Export__Types_ComponentType_Fragment = {
  id: string
  name: string
  typeKind: Types.TypeKind
  typeGraph: TypeGraphFragment
}

export type Export__Types_ElementType_Fragment = {
  id: string
  name: string
  typeKind: Types.TypeKind
  typeGraph: TypeGraphFragment
}

export type Export__Types_EnumType_Fragment = {
  id: string
  name: string
  typeKind: Types.TypeKind
  typeGraph: TypeGraphFragment
}

export type Export__Types_InterfaceType_Fragment = {
  id: string
  name: string
  typeKind: Types.TypeKind
  typeGraph: TypeGraphFragment
}

export type Export__Types_LambdaType_Fragment = {
  id: string
  name: string
  typeKind: Types.TypeKind
  typeGraph: TypeGraphFragment
}

export type Export__Types_MonacoType_Fragment = {
  id: string
  name: string
  typeKind: Types.TypeKind
  typeGraph: TypeGraphFragment
}

export type Export__Types_PageType_Fragment = {
  id: string
  name: string
  typeKind: Types.TypeKind
  typeGraph: TypeGraphFragment
}

export type Export__Types_PrimitiveType_Fragment = {
  id: string
  name: string
  typeKind: Types.TypeKind
  typeGraph: TypeGraphFragment
}

export type Export__Types_ReactNodeType_Fragment = {
  id: string
  name: string
  typeKind: Types.TypeKind
  typeGraph: TypeGraphFragment
}

export type Export__Types_RenderPropsType_Fragment = {
  id: string
  name: string
  typeKind: Types.TypeKind
  typeGraph: TypeGraphFragment
}

export type Export__Types_UnionType_Fragment = {
  id: string
  name: string
  typeKind: Types.TypeKind
  typeGraph: TypeGraphFragment
}

export type Export__TypesFragment =
  | Export__Types_AppType_Fragment
  | Export__Types_ArrayType_Fragment
  | Export__Types_ComponentType_Fragment
  | Export__Types_ElementType_Fragment
  | Export__Types_EnumType_Fragment
  | Export__Types_InterfaceType_Fragment
  | Export__Types_LambdaType_Fragment
  | Export__Types_MonacoType_Fragment
  | Export__Types_PageType_Fragment
  | Export__Types_PrimitiveType_Fragment
  | Export__Types_ReactNodeType_Fragment
  | Export__Types_RenderPropsType_Fragment
  | Export__Types_UnionType_Fragment

export const Export__TypesFragmentDoc = gql`
  fragment Export__Types on Type {
    id
    name
    typeKind
    typeGraph {
      ...TypeGraph
    }
  }
  ${TypeGraphFragmentDoc}
`
