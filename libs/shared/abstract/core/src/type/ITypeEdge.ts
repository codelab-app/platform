import { TypeEdgeKind } from '../enums'
import { Edge } from '../graph/edge'
import { IField } from './IField'

export interface ITypeEdge extends Edge {
  kind: TypeEdgeKind
  /** Empty if kind is not TypeEdgeKind.Field */
  field?: IField | null
}
