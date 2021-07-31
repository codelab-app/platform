import { EntityProperties, Uuid } from '@codelab/ddd/types'

export abstract class Entity<TId = Uuid> implements EntityProperties<TId> {
  protected constructor(readonly id: TId) {}
}
