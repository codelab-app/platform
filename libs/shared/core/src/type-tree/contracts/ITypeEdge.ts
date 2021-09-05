import { Edge, TypeEdgeKind } from '@codelab/shared/abstract/core'
import { IField } from './IField'

/**
 * The interface required by TypeTree to function
 *
 * Keeping the port interfaces here allows us to use this in both
 * frontend (with fragments) and backend (with entities or models)
 */
export interface ITypeEdge extends Edge {
  kind: TypeEdgeKind
  /** Empty if kind is not TypeEdgeKind.Field */
  field?: IField | null
}
