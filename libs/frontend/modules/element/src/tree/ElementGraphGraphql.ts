import { Graph } from '@codelab/shared/abstract/core'
import {
  ComponentVertexFragment,
  ElementEdgeFragment,
  ElementFragment,
} from '../graphql'

export type ElementGraphGraphql = Graph<
  ElementFragment | ComponentVertexFragment,
  ElementEdgeFragment
>
