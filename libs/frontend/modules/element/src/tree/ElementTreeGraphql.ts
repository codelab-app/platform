import { ElementTree } from '@codelab/shared/core'
import {
  ComponentVertexFragment,
  ElementEdgeFragment,
  ElementFragment,
} from '../graphql'
import { ElementGraphGraphql } from './ElementGraphGraphql'
import { isComponent, isElement } from './guards'

export type ElementTreeGraphqlVertex = ElementFragment | ComponentVertexFragment

/**
 * A variant of ElementTree that uses Graphql fragments
 */
export class ElementTreeGraphql extends ElementTree<
  ElementFragment,
  ComponentVertexFragment,
  ElementEdgeFragment
> {
  constructor(graph: ElementGraphGraphql | null | undefined) {
    super(graph, undefined, isElement, isComponent)
  }
}
