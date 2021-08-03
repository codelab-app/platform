import { DgraphEntity } from '../infrastructure'

/**
 * (1) Remove Dgraph specific types
 *
 * (2) Map key type to any
 */
export type DgraphDomain<TType extends DgraphEntity<any>> = {
  // TODO: infer array for any
  [K in keyof Omit<TType, 'uid' | 'dgraph.type'>]: any
}
