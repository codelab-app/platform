import type { Callback } from '@codelab/frontend/abstract/types'
import { isFunction } from 'lodash'
import { ArrayOrSingle } from 'ts-essentials'

export const callbackWithParams = <T, TCb extends Callback<T> = Callback<T>>(
  callbacks: ArrayOrSingle<TCb> = [],
  param: T,
) => {
  const callbacksArray = Array.isArray(callbacks) ? callbacks : [callbacks]

  callbacksArray.forEach((cb) => {
    if (isFunction(cb)) {
      cb(param)
    }
  })
}
