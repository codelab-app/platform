import * as Types from '@codelab/shared/abstract/codegen-v2'
import {
  ElementEdgeFragment,
  ElementFragment,
  ElementGraphFragment,
} from '../../graphql/Element.fragment.v2.graphql.gen'

export type NormalizedGetElementsGraphQuery = {
  vertices: { [id: string]: ElementFragment }
  edges: Array<ElementEdgeFragment>
}

export type GetElementsGraphQueryVariables = Types.Exact<{
  input: {
    rootId: Types.Scalars['String']
  }
}>

export type GetElementsGraphQuery = {
  elementGraph: Array<ElementGraphFragment>
}
