import { type AnyAsyncFunction } from './async-span'

/**
 * Wrap entire object and add tracing to each method on the object
 * Note: This function is now a pass-through without actual tracing
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
): Obj => {
  // Simply return the repository without tracing
  return repository
}
