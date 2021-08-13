import { DgraphEntity } from '../../infrastructure'

export const compareUids = <TEntity extends DgraphEntity>(
  a: TEntity,
  b: TEntity,
) => a.uid.localeCompare(b.uid)

/** Returns a new, sorted by UID, array */
export const sortByUids = <TEntity extends DgraphEntity>(
  array: Array<TEntity>,
) => array.slice().sort(compareUids)
