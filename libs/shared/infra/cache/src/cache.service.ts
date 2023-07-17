import { flattenWithPrefix, withTracing } from '@codelab/shared/infra/otel'
import Redis from 'ioredis'

export enum CacheInstance {
  Backend = 'Backend',
  Frontend = 'Frontend',
}

interface ICacheService {
  clearAllCache(): Promise<void>
}

export class CacheService implements ICacheService {
  private static instances: Record<CacheInstance, CacheService | undefined> = {
    [CacheInstance.Backend]: undefined,
    [CacheInstance.Frontend]: undefined,
  }

  readonly cache: Redis

  private constructor() {
    this.cache = new Redis({ host: '127.0.0.1', port: 6379 })
    this.cache.on('error', (error) => {
      console.error(`Redis error: ${error}`)
    })
  }

  public static getInstance(name: CacheInstance): CacheService {
    const instance = CacheService.instances[name]

    if (!instance) {
      return (CacheService.instances[name] = new CacheService())
    }

    return instance
  }

  public async clearAllCache() {
    await this.cache.flushall()

    return
  }

  public async clearCache(model?: string, where?: object) {
    await withTracing('CacheService.clearCache()', async (span) => {
      if (!model) {
        // If model is not defined, clear all cache
        return await this.cache.flushall()
      }

      let pattern = `${model}:`

      if (where) {
        // If 'where' is defined, sort entries by keys
        const sortedWhereEntries = Object.entries(where).sort(
          ([aKey], [bKey]) => aKey.localeCompare(bKey),
        )

        // Append key:value pairs to pattern
        sortedWhereEntries.forEach(([key, value], index, array) => {
          pattern += `${key}:${value}`

          if (index < array.length - 1) {
            pattern += ':'
          }
        })
      }

      let cursor = '0'
      const pipeline = this.cache.pipeline()

      do {
        const res = await this.cache.scan(cursor, 'MATCH', `${pattern}*`)

        cursor = res[0]
        res[1].forEach((key: string) => pipeline.del(key))
      } while (cursor !== '0')

      const whereAttributes = flattenWithPrefix(where ?? {}, 'where')
      span.setAttributes({ model })
      span.setAttributes(whereAttributes)

      return await pipeline.exec()
    })()
  }
}
