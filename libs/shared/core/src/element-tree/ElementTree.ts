import { IElement, IElementEdge, IGraph } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { getCyElementData } from '../cytoscape/element'
import { filterPredicate, TreeService } from '../tree'
import { isComponent, isElement } from './guards'

export class ElementTree extends TreeService<IElement, IElementEdge> {
  public static readonly isElement = isElement

  public static readonly isComponent = isComponent

  // We inject the predicates, because we don't know how the
  // concrete vertices are implemented
  constructor(
    graph: IGraph<any, any>,
    extractEdgeId?: Maybe<(edge: any) => string>,
  ) {
    super(graph, extractEdgeId)
  }

  /**
   * Overrides the mapper for ant tree
   */
  protected antdNodeMapper(element: any) {
    return {
      ...element,
      key: element.id,
      name:
        element.name ||
        (element as IElement)?.atom?.type ||
        (element as IElement)?.componentTag?.name,
    }
  }

  getRootElement(): Maybe<IElement> {
    return this.getRootVertex(ElementTree.isElement)
  }

  getRootComponent(): Maybe<IElement> {
    return this.getRootVertex(ElementTree.isComponent)
  }

  /** Returns the root element of a component */
  // getComponentRootElement(componentId: string): TElementVertex {
  //   return this.findChildVertex(
  //     componentId,
  //     this.isElementPredicate,
  //   ) as TElementVertex
  // }

  /**
   * componentId is the root elementId of the element tree
   */
  getComponentById(componentId: string): Maybe<IElement> {
    return this.cy
      .nodes()
      .filter(filterPredicate(ElementTree.isComponent))
      .getElementById(componentId)
      .first()
      .map<Maybe<IElement>>(getCyElementData)[0]
  }

  getAllComponents(): Array<IElement> {
    return this.getAllVertices(ElementTree.isComponent)
  }
  // getComponentOfElement(elementId: string) {
  //   return this.cy
  //     .getElementById(elementId)
  //     .outgoers()
  //     .filter(filterPredicate(this.isComponentPredicate))
  //     .first()
  //     .map<TComponentVertex | undefined>(getCyElementData)[0]
  // }
}
