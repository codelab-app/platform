import {
  Graph,
  IComponentVertex,
  IElementEdge,
  IElementVertex,
} from '@codelab/shared/abstract/core'
import { getCyElementData } from '../cytoscape/element'
import { filterPredicate, InstancePredicate, TreeService } from '../tree'

/** Returns the component referenced by the specified element, or null if there isn't one */
// getComponentOfElement: (elementId: string) => ComponentFragment | undefined

// getComponentById: (componentId: string) => ComponentFragment | undefined

export class ElementTree<
  TElementVertex extends IElementVertex = IElementVertex,
  TComponentVertex extends IComponentVertex = IComponentVertex,
  TEdge extends IElementEdge = IElementEdge,
> extends TreeService<TElementVertex | TComponentVertex, TEdge> {
  // We inject the predicates, because we don't know how the
  // concrete vertices are implemented
  constructor(
    graph: Graph<TElementVertex | TComponentVertex, TEdge>,
    extractEdgeId: ((edge: TEdge) => string) | undefined,
    public readonly isElementPredicate: InstancePredicate<
      TElementVertex | TComponentVertex,
      TElementVertex
    >,
    public readonly isComponentPredicate: InstancePredicate<
      TElementVertex | TComponentVertex,
      TComponentVertex
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
