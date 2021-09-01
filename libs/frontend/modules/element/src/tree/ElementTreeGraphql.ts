import { ElementTree } from '@codelab/shared/core'
import { ElementEdgeFragment } from '../graphql/ElementEdge.fragment.api.graphql'
import {
  ComponentFragment,
  ElementFragment,
} from '../graphql/ElementGraph.fragment.api.graphql'
import { ElementGraphGraphql } from './ElementGraphGraphql'
import { isComponent, isElement } from './guards'

export type ElementTreeGraphqlVertex = ElementFragment | ComponentFragment

/**
 * A variant of ElementTree that uses Graphql fragments
 */
export class ElementTreeGraphql extends ElementTree<
  ElementFragment,
  ComponentFragment,
  ElementEdgeFragment
> {
  constructor(graph: ElementGraphGraphql | null | undefined) {
    super(graph, undefined, isElement, isComponent)
  }
}
