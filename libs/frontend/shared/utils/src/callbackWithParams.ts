import type { Callback } from '@codelab/frontend/abstract/types'
import isFunction from 'lodash/isFunction'
import { ArrayOrSingle } from 'ts-essentials'

export const callbackWithParams = <
  TIn,
  TCb extends Callback<TIn, void> = Callback<TIn, void>,
>(
  callbacks: ArrayOrSingle<TCb> = [],
  param: TIn,
) => {
  const callbacksArray = Array.isArray(callbacks) ? callbacks : [callbacks]

  callbacksArray.forEach((cb) => {
    if (isFunction(cb)) {
      cb(param)
    }
  })
}
