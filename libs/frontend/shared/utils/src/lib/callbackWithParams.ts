import { Maybe, MaybeArray } from '@codelab/shared/abstract/types'
import { isFunction } from 'lodash'

export type Callback<TParam> = (param: TParam) => any

export const callbackWithParams = <
  T,
  TCb extends (prop: T) => any = (prop: T) => any,
>(
  cbOrArray: Maybe<MaybeArray<Maybe<TCb>>>,
  param: T,
) => {
  if (!cbOrArray) {
    return
  }

  if (Array.isArray(cbOrArray)) {
    cbOrArray.forEach((c) => {
      if (c) {
        c(param)
      }
    })
  } else if (isFunction(cbOrArray)) {
    cbOrArray(param)
  }
}

export const createCallbackHandler =
  <T, TCb extends Callback<T> = (prop: T) => any>(
    cbOrArray: Maybe<MaybeArray<Maybe<TCb>>>,
  ) =>
  (param: T) => {
    callbackWithParams(cbOrArray, param)
  }
