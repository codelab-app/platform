import { DataDocument } from 'ts-japi'
import { EntityA, EntityI } from '@codelab/alpha/shared/interface/entity'

export interface ContextEntity<I extends EntityI, A extends EntityA> {
  // For creating/editing
  current: I | undefined
  item: DataDocument<A>
  list: DataDocument<A>
}
