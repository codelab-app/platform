/* eslint-disable @typescript-eslint/no-explicit-any */

import { startSpan } from '@sentry/nextjs'
import type { StartSpanOptions } from '@sentry/core'
export type AnyAsyncFunction<T extends Array<unknown> = Array<any>, R = any> = (
  ...args: T
) => Promise<R>

export const withAsyncSpanFunc = <T extends Array<unknown>, R>(
  options: StartSpanOptions,
  func: AnyAsyncFunction<T, R>,
): AnyAsyncFunction<T, R> => {
  return async (...args: T) => {
    return await startSpan(options, () => func(...args))
  }
}
