import { Graph } from '@codelab/shared/abstract/core'
import { getCyElementData } from '../cytoscape/element'
import { filterPredicate, Predicate, TreeAdapter } from '../tree'
import { IComponentVertex, IElementEdge, IElementVertex } from './contracts'

/** Returns the component referenced by the specified element, or null if there isn't one */
// getComponentOfElement: (elementId: string) => ComponentFragment | undefined

// getComponentById: (componentId: string) => ComponentFragment | undefined

export class ElementTree<
  TElementVertex extends IElementVertex = IElementVertex,
  TComponentVertex extends IComponentVertex = IComponentVertex,
  TEdge extends IElementEdge = IElementEdge,
> extends TreeAdapter<TElementVertex | TComponentVertex, TEdge> {
  // We inject the predicates, because we don't know how the
  // concrete vertices are implemented
  constructor(
    graph: Graph<TElementVertex | TComponentVertex, TEdge> | null | undefined,
    extractEdgeId: ((edge: TEdge) => string) | undefined,
    public readonly isElementPredicate: Predicate<
      TElementVertex | TComponentVertex
    >,
    public readonly isComponentPredicate: Predicate<
      TElementVertex | TComponentVertex
    >,
  ) {
    super(graph, extractEdgeId)
    this.predicate = isElementPredicate
  }

  /**
   * Component methods
   */

  protected antdNodeMapper(element: TElementVertex | TComponentVertex) {
    return {
      ...element,
      key: element.id,
      name: element.name || (element as IElementVertex)?.atom?.type,
    }
  }

  /** Returns the root element of a component */
  getComponentRootElement(componentId: string): TElementVertex {
    return this.findChildVertex(
      componentId,
      this.isElementPredicate,
    ) as TElementVertex
  }

  /** Returns a component by its id or undefined if not found */
  getComponentById(componentId: string): TComponentVertex | undefined {
    return this.cy
      .getElementById(componentId)
      .filter(filterPredicate(this.isComponentPredicate))
      .first()
      .map<TComponentVertex | undefined>(getCyElementData)[0]
  }

  getComponentOfElement(elementId: string) {
    return this.cy
      .getElementById(elementId)
      .outgoers()
      .filter(filterPredicate(this.isComponentPredicate))
      .first()
      .map<TComponentVertex | undefined>(getCyElementData)[0]
  }
}
