/* eslint-disable @typescript-eslint/no-explicit-any */

export type AnyAsyncFunction<T extends Array<unknown> = Array<any>, R = any> = (
  ...args: T
) => Promise<R>
