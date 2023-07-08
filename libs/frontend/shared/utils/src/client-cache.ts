import { TTLCache } from '@codelab/shared/utils'

interface MobXPropertyDescriptor extends PropertyDescriptor {
  initializer?(): (...args: Array<unknown>) => unknown
}

// Create a map to store cache instances for each cache key
const cacheMap = new Map<string, TTLCache<string, unknown>>()

/**
 * @param segmentCacheKey The key indicates a cache segment. Can be used to clear cache for a specific key.
 * @param ttl Time until cache is reset in milliseconds. Default is 5 minutes.
 */
export const cachedWithTTL = (segmentCacheKey: string, ttl = 5 * 60 * 1000) => {
  return (
    target: unknown,
    propertyKey: string,
    descriptor?: MobXPropertyDescriptor,
  ) => {
    if (typeof descriptor?.initializer !== 'function') {
      console.log(target?.constructor?.name, propertyKey, descriptor)
      throw new Error(
        "Can't decorate property without 'initializer', check that the mobx method uses method-style and not property style",
      )
    }

    const originalInitializer = descriptor.initializer

    descriptor.initializer = function () {
      // Get or create cache for this cacheKey
      let cache = cacheMap.get(segmentCacheKey)

      if (!cache) {
        cache = new TTLCache<string, unknown>(ttl)
        cacheMap.set(segmentCacheKey, cache)
      }

      const originalMethod = originalInitializer!.call(this)

      return async (...args: Array<unknown>) => {
        const cacheKey = JSON.stringify(args)
        const cachedValue = cache?.get(cacheKey)

        if (cachedValue !== undefined) {
          console.log(
            `Take value from cache segment ${segmentCacheKey}:`,
            cachedValue,
          )

          return cachedValue
        }

        const result = await originalMethod.apply(this, args)
        cache?.set(cacheKey, result)

        return result
      }
    }
  }
}

/**
 * @param segmentCacheKey The a single key or array of keys used as a cache segments.
 * All the records in the specified segments will be cleared.
 */
export const clearCacheForKey = (segmentCacheKey: Array<string> | string) => {
  return (
    target: unknown,
    propertyKey: string,
    descriptor?: MobXPropertyDescriptor,
  ) => {
    if (typeof descriptor?.initializer !== 'function') {
      console.log(target?.constructor?.name, propertyKey, descriptor)
      throw new Error(
        "Can't decorate property without 'initializer', check that the mobx method uses method-style and not property style",
      )
    }

    const originalInitializer = descriptor.initializer

    descriptor.initializer = function () {
      const originalMethod = originalInitializer!.call(this)

      return (...args: Array<unknown>) => {
        const cacheKeys = Array.isArray(segmentCacheKey)
          ? segmentCacheKey
          : [segmentCacheKey]

        cacheKeys.forEach((cacheKey) => {
          const cacheSegment = cacheMap.get(cacheKey)

          if (cacheSegment) {
            console.log(
              `Deleting cache segment ${cacheKey} with ${cacheSegment.size()} records`,
            )

            cacheSegment.clear()
            cacheMap.delete(cacheKey)
          }
        })

        return originalMethod.apply(this, args)
      }
    }
  }
}
