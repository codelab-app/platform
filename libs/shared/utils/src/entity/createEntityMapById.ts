import { Entity } from '@codelab/shared/abstract/types'

export const createEntityMapById = <T extends Entity>(entites: Array<T>) =>
  new Map(entites.map((e) => [e.id, e]))
