import {
  IEdge,
  IElement,
  IGraph,
  IPage,
  IVertex,
} from '@codelab/shared/abstract/core'
import { Entity } from '@codelab/shared/abstract/types'

export class Page {
  static ROOT_ELEMENT_ID = 'ROOT'

  private id: string

  name: string

  elements: IGraph<IVertex, IEdge>

  constructor({ id, name, elements = { vertices: [], edges: [] } }: IPage) {
    this.id = id
    this.name = name
    this.elements = elements
  }

  get rootElement() {
    return {}
  }

  /**
   *
   * @param element The element we are adding to the graph
   * @param parent Optional parent that we connect the element to, append to root element if parent doesn't exist
   */
  addElement(element: IElement, parent?: Entity<IElement>) {
    // if (!parent) {
    // }
  }
}
