import type { VoidCallback } from '@codelab/frontend/abstract/types'
import isFunction from 'lodash/isFunction'

export const callbackWithParams = <
  TIn,
  TCb extends VoidCallback<TIn> = VoidCallback<TIn>,
>(
  callbacks: TCb,
  param: TIn,
) => {
  const callbacksArray = Array.isArray(callbacks) ? callbacks : [callbacks]

  callbacksArray.forEach((cb) => {
    if (isFunction(cb)) {
      cb(param)
    }
  })
}
