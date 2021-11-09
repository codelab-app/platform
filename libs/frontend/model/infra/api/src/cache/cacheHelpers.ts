import { WILDCARD_ID } from './cacheTags'

export const providesAll = <
  R extends Array<{ id: string | number }> | null | undefined,
  T extends string,
>(
  resultsWithIds: R,
  type: T,
) => {
  return resultsWithIds
    ? [
        { type, id: WILDCARD_ID },
        ...resultsWithIds.map(({ id }) => ({ type, id })),
      ]
    : [{ type, id: WILDCARD_ID }]
}

export const providesById = <
  R extends string | number | null | undefined,
  T extends string,
>(
  id: R,
  type: T,
) => {
  return [{ type, id }]
}

export const invalidatesAll = <T extends string>(...types: Array<T>) =>
  types.map((type) => ({ type, id: WILDCARD_ID }))

export const invalidatesById = <
  R extends string | number | undefined,
  T extends string,
>(
  id: R,
  ...types: Array<T>
) => types.map((type) => (id ? { type, id } : { type, id: WILDCARD_ID }))
