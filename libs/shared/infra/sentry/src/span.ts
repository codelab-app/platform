/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StartSpanOptions } from '@sentry/types/build/types'

import { startSpan } from '@sentry/nextjs'

type AnyFunction<T extends Array<unknown> = Array<any>, R = any> = (
  ...args: T
) => Promise<R>

export const withSpanFunc = <T extends Array<unknown>, R>(
  options: StartSpanOptions,
  func: AnyFunction<T, R>,
): AnyFunction<T, R> => {
  return async (...args: T) => {
    return await startSpan(options, () => func(...args))
  }
}

type TracedFunction<T extends AnyFunction<any, any>> = (
  ...args: Parameters<T>
) => ReturnType<T>

type TracedRepository<T> = {
  [K in keyof T]: T[K] extends AnyFunction<any, any>
    ? TracedFunction<T[K]>
    : T[K]
}

/**
 * Wrap entire object and add tracing to each method on the object
 */
export const withTracingMethods = <
  // Can't import from frontend shared
  Obj extends {
    add: AnyFunction
    delete: AnyFunction
    find: AnyFunction
    findOne: AnyFunction
    update: AnyFunction
  },
>(
  name: string,
  repository: Obj,
): TracedRepository<Obj> => {
  const enhancedRepository: Partial<TracedRepository<Obj>> = {}

  for (const key in repository) {
    const func = repository[key] as AnyFunction<Array<unknown>, unknown>

    enhancedRepository[key] = withSpanFunc(
      { name: key, op: `codelab.repository.${name}` },
      func,
    ) as TracedRepository<Obj>[Extract<keyof Obj, string>]
  }

  return enhancedRepository as TracedRepository<Obj>
}
