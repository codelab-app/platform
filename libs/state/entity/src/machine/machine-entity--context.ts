import { EntityA, EntityI } from '@codelab/shared/interface/entity'

export interface ContextEntity<I extends EntityI, A extends EntityA> {
  // For creating/editing
  current: I | undefined
  item: A | undefined
  list: Array<A>
}
