import { ErrorFactory, Nullish } from '@codelab/shared/abstract/types'
import { map } from 'rxjs/operators'

/**
 * Creates a observable mapper that throws an error if the value is nullish and returns the value if it is not.
 * @param errorFactory
 */
export const throwIfNullish = <T>(errorFactory: ErrorFactory) =>
  map<Nullish<T>, T>((item: Nullish<T>) => {
    if (!item) {
      throw errorFactory()
    }

    return item
  })
