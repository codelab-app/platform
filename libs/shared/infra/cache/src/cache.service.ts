import { getEnv } from '@codelab/shared/config'
import { flattenWithPrefix, withTracing } from '@codelab/shared/infra/otel'
import type { VercelKV } from '@vercel/kv'
import { createClient } from '@vercel/kv'
import { z } from 'zod'

export enum CacheInstance {
  Backend = 'Backend',
  Frontend = 'Frontend',
}

const createStringToJSONSchema = <T>(): z.ZodTransformer<z.ZodString, T> => {
  return z.string().transform((str, ctx) => {
    try {
      return JSON.parse(str) as T
    } catch (error) {
      ctx.addIssue({ code: 'custom', message: 'Invalid JSON' })

      return z.NEVER
    }
  })
}

interface ICacheService {
  clearAllCache(): Promise<void>
}

/**
 * Adds a layer of caching before we fetch with repository. Item and List are cached separately. We use where to differentiate the cache
 *
 * When busting cache, we need to dynamically build up all possible keys to cache bust, since no pattern matching is available.
 */
export class CacheService {
  private static instances: Record<CacheInstance, CacheService | undefined> = {
    [CacheInstance.Backend]: undefined,
    [CacheInstance.Frontend]: undefined,
  }

  private readonly cache: VercelKV

  private constructor() {
    this.cache = createClient({
      token: getEnv().vercelKV.restApiToken,
      url: getEnv().vercelKV.restApiUrl,
    })
  }

  public static getInstance(name: CacheInstance): CacheService {
    const instance = CacheService.instances[name]

    if (!instance) {
      return (CacheService.instances[name] = new CacheService())
    }

    return instance
  }

  private compoundKey(model: string, where: object, oneOrMany: 'many' | 'one') {
    const sortedWhere = Object.fromEntries(
      Object.entries(where).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
    )

    const sortedWhereString = JSON.stringify(sortedWhere)

    return `${model}:${sortedWhereString}`
  }

  async getOne<T>(key: string, where: object = {}): Promise<T | null> {
    const compoundKey = this.compoundKey(key, where, 'one')
    const data = await this.cache.get(compoundKey)
    const parsed = createStringToJSONSchema<T>().safeParse(data)

    if (!parsed.success) {
      return null
    }

    return parsed.data
  }

  setOne(key: string, where: object, data: object) {
    const compoundKey = this.compoundKey(key, where, 'one')

    // Expire in 1 day
    return this.cache.set(compoundKey, JSON.stringify(data), {
      ex: 86400,
      nx: true,
    })
  }

  async getMany<T>(key: string, where: object = {}): Promise<Array<T> | null> {
    const compoundKey = this.compoundKey(key, where, 'many')
    const data = await this.cache.get(compoundKey)
    const parsed = createStringToJSONSchema<Array<T>>().safeParse(data)

    if (!parsed.success) {
      return null
    }

    return parsed.data
  }

  setMany(key: string, where: object = {}, data: object) {
    const compoundKey = this.compoundKey(key, where, 'many')

    // Expire in 1 day
    return this.cache.set(compoundKey, JSON.stringify(data), {
      ex: 86400,
      nx: true,
    })
  }

  public async clearCache(model?: string, where?: object) {
    // await withTracing('CacheService.clearCache()', async (span) => {
    //   if (!model) {
    //     // If model is not defined, clear all cache
    //     return await this.cache.flushall()
    //   }
    //   const whereAttributes = flattenWithPrefix(where ?? {}, 'where')
    //   span.setAttributes({ model })
    //   span.setAttributes(whereAttributes)
    // })()
  }
}
