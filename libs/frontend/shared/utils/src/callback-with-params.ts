import type { VoidCallback } from '@codelab/frontend/abstract/types'
import type { ArrayOrSingle } from 'ts-essentials'

import { isFunction } from 'remeda'

export const callbackWithParams = <
  TIn,
  TCb extends ArrayOrSingle<VoidCallback<TIn>> = ArrayOrSingle<
    VoidCallback<TIn>
  >,
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
