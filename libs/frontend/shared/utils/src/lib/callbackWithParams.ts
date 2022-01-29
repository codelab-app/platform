import { Callback } from '@codelab/frontend/abstract/types'
import { isFunction, isObjectLike } from 'lodash'

export const callbackWithParams = <T, TCb extends Callback<T> = Callback<T>>(
  callbacks: Array<TCb> = [],
  param: T,
) => {
  callbacks.forEach((cb) => {
    if (isFunction(cb) && isObjectLike(param)) {
      cb(param)
    }
  })
}
