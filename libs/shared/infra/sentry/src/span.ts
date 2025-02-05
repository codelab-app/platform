/* eslint-disable @typescript-eslint/no-explicit-any */

import { startSpan } from '@sentry/nextjs'
import { StartSpanOptions } from '@sentry/core'

type AnyFunction<T extends Array<unknown> = Array<any>, R = any> = (
  ...args: T
) => R

export const withSpanFunc = <T extends Array<unknown>, R>(
  options: StartSpanOptions,
  func: AnyFunction<T, R>,
): AnyFunction<T, R> => {
  return (...args: T) => {
    return startSpan(options, () => func(...args))
  }
}
