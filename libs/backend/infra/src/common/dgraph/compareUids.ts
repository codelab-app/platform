import { DgraphEntity, Entity } from '@codelab/shared/abstract/types'

export const compareIdStrings = (a: string, b: string) => a.localeCompare(b)

export const compareIds = <TEntity extends Entity>(a: TEntity, b: TEntity) =>
  compareIdStrings(a.id, b.id)

export const compareUids = <TEntity extends DgraphEntity>(
  a: TEntity,
  b: TEntity,
) => compareIdStrings(a.uid, b.uid)

/** Returns a new, sorted by UID, array */
export const sortByUids = <TEntity extends DgraphEntity>(
  array: Array<TEntity>,
) => array.slice().sort(compareUids)

/** Returns a new, sorted by ID, array */
export const sortByIds = <TEntity extends Entity>(array: Array<TEntity>) =>
  array.slice().sort(compareIds)
