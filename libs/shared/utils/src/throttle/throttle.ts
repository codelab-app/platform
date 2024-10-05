/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from 'remeda'

/**
 * Creates a throttled function that only invokes the provided function at most once per every `wait` milliseconds.
 *
 * @param func The function to throttle.
 * @param wait The number of milliseconds to throttle invocations to.
 * @returns A new, throttled function.
 */
export const throttle = <F extends (...args: any) => any>(
  func: F,
): ReturnType<F> => {
  const throttledFunc = debounce(func, { maxWaitMs: 200, timing: 'trailing' })

  return throttledFunc
}
