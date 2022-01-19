import { EntityLike } from '@codelab/shared/abstract/types'

export const createEntityMapById = <T extends EntityLike>(entites: Array<T>) =>
  new Map(entites.map((e) => [e.id, e]))
