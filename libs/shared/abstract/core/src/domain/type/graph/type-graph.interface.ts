import { IAnyType } from '../types/type.interface'
import { ITypeEdge } from './type-edge.interface'

export interface ITypeGraph {
  vertices: Array<IAnyType>
  edges: Array<ITypeEdge>
}
