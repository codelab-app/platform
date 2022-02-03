import { ErrorFactory, Nullish } from '@codelab/shared/abstract/types'
import { map } from 'rxjs/operators'

/**
 * Creates a observable tap that throws an error if the value is truthy.
 * @param errorFactory
 */
export const throwIfTruthy = <T>(errorFactory: ErrorFactory) =>
  map((item: Nullish<T>) => {
    if (item) {
      throw errorFactory()
    }
  })
