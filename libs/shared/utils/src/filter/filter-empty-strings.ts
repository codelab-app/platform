/**
 * Recursively filters out empty strings from the given data.
 *
 * @param data - The data to filter.
 * @returns The filtered data, with empty strings removed.
 */
import type { IPropData } from '@codelab/shared-abstract-core'

import { isArray, isObjectType, pickBy } from 'remeda'

export const filterEmptyStrings = (
  data: Array<IPropData> | IPropData,
): unknown => {
  if (isArray(data)) {
    return data
      .map((val) => filterEmptyStrings(val))
      .filter((item) => {
        if (isArray(item)) {
          return item.length > 0
        }

        if (isObjectType(item)) {
          return Object.keys(item).length > 0
        }

        return item !== undefined && item !== ''
      })
  }

  if (isObjectType(data)) {
    const filtered = pickBy(data, (value) => {
      const filteredValue = filterEmptyStrings(value)

      return filteredValue !== '' && filteredValue !== undefined
    })

    // Recursively apply filterEmptyStrings to nested objects
    for (const key in filtered) {
      if (isObjectType(filtered[key])) {
        filtered[key] = filterEmptyStrings(filtered[key])
      }
    }

    return Object.keys(filtered).length > 0 ? filtered : undefined
  }

  return data === '' ? undefined : data
}
