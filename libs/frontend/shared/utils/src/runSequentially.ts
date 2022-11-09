import { _await } from 'mobx-keystone'
import { Deferred } from './Deferred'

const pendingPromises: Record<string, Array<Promise<unknown>>> = {}

/**
 * Runs the provided generator functions with a specific key one at a time.
 *
 * Important: note to not recursively call functions wrapped with this function using the same key,
 * because they'll wait for each other and never return.
 * @param fn
 * @param key
 * @returns A generator function simulating the provided function.
 */
export const runSequentially = <A extends Array<unknown>, R>(
  key: string,
  fn: (...args: A) => Generator<unknown, R, unknown>,
) => {
  if (pendingPromises[key] === undefined) {
    pendingPromises[key] = []
  }

  return function* (this: unknown, ...args: A) {
    // 1. Get the previous promises
    const previousPromise = pendingPromises[key]?.slice() || []
    // 2. Create a new deferred promise and add it to the pending promises
    const deferred = new Deferred()
    pendingPromises[key]?.push(deferred.promise)

    // 3. Wait for previous promises
    yield* _await(Promise.all(previousPromise))

    // 4. Run the function
    try {
      const result = yield* fn.call(this, ...args)
      deferred.resolve()

      return result
    } catch (e: unknown) {
      deferred.reject()

      throw e
    } finally {
      const index = pendingPromises[key]?.indexOf(deferred.promise) as number
      pendingPromises[key]?.splice(index, 1)
    }
  }
}
