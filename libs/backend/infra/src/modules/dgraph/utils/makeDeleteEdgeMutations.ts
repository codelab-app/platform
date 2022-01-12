export const makeDeleteEdgeMutations = (
  parentId: string,
  predicate: string,
  children: Array<{ id?: string }>,
) => {
  return children.map(({ id }) => {
    return {
      uid: parentId,
      [predicate]: {
        uid: id,
      },
    }
  })
}
