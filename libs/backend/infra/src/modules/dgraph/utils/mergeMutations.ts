import { Nullish } from '@codelab/shared/abstract/types'
import { Mutation } from 'dgraph-js-http'

const addOneOrArray = (val: any, array: Array<any>) => {
  if (Array.isArray(val)) {
    array.push(...val)
  } else if (val) {
    array.push(val)
  }
}

const mergeNQuads = (a: Nullish<string>, b: Nullish<string>) => {
  if (a && b) {
    return a + '\n' + b
  }

  return a || b || undefined
}

export const mergeMutations = (
  ...mutations: Array<Mutation | undefined | null>
): Mutation => {
  const merged = {
    setJson: [] as Array<any>,
    deleteJson: [] as Array<any>,
    setNquads: undefined as string | undefined,
    deleteNquads: undefined as string | undefined,
    commitNow: false,
  }

  for (const mutation of mutations) {
    if (!mutation) {
      continue
    }

    if (mutation.mutation || mutation.isJsonString) {
      // Not sure how to handle those, throw an error, so we deal with it if needed
      throw new Error(
        "Can't merge mutations with raw mutation prop or with isJsonString=true",
      )
    }

    addOneOrArray(mutation.setJson, merged.setJson)
    addOneOrArray(mutation.deleteJson, merged.deleteJson)

    merged.setNquads = mergeNQuads(merged.setNquads, mutation.setNquads)
    merged.deleteNquads = mergeNQuads(
      merged.deleteNquads,
      mutation.deleteNquads,
    )

    if (mutation.commitNow) {
      merged.commitNow = mutation.commitNow
    }
  }

  return merged
}
