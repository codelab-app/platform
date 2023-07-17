import { getEnv } from '@codelab/shared/config'
import { flattenWithPrefix, withTracing } from '@codelab/shared/infra/otel'
import type { VercelKV } from '@vercel/kv'
import { createClient } from '@vercel/kv'

export enum CacheInstance {
  Backend = 'Backend',
  Frontend = 'Frontend',
}

interface ICacheService {
  clearAllCache(): Promise<void>
}

export class CacheService {
  private static instances: Record<CacheInstance, CacheService | undefined> = {
    [CacheInstance.Backend]: undefined,
    [CacheInstance.Frontend]: undefined,
  }

  // readonly cache: VercelKV

  private constructor() {
    // this.cache = createClient({
    //   token: getEnv().vercelKV.restApiToken,
    //   url: getEnv().vercelKV.restApiUrl,
    // })
  }

  public static getInstance(name: CacheInstance): CacheService {
    const instance = CacheService.instances[name]

    if (!instance) {
      return (CacheService.instances[name] = new CacheService())
    }

    return instance
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
