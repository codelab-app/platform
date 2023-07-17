/**
 * @param segmentCacheKey The key indicates a cache segment. Can be used to clear cache for a specific key.
 * @param ttl Time until cache is reset in milliseconds. Default is 5 minutes.
 */
export const cachedWithTTL = (segmentCacheKey: string, ttl = 5 * 60 * 1000) => {
  return (
    target: unknown,
    propertyKey: string,
    descriptor?: PropertyDescriptor,
  ) => {
    /* if (!descriptor) {
      throw new Error(
        `"descriptor" is undefined for "${target?.constructor?.name}.${propertyKey}", make sure you are not trying to decorate an arrow function`,
      )
    }

    const originalMethod = descriptor.value

    descriptor.value = async function (...args: Array<unknown>) {
      const cache = CacheService.getInstance(CacheInstance.Frontend).cache
      const cacheKey = JSON.stringify(args)
      const cachedValue = await cache.get(cacheKey)

      if (cachedValue !== null) {
        console.log(
          `Take value from cache segment ${segmentCacheKey}:`,
          cachedValue,
        )

        return cachedValue
      }

      const result = await originalMethod.apply(this, args)
      await cache.set(cacheKey, result)

      return result
    } */

    return descriptor
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
    descriptor?: PropertyDescriptor,
  ) => {
    /* if (!descriptor) {
      throw new Error(
        `"descriptor" is undefined for "${target?.constructor?.name}.${propertyKey}", make sure you are not trying to decorate an arrow function`,
      )
    }

    const originalMethod = descriptor.value

    descriptor.value = async function (...args: Array<unknown>) {
      const cacheKeys = Array.isArray(segmentCacheKey)
        ? segmentCacheKey
        : [segmentCacheKey]

      for (const cacheKey of cacheKeys) {
        const cache = CacheService.getInstance(CacheInstance.Frontend).cache
        const result = await cache.del(cacheKey)

        if (result > 0) {
          console.log(`Cleared cache for key: ${cacheKey}`)
        } else {
          console.log(`No cache found for key: ${cacheKey}`)
        }
      }

      return originalMethod.apply(this, args)
    } */

    return descriptor
  }
}
