import { LIST_CACHE_TAG } from './cacheTags'

export const providesAll = <
  R extends Array<{ id: string | number }>,
  T extends string,
>(
  resultsWithIds: R | null | undefined,
  type: T,
) => {
  return resultsWithIds
    ? [
        { type, id: LIST_CACHE_TAG },
        ...resultsWithIds.map(({ id }) => ({ type, id })),
      ]
    : [{ type, id: LIST_CACHE_TAG }]
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

export const invalidatesAll = <T extends string>(type: T) => [
  { type, id: LIST_CACHE_TAG },
]

export const invalidatesById = <
  R extends string | number | undefined,
  T extends string,
>(
  id: R,
  type: T,
) => (id ? [{ type, id }] : [{ type, id: LIST_CACHE_TAG }])
