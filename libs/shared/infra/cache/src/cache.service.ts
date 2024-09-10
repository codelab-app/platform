import type { ObjectLike } from '@codelab/shared/abstract/types'

export enum CacheInstance {
  Backend = 'Backend',
  Frontend = 'Frontend',
}

interface DummyCache {
  get(key: string): Promise<string | null>
  set(
    key: string,
    value: string,
    options: { ex: number; nx: boolean },
  ): Promise<void>
  // Add more methods as needed for your use case
}

const createStringToJSONSchema = <T>(): DummyValidator<T> => {
  return {
    safeParse: (str: string | null): ParseResult<T> => {
      if (str === null) {
        return { data: null, success: false }
      }

      try {
        return { data: JSON.parse(str) as T, success: true }
      } catch {
        return { data: null, success: false }
      }
    },
  }
}

interface DummyValidator<T> {
  safeParse(input: string | null): ParseResult<T>
}

interface ParseResult<T> {
  data: T | null
  success: boolean
}

export class CacheService {
  public static getInstance(name: CacheInstance): CacheService {
    const instance = CacheService.instances[name]

    if (!instance) {
      return (CacheService.instances[name] = new CacheService())
    }

    return instance
  }

  async getMany<T>(
    key: string,
    where: ObjectLike = {},
  ): Promise<Array<T> | null> {
    const compoundKey = this.compoundKey(key, where, 'many')
    const data = await this.cache.get(compoundKey)
    const parsed = createStringToJSONSchema<Array<T>>().safeParse(data)

    return parsed.success ? parsed.data : null
  }

  async getOne<T>(key: string, where: ObjectLike = {}): Promise<T | null> {
    const compoundKey = this.compoundKey(key, where, 'one')
    const data = await this.cache.get(compoundKey)
    const parsed = createStringToJSONSchema<T>().safeParse(data)

    return parsed.success ? parsed.data : null
  }

  setMany(key: string, where: ObjectLike = {}, data: ObjectLike) {
    const compoundKey = this.compoundKey(key, where, 'many')

    return this.cache.set(compoundKey, JSON.stringify(data), {
      ex: 86400,
      nx: true,
    })
  }

  setOne(key: string, where: ObjectLike, data: ObjectLike) {
    const compoundKey = this.compoundKey(key, where, 'one')

    return this.cache.set(compoundKey, JSON.stringify(data), {
      ex: 86400,
      nx: true,
    })
  }

  private static instances: Record<CacheInstance, CacheService | undefined> = {
    [CacheInstance.Backend]: undefined,
    [CacheInstance.Frontend]: undefined,
  }

  private readonly cache: DummyCache

  private constructor() {
    this.cache = this.createDummyCache()
  }

  private compoundKey(
    model: string,
    where: ObjectLike,
    oneOrMany: 'many' | 'one',
  ) {
    const sortedWhere = Object.fromEntries(
      Object.entries(where).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
    )

    const sortedWhereString = JSON.stringify(sortedWhere)

    return `${model}:${sortedWhereString}`
  }

  private createDummyCache(): DummyCache {
    // Replace this with your cache logic
    return {
      get: async (key: string) => null,
      set: async (
        key: string,
        value: string,
        options: { ex: number; nx: boolean },
      ) => {
        //
      },
    }
  }
}
