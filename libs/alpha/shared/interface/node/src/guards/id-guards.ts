export interface AssertsID {
  (id: string | undefined): asserts id
}

export const assertsID: AssertsID = (
  id: string | undefined,
): asserts id is string => {
  if (typeof id === undefined) {
    throw new Error('ID is not defined')
  }
}
