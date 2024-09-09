/**
 * Recursively filters out empty strings and empty objects/arrays from the given data.
 *
 * @param data - The data to filter.
 * @returns The filtered data, with empty strings and empty objects/arrays removed.
 */
import { isArray, isObjectType, pickBy } from 'remeda'

export const filterEmptyStrings = (data: unknown): unknown => {
  if (isArray(data)) {
    return data.map(filterEmptyStrings).filter((item) => {
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
    const filtered = pickBy(data as Record<string, unknown>, (value) => {
      const filteredValue = filterEmptyStrings(value)

      if (isArray(filteredValue)) {
        return filteredValue.length > 0
      }

      if (isObjectType(filteredValue)) {
        return Object.keys(filteredValue).length > 0
      }

      return filteredValue !== '' && filteredValue !== undefined
    }) as Record<string, unknown>

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
