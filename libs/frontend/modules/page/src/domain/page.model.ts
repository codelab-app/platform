import { IEdge, IGraph, IPage, IVertex } from '@codelab/shared/abstract/core'

export class Page {
  private id: string

  name: string

  private elements: IGraph<IVertex, IEdge>

  constructor({ id, name, elements = { vertices: [], edges: [] } }: IPage) {
    this.id = id
    this.name = name
    this.elements = elements
  }
}
