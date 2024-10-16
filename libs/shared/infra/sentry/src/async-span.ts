/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StartSpanOptions } from '@sentry/types'

import { startSpan } from '@sentry/nextjs'

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
