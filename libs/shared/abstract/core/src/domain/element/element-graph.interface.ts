import { IElement } from './element.model.interface'

export interface IElementGraph {
  vertices: Array<IElement>
  edges: Array<{
    source: string
    target: string
    order?: number
  }>
}
