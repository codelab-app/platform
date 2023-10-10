import { until } from 'ramda'

/**
 * handle name creation where many duplicates for the same element exists
 */
export const makeAutoIncrementedName = (
  allElementNames: Array<string>,
  currentElementName: string,
  isDuplicate = false,
) => {
  const nameRoot = `${currentElementName}${isDuplicate ? ' Duplicate' : ''}`

  if (!allElementNames.includes(nameRoot)) {
    return nameRoot
  }

  // find how many names with following format `${name_root} duplicate ${index}`
  const likeNamedElements = allElementNames.filter((name) =>
    name.startsWith(nameRoot),
  )

  /**
   * Normally nextIndex = duplicates.length
   * However, we need to make sure that index isn't used by user
   */
  const nextIndex = until(
    (predicateValue: number) =>
      !likeNamedElements.includes(`${nameRoot} ${predicateValue}`),
    (callbackValue: number) => callbackValue + 1,
  )(likeNamedElements.length)

  return `${nameRoot} ${nextIndex}`
}
