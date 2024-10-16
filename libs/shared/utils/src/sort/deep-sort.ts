import type { IPropData } from '@codelab/shared/abstract/core'

import { entries, isArray, isObjectType, pipe, reduce, sortBy } from 'remeda'

export const deepSortKeys = <T>(obj: T): T => {
  if (isArray(obj)) {
    return obj.map(deepSortKeys) as T
  } else if (isObjectType(obj)) {
    return pipe(
      obj as IPropData,
      entries<IPropData>,
      sortBy(([key]) => key),
      reduce((acc, [key, value]) => {
        acc[key] = deepSortKeys(value)

        return acc
      }, {} as IPropData),
    ) as T
  }

  return obj
}
