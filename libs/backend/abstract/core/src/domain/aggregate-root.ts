import { AggregateRootProperties, Uuid } from '@codelab/backend/abstract/types'
import { Entity } from './entity'

/**
 * The root entity of an aggregate
 */
export abstract class AggregateRoot<TId = Uuid>
  extends Entity<TId>
  implements AggregateRootProperties<TId>
{
  constructor(id: TId) {
    super(id)
  }
}
