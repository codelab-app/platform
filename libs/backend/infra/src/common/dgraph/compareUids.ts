export const compareIdStrings = (a: string, b: string) => a.localeCompare(b)

export const compareIds = <TEntity extends { id: string }>(
  a: TEntity,
  b: TEntity,
) => compareIdStrings(a.id, b.id)

export const compareUids = <TEntity extends { uid: string }>(
  a: TEntity,
  b: TEntity,
) => compareIdStrings(a.uid, b.uid)

/** Returns a new, sorted by UID, array */
export const sortByUids = <TEntity extends { uid: string }>(
  array: Array<TEntity>,
) => array.slice().sort(compareUids)

/** Returns a new, sorted by ID, array */
export const sortByIds = <TEntity extends { id: string }>(
  array: Array<TEntity>,
) => array.slice().sort(compareIds)
