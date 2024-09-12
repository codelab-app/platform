import { diff } from 'radash'

export const isSubset = (array: Array<string>, superset: Array<string>) => {
  const difference = diff(array, superset)

  return difference.length === 0
}
