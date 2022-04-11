import { IElement } from './element.interface'

export interface IElementGraph {
  vertices: Array<IElement>
  edges: Array<{
    source: string
    target: string
    order?: number
  }>
}
