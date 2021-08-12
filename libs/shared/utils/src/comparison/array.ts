import { compose, isEmpty, symmetricDifference } from 'ramda'

/**
 * Check that the sets inside these arrays are equal
 */
export const arrayEquals: (a: Array<any>, b: Array<any>) => boolean = compose(
  isEmpty,
  symmetricDifference,
)
