import type { IElement } from './element.model.interface'

export interface IElementGraph {
  edges: Array<{
    order?: number
    source: string
    target: string
  }>
  vertices: Array<IElement>
}
