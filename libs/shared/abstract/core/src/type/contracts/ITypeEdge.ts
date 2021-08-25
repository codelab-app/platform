import { Edge } from '../../graph/edge'
import { TypeEdgeKind } from '../enums'
import { IFieldVertex } from './IFieldVertex'

export interface ITypeEdge extends Edge {
  kind: TypeEdgeKind
  /** Empty if kind is not TypeEdgeKind.Field */
  field?: IFieldVertex
}
