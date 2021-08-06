import { compose, isEmpty, symmetricDifference } from 'ramda'

export const equalsSet: (a: Array<any>, b: Array<any>) => boolean = compose(
  isEmpty,
  symmetricDifference,
)
