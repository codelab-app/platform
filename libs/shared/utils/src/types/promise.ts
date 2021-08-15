export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

export type MaybePromise<T> = T | Promise<T>

/**
 * Match the promise behavior of TOut with TIn
 */
export type InferPromise<TIn, TOut> = TIn extends PromiseLike<any>
  ? Promise<TOut>
  : TOut
