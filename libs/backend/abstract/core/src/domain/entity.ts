import { EntityProperties, Uuid } from '@codelab/backend/abstract/types'

export abstract class Entity<TId = Uuid> implements EntityProperties<TId> {
  protected constructor(readonly id: TId) {}
}
