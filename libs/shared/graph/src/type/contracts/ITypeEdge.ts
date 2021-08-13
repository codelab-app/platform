import { TypeEdgeKind } from '@codelab/ddd/types'
import { IEdge } from '../../IEdge'
import { IFieldVertex } from './IFieldVertex'

export interface ITypeEdge extends IEdge {
  kind: TypeEdgeKind
  /** Empty if kind is not TypeEdgeKind.Field */
  field?: IFieldVertex | null
}
