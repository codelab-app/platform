import { Maybe, MaybeArray } from '@codelab/shared/abstract/types'

export type Callback<TParam> = (param: TParam) => any

export const callbackWithParams = <
  T extends any,
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
  } else if (typeof cbOrArray === 'function') {
    cbOrArray(param)
  }
}

export const createCallbackHandler =
  <T extends any, TCb extends Callback<T> = (prop: T) => any>(
    cbOrArray: Maybe<MaybeArray<Maybe<TCb>>>,
  ) =>
  (param: T) => {
    callbackWithParams(cbOrArray, param)
  }
