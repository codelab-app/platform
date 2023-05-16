import { TTLCache } from '@codelab/shared/utils'

/**
 * @param ttl Time until cache is reset in milliseconds
 */
export const cachedWithTTL = (ttl = 5 * 60 * 1000) => {
  const cache = new TTLCache<string, unknown>(ttl)

  return (
    target: unknown,
    propertyKey: string,
    descriptor?: PropertyDescriptor & {
      initializer?(): (...args: Array<unknown>) => unknown
    },
  ) => {
    if (typeof descriptor?.initializer !== 'function') {
      throw new Error("Can't decorate property without 'initializer'")
    }

    const originalInitializer = descriptor.initializer

    descriptor.initializer = function () {
      const originalMethod = originalInitializer!.call(this)

      return async (...args: Array<unknown>) => {
        const cacheKey = JSON.stringify(args)
        const cachedValue = cache.get(cacheKey)

        if (cachedValue !== undefined) {
          console.log(`Take value from cache:`, cachedValue)

          return cachedValue
        }

        const result = await originalMethod.apply(this, args)
        cache.set(cacheKey, result)

        return result
      }
    }
  }
}
