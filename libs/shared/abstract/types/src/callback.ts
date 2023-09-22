/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PromiseCallback<
  Return,
  Param extends Array<any> = Array<any>,
> {
  (...args: Param): Promise<Return> | Return
}

export type Callback<TIn, TOut = unknown> = (param: TIn) => TOut
