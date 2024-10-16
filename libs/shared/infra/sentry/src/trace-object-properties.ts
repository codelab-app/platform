/* eslint-disable @typescript-eslint/no-explicit-any */
import { type AnyAsyncFunction, withAsyncSpanFunc } from './async-span'

type TracedFunction<T extends AnyAsyncFunction<any, any>> = (
  ...args: Parameters<T>
) => ReturnType<T>

type TracedRepository<T> = {
  [K in keyof T]: T[K] extends AnyAsyncFunction<any, any>
    ? TracedFunction<T[K]>
    : T[K]
}

/**
 * Wrap entire object and add tracing to each method on the object
 */
export const withTracingMethods = <
  // Can't import from frontend shared
  Obj extends {
    add: AnyAsyncFunction
    delete: AnyAsyncFunction
    find: AnyAsyncFunction
    findOne: AnyAsyncFunction
    update: AnyAsyncFunction
  },
>(
  name: string,
  repository: Obj,
): TracedRepository<Obj> => {
  const enhancedRepository: Partial<TracedRepository<Obj>> = {}

  for (const key in repository) {
    const func = repository[key] as AnyAsyncFunction<Array<unknown>, unknown>

    enhancedRepository[key] = withAsyncSpanFunc(
      { name: key, op: `codelab.repository.${name}` },
      func,
    ) as TracedRepository<Obj>[Extract<keyof Obj, string>]
  }

  return enhancedRepository as TracedRepository<Obj>
}
