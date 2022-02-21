import * as Types from '@codelab/shared/abstract/codegen-v2'

import {
  InterfaceTypeFragment,
  InterfaceTypeWithFieldsFragment,
} from './Interface.fragment.v2.graphql.gen'
import { TypeGraphFragment } from './TypeGraph.fragment.v2.graphql.gen'
import { gql } from '@apollo/client'
import {
  InterfaceTypeFragmentDoc,
  InterfaceTypeWithFieldsFragmentDoc,
} from './Interface.fragment.v2.graphql.gen'
import { TypeGraphFragmentDoc } from './TypeGraph.fragment.v2.graphql.gen'
export type InterfaceTypeWithGraphFragment = {
  graph: { ' $fragmentRefs': { TypeGraphFragment: TypeGraphFragment } }
} & { ' $fragmentRefs': { InterfaceTypeFragment: InterfaceTypeFragment } }

export const InterfaceTypeWithGraphFragmentDoc = gql`
  fragment InterfaceTypeWithGraph on InterfaceType {
    ...InterfaceType
    graph {
      ...TypeGraph
    }
  }
  ${InterfaceTypeFragmentDoc}
  ${TypeGraphFragmentDoc}
`
