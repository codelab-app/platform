export type ArrayOfCallbacks<TParam> = Array<
  ((param: TParam) => any) | undefined
>

export type Callback<TParam> = (param: TParam) => any

export type CallbackOrArrayOfCallbacks<TParam> =
  | undefined
  | Callback<TParam>
  | ArrayOfCallbacks<TParam>

export const callbackWithParams = <
  T extends any,
  TCb extends (prop: T) => any = (prop: T) => any
>(
  cbOrArray: TCb | Array<TCb | undefined> | undefined,
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

export const createCallbackHandler = <
  T extends any,
  TCb extends Callback<T> = (prop: T) => any
>(
  cbOrArray: TCb | Array<TCb | undefined> | undefined,
) => (param: T) => {
  callbackWithParams(cbOrArray, param)
}
