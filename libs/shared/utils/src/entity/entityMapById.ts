import { EntityLike } from '@codelab/shared/abstract/types'

export const entityToIdAndEntity = <T extends EntityLike>(
  entity: T,
): [string, T] => [entity.id, entity]

export const entityMapById = <T extends EntityLike>(entities: Array<T>) =>
  new Map(entities.map(entityToIdAndEntity))
