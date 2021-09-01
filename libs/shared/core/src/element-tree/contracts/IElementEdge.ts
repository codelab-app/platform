import { Edge } from '@codelab/shared/abstract/core'

/**
 * The interface required by ElementTree to function
 *
 * Keeping the port interfaces here allows us to use this in both
 * frontend (with fragments) and backend (with entities or models)
 */
export interface IElementEdge extends Edge {
  order?: number | null
}
