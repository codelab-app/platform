import { Graph } from '@codelab/shared/abstract/core'
import { ElementEdgeFragment } from '../graphql/ElementEdge.fragment.api.graphql'
import {
  ComponentFragment,
  ElementFragment,
} from '../graphql/ElementGraph.fragment.api.graphql'

export type ElementGraphGraphql = Graph<
  ElementFragment | ComponentFragment,
  ElementEdgeFragment
>
